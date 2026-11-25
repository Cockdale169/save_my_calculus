import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useProgressStore } from './store/progressStore';
import { LanguageProvider } from './store/i18n';
const DashboardPage = lazy(() => import('./modules/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const CourseMapPage = lazy(() => import('./modules/CourseMapPage').then((m) => ({ default: m.CourseMapPage })));
const KnowledgeGraphPage = lazy(() => import('./modules/KnowledgeGraphPage').then((m) => ({ default: m.KnowledgeGraphPage })));
const ModulePage = lazy(() => import('./modules/ModulePage').then((m) => ({ default: m.ModulePage })));
const GlossaryPage = lazy(() => import('./modules/GlossaryPage').then((m) => ({ default: m.GlossaryPage })));
const PracticeCenterPage = lazy(() => import('./modules/PracticeCenterPage').then((m) => ({ default: m.PracticeCenterPage })));
const PageLoader: React.FC = () => (
<div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
載入頁面中...
</div>
);
export const App: React.FC = () => {
const {
state,
toggleRead,
toggleReview,
recordPractice,
updateWeekDate,
exportProgress,
importProgress,
resetProgress,
} = useProgressStore();
return (
<LanguageProvider>
<HashRouter>
<Layout readNodes={state.readNodes}>
<Suspense fallback={<PageLoader />}>
<Routes>
<Route
path="/"
element={
<DashboardPage
progress={state}
onExport={exportProgress}
onImport={importProgress}
onReset={resetProgress}
/>
}
/>
<Route
path="/course/c1"
element={
<CourseMapPage
course="C1"
progress={state}
onUpdateWeekDate={updateWeekDate}
/>
}
/>
<Route
path="/course/c2"
element={
<CourseMapPage
course="C2"
progress={state}
onUpdateWeekDate={updateWeekDate}
/>
}
/>
<Route path="/map" element={<KnowledgeGraphPage />} />
<Route
path="/module/:nodeId"
element={
<ModulePage
progress={state}
onToggleRead={toggleRead}
onToggleReview={toggleReview}
onRecordPractice={recordPractice}
/>
}
/>
<Route path="/glossary" element={<GlossaryPage />} />
<Route
path="/practice"
element={
<PracticeCenterPage
progress={state}
onRecordPractice={recordPractice}
/>
}
/>
</Routes>
</Suspense>
</Layout>
</HashRouter>
</LanguageProvider>
);
};
export default App;
