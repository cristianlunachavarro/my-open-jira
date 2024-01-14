import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";

import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import { EntriesContext } from "../../../context/entries";
import { Entry, Task } from "../../../interfaces";

import styles from "./TasksList.module.css";

interface Props {
  entry: Entry;
}

const TasksList: FC<Props> = ({ entry }) => {
  const {
    completedTask,
    addNewTask,
    deleteTask,
    setIsEditingTask,
    updateTask,
  } = useContext(EntriesContext);

  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState("");

  const [error, setError] = useState({
    input: "",
    hasError: false,
    errorMessage: "",
  });

  const handleAddTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (value.length > 50) {
      setError({
        input: "addTask",
        hasError: true,
        errorMessage: "Max 50 characters",
      });
      return;
    }
    setNewTask(value);
    setError({
      input: "",
      hasError: false,
      errorMessage: "",
    });
  };

  const handleEditTask = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    if (value.length > 50) {
      setError({
        input: "editTask",
        hasError: true,
        errorMessage: "Max 50 characters",
      });
      return;
    }
    setEditedTask(value);
    setError({
      input: "",
      hasError: false,
      errorMessage: "",
    });
  };

  const handleCompleteTask = (
    taskId: string,
    entry: Entry,
    completed: boolean
  ) => {
    completedTask({ taskId, entry, completed });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId, entry);
  };

  const handleIsEditingTask = (task: Task) => {
    task.isEditing = true;
    setIsEditingTask(entry, task);
  };

  const handleSubmitTask = (task: Task) => {
    if (editedTask.length <= 10) {
      setError({
        input: "editTask",
        hasError: true,
        errorMessage: "Min 10 characters",
      });
      return;
    }
    const { _id: taskId } = task;
    task.isEditing = false;
    setIsEditingTask(entry, task);
    updateTask({ entry, taskId, editedTask });
    setEditedTask("");
  };

  const handleSubmitEntry = () => {
    if (newTask.length <= 10) {
      setError({
        input: "addTask",
        hasError: true,
        errorMessage: "Min 10 characters",
      });
      return;
    }
    setError({
      input: "",
      hasError: false,
      errorMessage: "",
    });
    addNewTask({ newTask, entry });
    setNewTask("");
  };

  return (
    <Box margin={"10px"} display={"flex"} flexDirection={"column"}>
      <div className={styles.tasksContainer}>
        {entry.tasks &&
          entry.tasks.map((task: Task) => (
            <div key={task._id} className={styles.tasks}>
              {task.isEditing ? (
                <TextField
                  style={{ width: "100%", margin: "10px 0" }}
                  label={
                    error.input === "editTask" && error.hasError
                      ? error.errorMessage
                      : "Nueva Tarea"
                  }
                  error={error.input === "editTask" && error.hasError}
                  variant="outlined"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitTask(task)}
                  onChange={handleEditTask}
                />
              ) : (
                <>
                  <FormControlLabel
                    style={{ fontSize: "8rem" }}
                    control={
                      <Checkbox
                        checked={task.completed}
                        onChange={() =>
                          handleCompleteTask(task._id, entry, !task.completed)
                        }
                        id={`task-${task._id}`}
                      />
                    }
                    label={task.taskName}
                    htmlFor={`task-${task._id}`}
                  />
                  <div className={styles.buttonsContainer}>
                    <ModeEditOutlinedIcon
                      onClick={() => handleIsEditingTask(task)}
                      style={{ fontSize: "17.5px" }}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleDeleteTask(task._id)}
                      style={{ fontSize: "17.5px" }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      <TextField
        label={
          error.input === "addTask" && error.hasError
            ? error.errorMessage
            : "Nueva Tarea"
        }
        variant="outlined"
        value={newTask}
        onChange={(e) => handleAddTask(e)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmitEntry()}
        error={error.input === "addTask" && error.hasError}
      />
    </Box>
  );
};

export default TasksList;
