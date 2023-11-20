import { FC, ReactNode, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { ENTRIES_INITIAL_STATE, EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces";

interface EntriesState {
  children: ReactNode;
}

export const EntriesProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      editing: false,
      status: "pending",
    };
    dispatch({ type: "Entry - Add Entry", paylaod: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "Entry - Entry Updated", payload: entry });
  };

  const setIsEditing = (entry: Entry) => {
    dispatch({ type: "Entry - Entry Updated", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        setIsEditing,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
