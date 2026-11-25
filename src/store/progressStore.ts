import { useState, useEffect, useCallback } from 'react';
export interface PracticeRecord {
attempts: number;
correct: number;
lastAttemptAt: string;
wrongIds: string[];
}
export interface UserProgressState {
readNodes: string[];
reviewQueue: string[];
practiceByNode: Record<string, PracticeRecord>;
customWeekDates: {
C1: Record<number, string>;
C2: Record<number, string>;
};
}
const STORAGE_KEY = 'calculus-survival-kit-progress-v1';
const DEFAULT_STATE: UserProgressState = {
readNodes: [],
reviewQueue: [],
practiceByNode: {},
customWeekDates: {
C1: {},
C2: {},
},
};
function loadState(): UserProgressState {
try {
const raw = localStorage.getItem(STORAGE_KEY);
if (!raw) return DEFAULT_STATE;
const parsed = JSON.parse(raw) as Partial<UserProgressState>;
return {
readNodes: Array.isArray(parsed.readNodes) ? parsed.readNodes : [],
reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue : [],
practiceByNode: parsed.practiceByNode ?? {},
customWeekDates: {
C1: parsed.customWeekDates?.C1 ?? {},
C2: parsed.customWeekDates?.C2 ?? {},
},
};
} catch {
return DEFAULT_STATE;
}
}
export function useProgressStore() {
const [state, setState] = useState<UserProgressState>(() => loadState());
useEffect(() => {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
} catch {
}
}, [state]);
const toggleRead = useCallback((nodeId: string) => {
setState((prev) => {
const exists = prev.readNodes.includes(nodeId);
return {
...prev,
readNodes: exists
? prev.readNodes.filter((id) => id !== nodeId)
: [...prev.readNodes, nodeId],
};
});
}, []);
const toggleReview = useCallback((nodeId: string) => {
setState((prev) => {
const exists = prev.reviewQueue.includes(nodeId);
return {
...prev,
reviewQueue: exists
? prev.reviewQueue.filter((id) => id !== nodeId)
: [...prev.reviewQueue, nodeId],
};
});
}, []);
const recordPractice = useCallback(
(nodeId: string, questionId: string, isCorrect: boolean) => {
setState((prev) => {
const current = prev.practiceByNode[nodeId] ?? {
attempts: 0,
correct: 0,
lastAttemptAt: '',
wrongIds: [],
};
const wrongIds = isCorrect
? current.wrongIds.filter((id) => id !== questionId)
: Array.from(new Set([...current.wrongIds, questionId]));
return {
...prev,
practiceByNode: {
...prev.practiceByNode,
[nodeId]: {
attempts: current.attempts + 1,
correct: current.correct + (isCorrect ? 1 : 0),
lastAttemptAt: new Date().toISOString(),
wrongIds,
},
},
};
});
},
[]
);
const updateWeekDate = useCallback(
(course: 'C1' | 'C2', week: number, dateStr: string) => {
setState((prev) => ({
...prev,
customWeekDates: {
...prev.customWeekDates,
[course]: {
...prev.customWeekDates[course],
[week]: dateStr,
},
},
}));
},
[]
);
const exportProgress = useCallback(() => {
return JSON.stringify(state, null, 2);
}, [state]);
const importProgress = useCallback((jsonText: string): boolean => {
try {
const parsed = JSON.parse(jsonText) as Partial<UserProgressState>;
if (!parsed || typeof parsed !== 'object') return false;
setState({
readNodes: Array.isArray(parsed.readNodes) ? parsed.readNodes : [],
reviewQueue: Array.isArray(parsed.reviewQueue) ? parsed.reviewQueue : [],
practiceByNode: parsed.practiceByNode ?? {},
customWeekDates: {
C1: parsed.customWeekDates?.C1 ?? {},
C2: parsed.customWeekDates?.C2 ?? {},
},
});
return true;
} catch {
return false;
}
}, []);
const resetProgress = useCallback(() => {
setState(DEFAULT_STATE);
}, []);
return {
state,
toggleRead,
toggleReview,
recordPractice,
updateWeekDate,
exportProgress,
importProgress,
resetProgress,
};
}
