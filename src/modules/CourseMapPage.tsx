import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import calculus1Data from '../../curriculum/calculus1.json';
import calculus2Data from '../../curriculum/calculus2.json';
import { NODE_SUMMARIES } from '../data/curriculumIndex';
import { CourseTag } from '../types/curriculum';
import { UserProgressState } from '../store/progressStore';
interface CourseMapPageProps {
course: 'C1' | 'C2';
progress: UserProgressState;
onUpdateWeekDate: (course: 'C1' | 'C2', week: number, dateStr: string) => void;
}
const C1_CONTINUITY_NOTES: Record<number, string> = {
3: '連貫脈絡：先用離散更新＋蛛網圖建立動態直覺，再收縮步長引入瞬時變化率與極限。',
5: '連貫脈絡：先學基本微分規則，再以連鎖律貫通三角與指數微分。',
10: '連貫脈絡：全部都用「切線」！切線估函數值（線性逼近）→ 找根（牛頓法）→ 推演 ODE（尤拉法）→ 精確反推（反導數，銜接下週積分）。',
12: '連貫脈絡：從下／上黎曼和夾擠出黎曼積分，再以微積分基本定理免去硬算極限。',
};
const C2_CONTINUITY_NOTES: Record<number, string> = {
2: '連貫脈絡：複習 C1 W10 的 ODE 與歐拉法，並正式引入自治系統與分離變數解析解。',
3: '連貫脈絡：從單物種羅吉斯穩定性，擴展到雙物種掠食者－被捕食者系統。',
8: '連貫脈絡：從集合論與機率公理出發，透過條件機率銜接下週的貝氏定理。',
};
export const CourseMapPage: React.FC<CourseMapPageProps> = ({
course,
progress,
onUpdateWeekDate,
}) => {
const [tagFilter, setTagFilter] = useState<CourseTag | 'ALL'>('ALL');
const [editingWeek, setEditingWeek] = useState<number | null>(null);
const [draftDate, setDraftDate] = useState<string>('');
const weeks =
course === 'C1'
? calculus1Data.weeks.map((w) => ({ ...w, phaseName: '微積分（一）主線' }))
: calculus2Data.phases.flatMap((p) =>
p.weeks.map((w) => ({ ...w, phaseName: p.name }))
);
const courseTitle = course === 'C1' ? calculus1Data.course_name : calculus2Data.course_name;
const positioning = course === 'C1' ? calculus1Data.course_positioning : calculus2Data.course_positioning;
return (
<div>
<div className="card">
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
<div>
<h1 style={{ margin: 0 }}>{courseTitle} 課程週次地圖</h1>
<p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>{positioning}</p>
</div>
<div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
{(['ALL', 'HS', 'BRIDGE', 'C1', 'C2', 'APP'] as const).map((tag) => (
<button
key={tag}
className={`btn btn-sm ${tagFilter === tag ? 'btn-primary' : ''}`}
onClick={() => setTagFilter(tag)}
>
{tag === 'ALL' ? '全部標籤' : tag}
</button>
))}
</div>
</div>
{course === 'C2' && (
<div className="callout warn" style={{ marginBottom: 0 }}>
<strong>提醒：</strong>{calculus2Data.date_note} 您可點擊各週「編輯日期」自訂實際學期行事曆。
</div>
)}
</div>
<div className="card table-scroll">
<table>
<thead>
<tr>
<th style={{ width: 70 }}>週次</th>
<th style={{ width: 170 }}>日期（可自訂）</th>
<th>課綱主題</th>
<th>對應知識節點</th>
</tr>
</thead>
<tbody>
{weeks.map((w) => {
const customDate = progress.customWeekDates[course]?.[w.week];
const displayDate = customDate || w.date;
const matchedNodes = NODE_SUMMARIES.filter((n) => {
const weekList = course === 'C1' ? n.weeks.C1 : n.weeks.C2;
const inWeek = weekList?.includes(w.week);
const matchesTag = tagFilter === 'ALL' || n.courseTags.includes(tagFilter);
return inWeek && matchesTag;
});
const isExam = w.topics.some((t) => t.includes('期中考') || t.includes('期末考') || t.includes('小考'));
return (
<tr key={w.week} style={{ background: isExam ? '#fffbeb' : undefined }}>
<td>
<strong>W{w.week}</strong>
{course === 'C2' && (
<div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
{w.phaseName.slice(0, 4)}
</div>
)}
</td>
<td>
{editingWeek === w.week ? (
<div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
<input
type="text"
value={draftDate}
onChange={(e) => setDraftDate(e.target.value)}
placeholder="YYYY-MM-DD"
style={{ width: 105, fontSize: '0.82rem', padding: '0.2rem' }}
/>
<button
className="btn btn-sm btn-primary"
onClick={() => {
onUpdateWeekDate(course, w.week, draftDate);
setEditingWeek(null);
}}
>
存
</button>
</div>
) : (
<div>
<div style={{ fontSize: '0.86rem' }}>{displayDate}</div>
<button
className="btn btn-sm"
style={{ padding: '0.1rem 0.4rem', fontSize: '0.72rem', marginTop: 2 }}
onClick={() => {
setEditingWeek(w.week);
setDraftDate(displayDate);
}}
>
編輯日期
</button>
</div>
)}
</td>
<td>
<ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
{w.topics.map((topic, idx) => (
<li key={idx} style={{ fontWeight: topic.includes('考') ? 700 : 400 }}>{topic}</li>
))}
</ul>
{(course === 'C1' ? C1_CONTINUITY_NOTES[w.week] : C2_CONTINUITY_NOTES[w.week]) && (
<div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.35rem', background: 'var(--primary-soft)', padding: '0.25rem 0.5rem', borderRadius: 5 }}>
{course === 'C1' ? C1_CONTINUITY_NOTES[w.week] : C2_CONTINUITY_NOTES[w.week]}
</div>
)}
</td>
<td>
{matchedNodes.length === 0 ? (
<span style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>—</span>
) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
{matchedNodes.map((node) => (
<div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
{node.contentStatus === 'verified' ? (
<Link to={`/module/${node.id}`} style={{ fontWeight: 600 }}>
{node.title}
</Link>
) : (
<span style={{ color: 'var(--text-muted)' }}>{node.title}</span>
)}
<span className={`badge badge-${node.contentStatus}`}>
{node.contentStatus === 'verified' ? '已上線' : '規劃中'}
</span>
</div>
))}
</div>
)}
</td>
</tr>
);
})}
</tbody>
</table>
</div>
</div>
);
};
