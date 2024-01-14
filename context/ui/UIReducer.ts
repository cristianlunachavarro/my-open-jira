import { Entry } from "../../interfaces";

interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  isEditing: boolean;
  errorMessage: string;
}

export const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isEditing: false,
  errorMessage: "",
};

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - IsAddingEntry"; payload: boolean }
  | { type: "UI - IsDragging"; payload: boolean }
  | { type: "UI - isEditing"; payload: { entry: Entry; isEditing: boolean } }
  | { type: "UI - Error Message"; payload: string }
  | { type: "UI - Clean Error" };

export const UIReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return { ...state, sideMenuOpen: true };
    case "UI - Close Sidebar":
      return { ...state, sideMenuOpen: false };
    case "UI - IsAddingEntry":
      return { ...state, isAddingEntry: action.payload };
    case "UI - IsDragging":
      return { ...state, isDragging: action.payload };
    case "UI - isEditing":
      return { ...state, isEditing: action.payload.isEditing };
    case "UI - Error Message":
      return { ...state, errorMessage: action.payload };
    case "UI - Clean Error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};
