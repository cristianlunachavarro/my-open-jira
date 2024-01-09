export interface Entry {
  _id: string;
  description: string;
  tasks: [];
  createdAt: string;
  editing: boolean,
  status: EntryStatus;
}

export type EntryStatus = "pending" | "in-progress" | "finished";
