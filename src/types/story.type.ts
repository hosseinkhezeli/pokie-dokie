export type TStoryStatus =
  | 'PENDING'
  | 'OPEN'
  | 'REVEALED'
  | 'CLOSED'
  | 'SKIPPED';
export interface IStory {
  id: number;
  title: string;
  description?: string;
  status: TStoryStatus;
  finalEstimate?: string;
  sessionId: number;
  createdAt: string;
  updatedAt: string;
  orderIndex: number;
}
