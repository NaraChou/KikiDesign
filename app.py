import streamlit as st
import subprocess
import os
import google.generativeai as genai
from datetime import datetime

# --- 頁面配置 ---
st.set_page_config(page_title="🛡️ Kiki Design Risk Analyzer", page_icon="🛡️", layout="wide")

st.title("Kiki Design 視覺性能與風險分析工具")
st.markdown("本工具旨在確保視覺體驗的流暢度，並在穩定性與開發效率之間取得平衡。")

# --- 側邊欄：設定 ---
with st.sidebar:
    st.header("⚙️ 配置設定")
    api_key = st.text_input("Google API Key", value=os.getenv("GEMINI_API_KEY", ""), type="password")
    
    available_models = []
    if api_key:
        try:
            genai.configure(api_key=api_key)
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    available_models.append(m.name)
        except Exception as e:
            st.error(f"API Key 驗證失敗: {e}")

    if available_models:
        model_options = [m.replace("models/", "") for m in available_models]
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
            with st.status("🤖 正在分析視覺性能與風險...", expanded=True) as status:
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
                
                # 🔴 修正後的 System Prompt：從「資安專家」轉型為「性能優化師」
                system_prompt = """
                你是一位擁有 20 年經驗的高階前端性能優化師與 UX 工程師。
                你的目標是確保網站既具有極致的視覺動態效果，又能維持系統的穩定與流暢。
                你信奉「工程務實主義」：在不影響使用者感受的前提下，追求最穩定的實作，而非過度工程。

                ### 🔍 審查優先級 (Priority)
                1. 🔴 致命風險 (Critical): 導致瀏覽器崩潰的死循環 (Infinite Loop)、嚴重的記憶體洩漏、或導致頁面完全無法顯示的邏輯錯誤。
                2. 🟡 體驗風險 (High): 明顯的畫面跳變 (Visual Flicker)、嚴重的掉幀 (Jank)、佈局偏移 (Alignment Shift)、或明顯的互動延遲。
                3. 🔵 維護風險 (Medium): 複雜度過高的邏輯 (過度工程)、缺乏必要的資源清理、或不符合設計系統的樣式實作。

                ### 🚫 忽略項目
                - 縮排、命名美感、單純的文檔修改、不影響性能的微小型別警告。

                ### 📝 輸出格式 (Markdown)
                # 🛡️ 視覺性能與風險評估報告
                ## 🚦 綜合風險評分: [🟢低 / 🟡中 / 🔴高 / 🔥極危險]

                ## 🔥 優先處理項 (Showstoppers)
                - **[檔案路徑]**: <描述問題及對視覺體驗的影響> $\rightarrow$ <提供一個最務實、不增加過度複雜度的解決方案>

                ## ⚠️ 潛在優化建議
                - [描述風險] $\rightarrow$ [建議的微調方案與預期提升的體驗]

                ## 🧪 建議測試場景
                - 針對本次變更，請在以下場景驗證：
                  1. [場景 A]
                  2. [場景 B]
                """

                model = genai.GenerativeModel(
                    model_name=model_name,
                    system_instruction=system_prompt
                )
                
                response = model.generate_content(f"請分析以下 Git Diff，並以『性能優化師』的視角產出風險報告。請優先考慮視覺流暢度與系統穩定性的平衡：\n\n{diff_content}")
                
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
