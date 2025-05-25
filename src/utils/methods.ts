// Generate a unique ID
export const generateId = (length = 8): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

// Format time in MM:SS format
export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Calculate remaining time from end time
export const calculateRemainingTime = (endTimeMs: number | null): number => {
    if (!endTimeMs) return 0;
    const remainingMs = endTimeMs - Date.now();
    return Math.max(0, Math.floor(remainingMs / 1000));
};

// Calculate average of values, excluding nulls
export const calculateAverage = (values: (number | null)[]): number | null => {
    const validValues = values.filter((v): v is number => v !== null);
    if (validValues.length === 0) return null;
    const sum = validValues.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / validValues.length) * 10) / 10;
};

// Calculate most common value (mode)
export const calculateMode = (values: (number | null)[]): number | null => {
    const validValues = values.filter((v): v is number => v !== null);
    if (validValues.length === 0) return null;

    const counts = validValues.reduce(
        (acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        },
        {} as Record<number, number>
    );

    let maxCount = 0;
    let mode: number | null = null;

    for (const [value, count] of Object.entries(counts)) {
        if (count > maxCount) {
            maxCount = count;
            mode = Number(value);
        }
    }

    return mode;
};

// Calculate voting completion percentage
export const calculateVotingCompletion = (
    votes: { userId: string; value: number | null | '?' }[],
    activeUserIds: string[]
): number => {
    if (activeUserIds.length === 0) return 0;
    const votedUserCount = new Set(votes.map((v) => v.userId)).size;
    return Math.round((votedUserCount / activeUserIds.length) * 100);
};

//getCookie
export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
}

//___________________________________________________________________
