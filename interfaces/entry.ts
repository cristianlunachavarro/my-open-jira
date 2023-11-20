export interface Entry {
  _id: string;
  description: string;
  createdAt: number;
  editing: boolean,
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progress" | "finished";
