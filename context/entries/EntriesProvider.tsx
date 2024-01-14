import { FC, ReactNode, useEffect, useReducer, useState } from "react";
import instance from "../../src/axiosInstance";

import { ENTRIES_INITIAL_STATE, EntriesContext, entriesReducer } from "./";
import { Entry, Task } from "../../interfaces";

interface EntriesState {
  children: ReactNode;
}

export const EntriesProvider: FC<EntriesState> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const [isLoading, setIsloading] = useState<boolean>(false);

  // Entry

  const addNewEntry = async (description: string) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.post("entry", {
        description: description,
      });
      setIsloading(false);
      dispatch({ type: "Entry - Add Entry", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error adding new entry:", err);
    }
  };

  const updateEntry = async (entry: Entry) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.put("entry", entry);
      setIsloading(false);
      dispatch({ type: "Entry - Entry Updated", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error updating an entry:", err);
    }
  };

  const deleteEntry = async (entry: Entry) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry[] } = await instance.delete(
        `entry/${entry._id}`
      );
      setIsloading(false);
      dispatch({ type: "Entry - Delete entry", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error adding new entry:", err);
    }
  };

  const setIsEditing = (entry: Entry) => {
    dispatch({ type: "Entry - Entry Updated", payload: entry });
  };

  const getEntries = async () => {
    try {
      setIsloading(true);
      const { data }: { data: Entry[] } = await instance.get("entry");
      setIsloading(false);
      dispatch({ type: "Entry - Get entries", payload: data });
    } catch (err) {
      console.error("Error getting entries:", err);
      setIsloading(false);
    }
  };

  //Tasks

  const addNewTask = async ({
    newTask,
    entry,
  }: {
    newTask: string;
    entry: Entry;
  }) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.post("entry/task", {
        newTask,
        entry,
      });
      setIsloading(false);
      dispatch({ type: "Entry - Add New Task", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error Adding new task:", err);
    }
  };

  const deleteTask = async (taskId: string, entry: Entry) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.delete(
        `entry/task/${taskId}`,
        {
          params: {
            entryId: entry._id,
          },
        }
      );
      setIsloading(false);
      dispatch({ type: "Entry - Delete Task", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error deleting a task:", err);
    }
  };

  const updateTask = async ({
    entry,
    taskId,
    editedTask,
  }: {
    entry: Entry;
    taskId: string;
    editedTask: string;
  }) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.put("entry/task", {
        taskId,
        entry,
        value: { editedTask },
      });
      setIsloading(false);
      dispatch({ type: "Entry - Task Update", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error updating a task:", err);
    }
  };

  const completedTask = async ({
    entry,
    taskId,
    completed,
  }: {
    entry: Entry;
    taskId: string;
    completed: boolean;
  }) => {
    try {
      setIsloading(true);
      const { data }: { data: Entry } = await instance.put("entry/task", {
        entry,
        taskId,
        value: { completed },
      });
      setIsloading(false);
      dispatch({ type: "Entry - Complete Task", payload: data });
    } catch (err) {
      setIsloading(false);
      console.error("Error updating a task:", err);
    }
  };

  const setIsEditingTask = (entry: Entry, task: Task) => {
    dispatch({ type: "Entry - Is Editing Task", payload: { entry, task } });
  };

  useEffect(() => {
    getEntries();
  }, [dispatch]);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        isLoading,
        addNewEntry,
        updateEntry,
        setIsEditing,
        getEntries,
        deleteEntry,
        addNewTask,
        completedTask,
        deleteTask,
        setIsEditingTask,
        updateTask,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
