import { createContext } from "react";
import { Entry, Task } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (entry: Entry) => void;
  getEntries: () => void;
  setIsEditing: (entry: Entry) => void;
  addNewTask: ({ newTask, entry }: { newTask: string; entry: Entry }) => void;
  completedTask: ({
    taskId,
    entry,
    completed,
  }: {
    taskId: string;
    entry: Entry;
    completed: boolean;
  }) => void;
  deleteTask: (taskId: string, entry: Entry) => void;
  setIsEditingTask: (entry: Entry, task: Task) => void;
  updateTask: ({
    taskId,
    entry,
    editedTask,
  }: {
    taskId: string;
    entry: Entry;
    editedTask: string;
  }) => void;
}

export const EntriesContext = createContext({} as ContextProps);
