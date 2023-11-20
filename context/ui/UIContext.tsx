import { createContext } from "react";
import { Entry } from "../../interfaces";

interface contextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
  isEditing: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAddingEntry: boolean) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const UIContext = createContext({} as contextProps);
