import { createContext } from "react";
import { Entry } from "../../interfaces";

interface ContextProps {
  entries: Entry[];
  editing: boolean;
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  setIsEditing: (entry: Entry) => void;
}

export const EntriesContext = createContext({} as ContextProps);
