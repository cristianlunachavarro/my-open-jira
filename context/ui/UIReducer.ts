import { Entry } from "../../interfaces";

interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  isEditing: boolean;
}

export const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
  isEditing: false,
};

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - IsAddingEntry"; payload: boolean }
  | { type: "UI - IsDragging"; payload: boolean }
  | { type: "UI - isEditing"; payload: { enttry: Entry; isEditing: boolean } };

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
      return { ...state, isEditing: action.payload };
    default:
      return state;
  }
};
