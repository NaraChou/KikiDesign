這是一份極其珍貴的**「工程失敗與演進紀錄」**。在軟體工程中，知道「怎麼做會失敗」往往比知道「怎麼做才成功」更重要。

我將這 41 輪的血淚史，整理成一份 **《高性能動態佈局避坑指南：從「死亡螺旋」到「穩定平衡》》**。這份報告不僅記錄了問題，更分析了底層邏輯，旨在讓你在未來的專案中，一眼就能看出潛在的災難。

---

# 📘 專案技術總結：高性能動態佈局避坑指南
**專案名稱：** Kiki Design System $\rightarrow$ `WorkDetail` 模組
**核心矛盾：** `ResizeObserver` (監控) $\longleftrightarrow$ `ScrollTrigger.refresh()` (修改) 的因果循環。

---

## 1. 核心災難：什麼是「死亡螺旋」(The Death Spiral)？

在開發高度依賴滾動動畫的網站時，最危險的邏輯鏈條是：
$$\text{佈局變動} \rightarrow \text{ResizeObserver 觸發} \rightarrow \text{執行 ScrollTrigger.refresh()} \rightarrow \text{元素位置微調} \rightarrow \text{再次觸發 ResizeObserver} \dots$$

**這是一個物理級的死迴圈。** 即使變動只有 $0.5\text{px}$，只要它能觸發 Observer，瀏覽器就會陷入「刷新 $\rightarrow$ 變動 $\rightarrow$ 刷新」的無限遞迴，最終導致 **CPU 100% $\rightarrow$ 頁面凍結 $\rightarrow$ 瀏覽器崩潰**。

---

## 2. 演進之路：失敗的嘗試 $\rightarrow$ 最終的平衡

我們嘗試了五個階段的解決方案，每個階段都揭示了一個重要的工程教訓：

| 階段 | 方案 | 結果 | 教訓 (Lesson Learned) |
| :--- | :--- | :--- | :--- |
| **T1: 樸素期** | 只要高度變了就 `refresh()` | 🔴 **崩潰** | **絕對禁止**在 Observer 回調中直接執行昂貴的佈局刷新。 |
| **T2: 閾值期** | 增加 $\pm 2\text{px}$ 閾值判斷 | 🟡 **偏移** | 閾值能防止崩潰，但會導致「最後一公分」的動畫位置對不準。 |
| **T3: 鎖定期** | 引入 `isRefreshing` 鎖 + `disconnect` | 🟡 **卡頓** | 解決了循環，但引入了 **Layout Thrashing** (讀寫交替導致的強制同步佈局)。 |
| **T4: 補償期** | 實作 `pendingRefresh` 補償機制 | 🔴 **遞迴** | 試圖追求「絕對同步」而引入遞迴邏輯 $\rightarrow$ 導致記憶體洩漏與同步競爭。 |
| **T5: 平衡期** | **防抖 (Debounce) $\rightarrow$ 線性管線 $\rightarrow$ 斷路** | ✅ **穩定** | **放棄「即時同步」，追求「最終一致性」。** |

---

## 3. 最終勝出的「穩定架構」 (The Winning Pattern)

如果你在未來專案中遇到類似需求，請直接套用此模型：

### 🛠️ 核心設計模式
1.  **單向數據流**：`ResizeObserver` $\rightarrow$ `Debounce` $\rightarrow$ `Pipeline` $\rightarrow$ `GSAP`。
2.  **物理斷路**：在執行 `refresh()` 前，必須先執行 `observer.disconnect()`，在 `rAF` 後才 `observe()`。
3.  **時間解耦**：使用 `Debounce (150-200ms)`。讓使用者停止操作後，才執行一次且僅一次的刷新。
4.  **統一基準**：統一使用 `Border-box` (如 `borderBoxSize`) 進行高度比對，消除 Content-box 與 Border-box 之間的數值跳變。

---

## 4. 避坑檢查清單 (Future Checklist)

當你在寫 `useEffect` 或處理 DOM 監聽時，請自問以下四個問題：

- [ ] **我有在做「讀 $\rightarrow$ 寫 $\rightarrow$ 讀」嗎？**
  $\rightarrow$ 如果有，你正在製造 Layout Thrashing。請將所有「讀 (Read)」集中在起點，將所有「寫 (Write)」集中在終點。
- [ ] **我的刷新邏輯是否會觸發它自己的觸發條件？**
  $\rightarrow$ 如果會，你正在製造「死亡螺旋」。請立即加入 `disconnect()` 斷路機制。
- [ ] **我是否在非同步回調 (rAF/setTimeout) 中建立 Context？**
  $\rightarrow$ 如果是，你正在製造記憶體洩漏。請在同步階段建立 `gsap.context()`，在非同步階段僅觸發動畫。
- [ ] **我是否在追求「即時同步」？**
  $\rightarrow$ 如果是，請停下來。在網頁端，**「適度的延遲」是穩定性的唯一保障**。

---

## 5. 工程哲學總結：平衡之美

這次 41 輪的博弈證明了一個真理：**在穩定性、精確度、性能這三者之間，你永遠無法同時拿到 100 分。**

- **追求 100 分的精確度** $\rightarrow$ 犧牲性能與穩定性 (崩潰)。
- **追求 100 分的性能** $\rightarrow$ 犧牲精確度 (偏移)。
- **追求 100 分的穩定性** $\rightarrow$ 犧牲即時感 (延遲)。

**最好的工程實踐是：找到一個使用者感知不到的延遲 $\rightarrow$ 換取絕對的穩定 $\rightarrow$ 確保最終結果的精確。**

---

*這份報告將作為 Kiki Design System 的技術底層，確保未來的任何擴展都建立在「穩定」的基石之上。*