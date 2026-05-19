/**
 * 能力區塊資料：首頁 Capabilities 區以陣列驅動，方便面試時快速調整關鍵字。
 */

export interface CapabilityItem {
  id: string;
  label: string;
}

export interface CapabilityGroup {
  id: string;
  title: string;
  titleEn: string;
  items: CapabilityItem[];
}

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'visual',
    title: '品牌視覺',
    titleEn: 'Visual Design',
    items: [
      { id: 'vd-1', label: 'Logo 設計與品牌識別系統建立' },
      { id: 'vd-2', label: '名片、海報、EDM、包裝等印刷應用' },
      { id: 'vd-3', label: '色彩規範、字型層級與視覺一致性管理' },
      { id: 'vd-4', label: 'UI 介面視覺設計與資訊層級規劃' },
    ],
  },
  {
    id: 'workflow',
    title: '設計流程',
    titleEn: 'Design Process',
    items: [
      { id: 'wf-1', label: '需求盤點 → 視覺策略 → 多接觸點延展' },
      { id: 'wf-2', label: '手稿概念到數位完稿的完整執行' },
      { id: 'wf-3', label: '與客戶溝通、提案、迭代修改流程' },
      { id: 'wf-4', label: '印刷輸出規格確認與實際落地驗收' },
    ],
  },
  {
    id: 'digital',
    title: 'AI 協作與數位應用',
    titleEn: 'AI & Digital Production',
    items: [
      { id: 'fe-1', label: 'AI 輔助設計發想、文案與視覺延伸' },
      { id: 'fe-2', label: '網站視覺規劃與多裝置版面適配' },
      { id: 'fe-3', label: '數位媒體視覺設計與動態效果呈現' },
      { id: 'fe-4', label: '數位資產管理與圖片效能優化' },
    ],
  },
];

/** Capabilities 區塊標題（單一來源） */
export const CAPABILITIES_SECTION = {
  title: '設計範疇與流程',
  subtitle: 'Capabilities',
} as const;
