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
    setIsEditing: ({ entry, isEditing }: { entry: Entry, isEditing: boolean }) => void
    setErrorMessage: (message: string) => void;
    cleanErrorMessage: () => void;
}

export const UIContext = createContext({} as contextProps);
