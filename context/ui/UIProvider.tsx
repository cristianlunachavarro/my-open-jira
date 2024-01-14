import { FC, ReactNode, useReducer } from "react";
import { UI_INITIAL_STATE, UIContext, UIReducer } from "./";
import { Entry } from "../../interfaces";

interface UIProviderProps {
  children: ReactNode;
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

  const setErrorMessage = (message: string) => {
    dispatch({ type: "UI - Error Message", payload: message });
  };

  const cleanErrorMessage = () => {
    dispatch({ type: "UI - Clean Error" });
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
        setErrorMessage,
        cleanErrorMessage,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
