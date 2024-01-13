import { NextApiRequest, NextApiResponse } from "next";
import { Entry as EntryInterface } from "../../../../../interfaces";
import Entry from "../../../../../models/entries";
import { connect, disconnect } from "../../../../../database/db";
import { Task } from "../../../../../interfaces";
import corsMiddleware from "../../corsMiddleware";

type Data = {
  entry?: EntryInterface;
  error?: string;
};

interface UpdateTaskBody {
  entry: EntryInterface;
  taskId: string;
  value: {
    completed?: boolean;
    editedTask?: string;
  };
}

interface AddTaskBody {
  entry: EntryInterface;
  newTask: Task;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  corsMiddleware(req, res, async () => {
    const updateTask = async (body: UpdateTaskBody) => {
      const { entry, taskId, value } = body;
      try {
        let updateField: string;
        let updatedValue: string | boolean;

        if (value.editedTask) {
          updateField = "tasks.$.taskName";
          updatedValue = value.editedTask;
        } else {
          // Provide a default value in case value.completed is undefined
          updateField = "tasks.$.completed";
          updatedValue = value.completed || false;
        }

        const updateQuery: { $set: Record<string, string | boolean> } = {
          $set: {},
        };

        updateQuery.$set[updateField] = updatedValue;

        await connect();

        const updatedTask = await Entry.findOneAndUpdate(
          { _id: entry._id, "tasks._id": taskId },
          updateQuery,
          { new: true }
        );

        res.status(200).json(updatedTask);
      } catch (err) {
        console.error("Error actualizando tarea:", err);
        res.status(500).json({ error: "Error al actualizar tarea" });
      } finally {
        await disconnect();
      }
    };

    const addTask = async (body: AddTaskBody) => {
      const { entry, newTask } = body;

      try {
        await connect();

        const existingEntry = await Entry.findById(entry._id);

        existingEntry.tasks.push({ taskName: newTask });

        const updatedEntry = await existingEntry.save();

        res.status(200).json(updatedEntry);
      } catch (error) {
        console.error("Error al agregar tarea:", error);
        return { success: false, error: "Error al agregar tarea" };
      } finally {
        await disconnect();
      }
    };

    const { body, method } = req;
    switch (method) {
      case "PUT":
        await updateTask(body);
        break;
      case "POST":
        await addTask(body);
      default:
        res.status(405).json({ error: "Method Not Allowed" });
    }
  });
}
