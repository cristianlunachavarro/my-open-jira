import { Entry, Task } from "../../interfaces";

interface EntriesState {
    entries: Entry[];
    Tasks: Task[];
}

export const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
    Tasks: [],
};

type entriesActionType =
    | { type: "Entry - Add Entry"; payload: Entry }
    | { type: "Entry - Entry Updated"; payload: Entry }
    | { type: "Entry - Is Editing"; payload: Entry }
    | { type: "Entry - Delete entry"; payload: Entry[] }
    | { type: "Entry - Add seeds entries"; payload: Entry }
    | { type: "Entry - Get entries", payload: Entry[] }
    | { type: "Entry - Complete Task", payload: Entry }
    | { type: "Entry - Add New Task", payload: Entry }
    | { type: "Entry - Delete Task", payload: Entry }
    | { type: "Entry - Is Editing Task"; payload: { entry: Entry, task: Task } }
    | { type: "Entry - Task Update"; payload: Entry }


export const entriesReducer = (
    state: EntriesState = ENTRIES_INITIAL_STATE,
    action: entriesActionType
): EntriesState => {
    switch (action.type) {
        case "Entry - Get entries":
            return { ...state, entries: action.payload }
        case "Entry - Add seeds entries":
            return { ...state, entries: [...state.entries, action.payload] }
        case "Entry - Add Entry":
            return { ...state, entries: [...state.entries, action.payload] };
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
        case "Entry - Delete entry":
            return { ...state, entries: action.payload };
        case "Entry - Is Editing":
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.editing = entry.editing;
                    }
                    return entry;
                }),
            };
        case "Entry - Complete Task":
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.tasks = action.payload.tasks
                    }
                    return entry;
                }),
            }
        case "Entry - Add New Task":
            return {
                ...state,
                entries: state.entries.map((entry) => {
                    if (entry._id === action.payload._id) {
                        entry.tasks = action.payload.tasks
                    }
                    return entry;
                }),
            }
        case "Entry - Delete Task":
            return {
                ...state,
                entries: state.entries.map((entry: Entry) => {
                    if (entry._id === action.payload._id) {
                        entry.tasks = action.payload.tasks
                    }
                    return entry;
                }),
            }
        case "Entry - Is Editing Task":
            return {
                ...state,
                entries: state.entries.map((entry: Entry) => {
                    if (entry._id === action.payload.entry._id) {
                        entry.tasks.map((task: Task) => {
                            if (task._id === action.payload.task._id) {
                                task.isEditing = task.isEditing
                            }
                        })
                    }
                    return entry;
                }),
            };
        case "Entry - Task Update":
            return {
                ...state,
                entries: state.entries.map((entry: Entry) => {
                    if (entry._id === action.payload._id) {
                        entry.tasks = action.payload.tasks
                    }
                    return entry;
                }),
            }
        default:
            return state;
    }
};