import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../../database/db";
import Entry from "../../../../../models/entries";

type Data = {
    entry?: {
        id: string;
        description: string;
        status: string;
        createdAt: Date;
    };
    error?: string;
};

interface DeleteProps {
    id?: string,
    entryId?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const deleteTask = async ({ id, entryId }: DeleteProps) => {
        try {
            await connect();
            const updatedEntries = await Entry.findOneAndUpdate(
                { _id: entryId },
                { $pull: { tasks: { _id: id } } },
                { new: true }
            );
            res.status(200).json(updatedEntries);
        } catch (err) {
            console.error('Error deleting an task:', err);
            const errorResponse: Data = {
                error: 'Internal Server Error',
            };
            res.status(500).json(errorResponse);
            await disconnect();
        }
    }

    const {
        query,
        method,
    } = req;



    switch (method) {
        case 'DELETE':
            await deleteTask(query as DeleteProps);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${method} no permitido`);
    }
}

