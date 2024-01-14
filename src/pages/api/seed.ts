import { Request, Response } from "express";

import { connect, disconnect } from "../../../database/db";
import Entry from "../../../models/entries";

const seedData = [
  {
    description:
      "Pendiente: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    status: "pending",
    tasks: [
      {
        taskName: "Rer fort que fos, que yo no manifestàs a la majesta",
        completed: true,
      },
      {
        taskName: "Donec vel egestas dolor, nec dignissim metus",
        completed: false,
      },
      {
        taskName: "Donec laoreet rutrum libero sed pharetra",
        completed: false,
      },
    ],
  },
  {
    description:
      "En progreso: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatu",
    status: "in-progress",
    tasks: [
      {
        taskName: "Tirant lo Blanc es una novela de caballerías escrita",
        completed: false,
      },
      { taskName: "Por Joanot Martorell y publicada en 1490", completed: true },
    ],
  },
  {
    description:
      "Terminada: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    status: "finished",
    tasks: [
      { taskName: "Per bé que sia cosa de gran dolor", completed: false },
    ],
  },
];

const handler = async (_req: Request, res: Response) => {
  try {
    await connect();
    await Entry.deleteMany();

    const seedEntries = await Entry.insertMany(seedData);
    await disconnect();
    console.log("Seeding completed successfully");
    res.status(200).json(seedEntries);
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await disconnect();
  }
};

export default handler;
