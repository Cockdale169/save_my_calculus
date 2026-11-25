import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'en' | 'zh';

const DICT = {
  en: {
    brand: 'Calculus Survival Kit',
    navOverview: 'Overview',
    navC1: 'Calculus I',
    navC2: 'Calculus II',
    navMap: 'Prerequisite Map',
    navPractice: 'Practice & Errors',
    navGlossary: 'Glossary',
    searchBtn: 'Search',
    searchPlaceholder: 'Search chapters, topics, or terms (e.g. Riemann, Taylor, ODE)...',
    searchEmpty: 'No matching modules or pages for',
    sidebarTitle: 'Chapters',
    close: 'Close',
    progressLabel: 'Progress',
    liveModules: 'Live Modules',
    plannedModules: 'Planned Nodes',
    plannedBadge: 'Planned',
    backToTop: 'Top',
    loadingPage: 'Loading page...',
    loadingModule: 'Loading module...',
    heroEyebrow: 'NYCU CALCULUS · PRO LEARNING SYSTEM',
    heroTitle: 'Calculus, Made Intuitive.',
    heroSub:
      'High-school bridge, NYCU Calculus I & II exam track, expandable math evolution diagrams, and interactive visual labs. Press ⌘K to jump anywhere.',
    ctaC1: 'Calculus I Syllabus',
    ctaPractice: 'Practice & Mistakes',
    ctaLec10: 'Lec 10: Riemann & FTC',
    completionLabel: 'Completion',
    masteredOf: 'Mastered',
    coreModules: 'core modules',
    finalSprint: 'Final Exam Sprint (W9–W12)',
    lec8: 'Lec 8: Curve Analysis & Theorems',
    lec9: 'Lec 9: Approx · Newton · ODE',
    lec10: 'Lec 10: Riemann Integral & FTC',
    practiceAccuracy: 'Practice & Review',
    ready: 'Ready',
    startFirst: 'Start your first practice question',
    toReview: 'To review',
    openPractice: 'Open Practice Center',
    modulesHeading: 'Verified Modules',
    modulesSub: 'Math-verified units with visual guides, evolution diagrams, and interactive labs.',
    filterAll: 'All',
    filterHS: 'HS Bridge',
    filterC1: 'Calculus I',
    filterC2: 'Calculus II',
    filterApp: 'Biomed',
    enterModule: 'Study',
    read: 'Read',
    markRead: 'Mark Read',
    review: 'Review',
    addReview: 'Bookmark',
    bookmarked: 'Bookmarked',
    hsAlertTitle: 'High-School Prerequisite Alerts',
    viewFullMap: 'View Prerequisite Map',
    backupTitle: 'Local Progress Backup',
    backupDesc: 'Read status, practice history, and custom dates are saved locally in your browser.',
    exportJson: 'Export JSON',
    importJson: 'Import JSON',
    resetProgress: 'Reset',
    resetConfirm: 'Reset all local learning progress?',
    importOk: 'Progress imported successfully!',
    importFail: 'Invalid file format.',
    hideFormulas: 'Hide Formulas',
    showFormulas: 'Show Formulas',
    oneLineCore: 'Core Takeaway:',
    tabStudy: 'Full Study Guide',
    tabQuick: '30s Review & Patterns',
    tabLab: 'Interactive Lab',
    tabPractice: 'Practice',
    secSymbols: 'Symbols',
    secConcept: 'Intuition & Def',
    secFormulas: 'Formulas',
    secSteps: 'Visual Steps',
    secExamples: 'Examples',
    secErrors: 'Common Errors',
    hConcept: '1. What Problem Does This Solve?',
    hIntuition: 'Intuition',
    hDefinition: 'Formal Definition',
    hGeometry: 'Geometric Meaning',
    hFormulas: '2. Formulas, Variables & Conditions',
    conditions: 'Conditions:',
    commonMisuse: 'Common Misuse:',
    hSop: '3. Standard Solving Workflow',
    hExamples: '4. Worked Examples',
    hErrors: '5. Common Errors & Diagnostics',
    hQuickReview: '30-Second Quick Review',
    whenToUse: 'When to Use:',
    trapAlert: 'Exam Trap Alert:',
    hQuickFormulas: 'Quick Formula Sheet',
    hPrereqs: 'Prerequisites',
    hNext: 'Next Recommended',
  },
  zh: {
    brand: 'Calculus Survival Kit',
    navOverview: '學習總覽',
    navC1: '微積分（一）',
    navC2: '微積分（二）',
    navMap: '先備依賴圖',
    navPractice: '題庫與錯題本',
    navGlossary: '術語表',
    searchBtn: '搜尋',
    searchPlaceholder: '搜尋章節、微積分主題、英文名詞（如 Riemann, Taylor, ODE）...',
    searchEmpty: '找不到符合的教材或頁面：',
    sidebarTitle: '章節導覽',
    close: '關閉',
    progressLabel: '學習進度',
    liveModules: '已上線教材模塊',
    plannedModules: '後續規劃節點',
    plannedBadge: '規劃中',
    backToTop: '頂部',
    loadingPage: '載入頁面中...',
    loadingModule: '載入教材模塊中...',
    heroEyebrow: 'NYCU CALCULUS · PRO LEARNING SYSTEM',
    heroTitle: '微積分，從未如此直覺。',
    heroSub:
      '結合高中先備補強、NYCU 微積分（一）（二）考試主線、可展開式沿革圖解與互動視覺化實驗室。按 ⌘K 隨時秒速跳轉任何單元。',
    ctaC1: '進入微積分（一）課程地圖',
    ctaPractice: '題庫與錯題複習',
    ctaLec10: '第 10 課：黎曼積分',
    completionLabel: '課程完成度',
    masteredOf: '已掌握',
    coreModules: '個核心模塊',
    finalSprint: '期末考衝刺直達（W9–W12）',
    lec8: '第 8 課：極值分析與定理',
    lec9: '第 9 課：逼近・牛頓・ODE',
    lec10: '第 10 課：黎曼積分與 FTC',
    practiceAccuracy: '實戰練習與待複習',
    ready: '準備就緒',
    startFirst: '從任一單元開始第一題練習',
    toReview: '待複習',
    openPractice: '開啟題庫與錯題本',
    modulesHeading: '已上線教材模塊',
    modulesSub: '全單元通過數學檢核，支援白話圖解、沿革詳解與互動實驗室。',
    filterAll: '全部教材',
    filterHS: '高中先備',
    filterC1: '微積分（一）',
    filterC2: '微積分（二）',
    filterApp: '生醫應用',
    enterModule: '進入學習',
    read: '已讀',
    markRead: '標記已讀',
    review: '待複習',
    addReview: '加入待複習',
    bookmarked: '已加待複習',
    hsAlertTitle: '高中先備弱點預警',
    viewFullMap: '查看完整先備依賴圖',
    backupTitle: '本機進度備份與管理',
    backupDesc: '所有已讀狀態、練習紀錄與自訂週次日期皆安全保存於本機瀏覽器。',
    exportJson: '匯出進度',
    importJson: '匯入進度',
    resetProgress: '重設進度',
    resetConfirm: '確定要重設所有本機學習進度嗎？',
    importOk: '已成功匯入學習進度！',
    importFail: '檔案格式錯誤，匯入失敗。',
    hideFormulas: '收合公式欄',
    showFormulas: '展開公式欄',
    oneLineCore: '一句話核心：',
    tabStudy: '完整教學（從符號到詳解）',
    tabQuick: '30秒複習與題型',
    tabLab: '互動實驗室',
    tabPractice: '練習題',
    secSymbols: '符號文法',
    secConcept: '核心直覺與定義',
    secFormulas: '公式與條件',
    secSteps: '圖文步驟',
    secExamples: '完整例題',
    secErrors: '常見錯誤',
    hConcept: '1. 這個概念解決什麼問題？',
    hIntuition: '白話直覺',
    hDefinition: '正式定義',
    hGeometry: '圖像與幾何意義',
    hFormulas: '2. 公式、變數與適用條件',
    conditions: '適用條件：',
    commonMisuse: '常見誤用：',
    hSop: '3. 標準解題流程',
    hExamples: '4. 逐步拆解例題',
    hErrors: '5. 常見錯誤與診斷',
    hQuickReview: '30 秒快速複習',
    whenToUse: '何時使用：',
    trapAlert: '考場陷阱警報：',
    hQuickFormulas: '快速公式速記',
    hPrereqs: '先備知識',
    hNext: '下一步建議',
  },
} as const;

type DictKey = keyof typeof DICT.en;

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (key: DictKey) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (k) => DICT.en[k],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('csk-lang');
      return saved === 'zh' ? 'zh' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
    try {
      localStorage.setItem('csk-lang', lang);
    } catch {}
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  const t = (key: DictKey) => DICT[lang][key];

  return (
    <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
