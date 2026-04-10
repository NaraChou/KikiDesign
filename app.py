import streamlit as st
import subprocess
import os
import google.generativeai as genai
from datetime import datetime

# --- 頁面配置 ---
st.set_page_config(page_title="🛡️ Git Risk Analyzer (Auto-Model)", page_icon="🛡️", layout="wide")

st.title("Git 上版風險分析工具 (自動偵測版)")
st.markdown("本版本會自動偵測您的 API Key 可用模型，避免 404 錯誤。")

# --- 側邊欄：設定 ---
with st.sidebar:
    st.header("⚙️ 配置設定")
    api_key = st.text_input("Google API Key", value=os.getenv("GEMINI_API_KEY", ""), type="password")
    
    # --- 動態獲取模型清單 ---
    available_models = []
    if api_key:
        try:
            genai.configure(api_key=api_key)
            # 這裡會直接向 Google 查詢可用模型
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    available_models.append(m.name)
        except Exception as e:
            st.error(f"API Key 驗證失敗: {e}")

    if available_models:
        # 將 'models/gemini-1.5-flash' 簡化為 'gemini-1.5-flash'
        model_options = [m.replace("models/", "") for m in available_models]
        # 優先排序：把 flash 和 pro 放到前面
        model_options.sort(key=lambda x: ("flash" not in x, "pro" not in x))
        model_name = st.selectbox("選擇可用模型", model_options)
    else:
        model_name = st.text_input("手動輸入模型名稱", value="gemini-1.5-flash")
        st.warning("⚠️ 無法自動獲取模型清單，請確認 API Key 是否正確。")

    st.divider()
    st.subheader("🚫 排除路徑")
    exclude_patterns = st.text_area(
        "排除檔案 (逗號分隔)", 
        "app.py,package-lock.json,yarn.lock,pnpm-lock.yaml,*.min.js,*.map,dist/,bin/"
    )
    
    st.info("提示：請在 Git 儲存庫的根目錄下啟動此 App。")

# --- 主界面 ---
col1, col2 = st.columns(2)
with col1:
    old_commit = st.text_input("舊 Commit Hash (或分支名)", placeholder="e.g. main")
with col2:
    new_commit = st.text_input("新 Commit Hash (或分支名)", placeholder="e.g. feature-branch")

if st.button("🚀 開始分析風險", type="primary"):
    if not api_key:
        st.error("❌ 請在側邊欄輸入 Google API Key")
    elif not old_commit or not new_commit:
        st.error("❌ 請輸入起點與終點的 Commit Hash")
    else:
        try:
            with st.status("🤖 正在執行分析...", expanded=True) as status:
                # 1. 檢查 Git 環境
                st.write("🔍 檢查 Git 環境...")
                if subprocess.run(["git", "rev-parse", "--is-inside-work-tree"], capture_output=True).returncode != 0:
                    st.error("❌ 目前目錄不是一個 Git 儲存庫。")
                    st.stop()

                # 2. 擷取 Git Diff
                st.write("📦 擷取程式碼變更...")
                exclude_list = [f":(exclude){p.strip()}" for p in exclude_patterns.split(",") if p.strip()]
                cmd = ["git", "diff", "--unified=5", old_commit, new_commit, "--", "."] + exclude_list
                
                result = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
                diff_content = result.stdout

                if not diff_content.strip():
                    st.warning("✅ 無有效程式碼變更。")
                    status.update(label="✅ 完成", state="complete")
                    st.stop()

                # 3. 呼叫 Gemini AI
                st.write(f"🧠 使用 {model_name} 審查中...")
                genai.configure(api_key=api_key)
                
                system_prompt = """
                你是一位擁有 20 年經驗的資深軟體架構師與資安專家 (DevSecOps)。
                你的目標是找出程式碼中「可能導致災難」的隱患。請保持批判性，不要稱讚程式碼，直接指出問題。

                ### 🔍 審查優先級 (Priority)
                1. 🔴 致命錯誤 (Critical): 記憶體洩漏、競爭條件 (Race Condition)、資安漏洞 (Injection/Auth Bypass)、導致系統崩潰的邏輯。
                2. 🟡 穩定性風險 (High): 缺乏錯誤處理 (Try-Catch 缺失)、API 不兼容變更 (Breaking Changes)、DB 鎖定風險。
                3. 🔵 效能缺陷 (Medium): 複雜度過高 (O(n^2))、重複查詢、未優化的資源釋放。

                ### 🚫 絕對忽略
                - 縮排、命名美感、註解缺失、單純的文檔修改。

                ### 📝 輸出格式 (Markdown)
                # 🛡️ 上版風險評估報告
                ## 🚦 綜合風險評分: [🟢低 / 🟡中 / 🔴高 / 🔥極危險]

                ## 🔥 阻擋上線的問題 (Showstoppers)
                - **[檔案路徑]**: <重點描述問題> $\rightarrow$ <建議修改方案>

                ## ⚠️ 潛在風險與警告
                - [描述風險] $\rightarrow$ [可能導致的後果]

                ## 🧪 測試建議
                - 針對本次變更，請 QA 執行以下測試場景：
                  1. [場景 A]
                  2. [場景 B]
                """

                model = genai.GenerativeModel(
                    model_name=model_name,
                    system_instruction=system_prompt
                )
                
                response = model.generate_content(f"請分析以下 Git Diff 並產出風險報告：\n\n{diff_content}")
                
                report = response.text
                status.update(label="✅ 分析完成", state="complete")

            # --- 顯示結果 ---
            st.divider()
            st.markdown(report)
            
            # 提供下載按鈕
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            st.download_button(
                label="📥 下載風險報告 (.md)",
                data=report,
                file_name=f"Risk_Analysis_{timestamp}.md",
                mime="text/markdown"
            )

        except Exception as e:
            st.error(f"❌ 發生錯誤: {str(e)}")