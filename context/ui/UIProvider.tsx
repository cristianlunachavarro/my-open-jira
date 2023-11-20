import { FC, ReactNode, useReducer } from "react";
import { UIContext, UIReducer, UI_INITIAL_STATE } from "./";
import { Entry } from "../../interfaces";

interface UIProviderProps {
  children: ReactNode;
}

interface SetEditingProps {
  entry: Entry;
  isEditing: boolean;
}

export const UIProvider: FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({ type: "UI - IsAddingEntry", payload: isAddingEntry });
  };

  const setIsDragging = (isDragging: boolean) => {
    dispatch({ type: "UI - IsDragging", payload: isDragging });
  };

  const setIsEditing = ({
    entry,
    isEditing,
  }: {
    entry: Entry;
    isEditing: boolean;
  }) => {
    dispatch({ type: "UI - isEditing", payload: { entry, isEditing } });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        setIsDragging,
        setIsEditing,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
