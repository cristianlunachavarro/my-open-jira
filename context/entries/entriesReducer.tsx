import { v4 as uuidv4 } from "uuid";

import { Entry } from "../../interfaces";
import { act } from "react-dom/test-utils";

interface EntriesState {
  entries: Entry[];
}

export const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
      status: "pending",
      editing: false,
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En progreso: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu",
      status: "in-progress",
      editing: false,
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Terminada: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      status: "finished",
      editing: false,
      createdAt: Date.now() - 100000,
    },
  ],
};

type entriesActionType =
  | { type: "Entry - Add Entry"; paylaod: Entry }
  | { type: "Entry - Entry Updated"; payload: Entry }
  | { type: "Entry - Is Editing"; payload: Entry };

export const entriesReducer = (
  state: EntriesState = ENTRIES_INITIAL_STATE,
  action: entriesActionType
): EntriesState => {
  switch (action.type) {
    case "Entry - Add Entry":
      return { ...state, entries: [...state.entries, action.paylaod] };
    case "Entry - Entry Updated":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "Entry - Is Editing":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            console.log(entry._id, action.payload._id)
            entry.editing = entry.editing;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};
