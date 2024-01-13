import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../database/db";
import Entry from "../../../../models/entries";
import { Entry as EntryInterface } from "../../../../interfaces/index";
import corsMiddleware from "../corsMiddleware";

type Data = EntryInterface[] | { error: string };

interface BodyProps {
  _id?: string;
  description: string;
  status: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  corsMiddleware(req, res, async () => {
    const getEntries = async () => {
      try {
        await connect();
        const entries: EntryInterface[] = await Entry.find();
        res.status(200).json(entries);
        await disconnect();
      } catch (err) {
        console.error("Error getting entries:", err);
        const errorResponse: Data = {
          error: "Internal Server Error",
        };
        res.status(500).json(errorResponse);
        await disconnect();
      }
    };

    const createEntry = async (body: BodyProps) => {
      const { description, status } = body;
      try {
        await connect();
        const newEntry = await new Entry({
          description: description,
          status: status,
        }).save();
        res.status(200).json(newEntry);
        await disconnect();
      } catch (err) {
        console.error("Error creating entry:", err);
        const errorResponse: Data = {
          error: "Internal Server Error",
        };
        res.status(500).json(errorResponse);
        await disconnect();
      }
    };

    const updateEntry = async (body: BodyProps) => {
      const { description, status, _id } = body;
      try {
        await connect();
        const updatedEntry = await Entry.findOneAndUpdate(
          { _id: _id },
          { description: description, status: status },
          { new: true }
        );

        res.status(200).json(updatedEntry);
        await disconnect();
      } catch (err) {
        console.error("Error updating an entry:", err);
        const errorResponse: Data = {
          error: "Internal Server Error",
        };
        res.status(500).json(errorResponse);
        await disconnect();
      }
    };

    switch (req.method) {
      case "GET":
        await getEntries();
        break;
      case "POST":
        await createEntry(req.body);
        break;
      case "PUT":
        await updateEntry(req.body);
        break;
      case "OPTIONS":
        res.status(200).end();
        break;
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
  });
}
