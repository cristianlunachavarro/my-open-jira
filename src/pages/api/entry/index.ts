import { NextApiRequest, NextApiResponse } from "next";
import Entry from "../../../../models/entries";
import { Entry as EntryInterface } from "../../../../interfaces/index";

import { connect, disconnect } from "../../../../database/db";

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

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const getEntries = async () => {
    try {
      await connect();
      const entries: EntryInterface[] = await Entry.find();
      res.status(200).json(entries);
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


  const { body, method } = req;

  switch (method) {
    case "GET":
      await getEntries();
      break;
    case "POST":
      await createEntry(body);
      break;
    case "PUT":
      await updateEntry(body);
      break;
    default:
      res.status(405).json({ error: "Method Not Allowed" });
  }
}
