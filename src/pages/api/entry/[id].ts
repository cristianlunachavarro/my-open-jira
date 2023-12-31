import { NextApiRequest, NextApiResponse } from "next";
import { connect, disconnect } from "../../../../database/db";
import Entry from "../../../../models/entries";

type Data = {
    entry?: {
        id: string;
        description: string;
        status: string;
        createdAt: Date;
    };
    error?: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const deleteEntry = async (id: string) => {
        try {
            await connect();
            const result = await Entry.deleteOne({ _id: id });
            if (result.deletedCount > 0) {
                const remainingEntries = await Entry.find();
                res.status(200).json(remainingEntries);

            } else {
                console.error('Error entry not found');
                const errorResponse: Data = {
                    error: 'Internal Server Error',
                };
                res.status(404).json(errorResponse);
            }
            await connect();
        } catch (err) {
            console.error('Error deleting an entry:', err);
            const errorResponse: Data = {
                error: 'Internal Server Error',
            };
            res.status(500).json(errorResponse);
            await disconnect();
        }
    }

    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case 'DELETE':
            await deleteEntry(id as string)
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Método ${method} no permitido`);
    }
}

