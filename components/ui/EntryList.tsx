import { DragEvent, FC, useContext, useMemo } from "react";

import { List, Paper } from "@mui/material";
import confetti from 'canvas-confetti'

import { EntryListCard } from ".";
import { EntryStatus } from "../../interfaces";

import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";

import { isValidTransition } from '../../utils/entryHelpers'

import styles from "./EntryList.module.css";


interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { updateEntry, entries } = useContext(EntriesContext);

    const { isDragging, setIsDragging, setErrorMessage } = useContext(UIContext);

    const allowDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData("id");
        const entry = entries.find((e) => e._id === id)!;
        if (isValidTransition(entry.status, status)) {
            entry.status = status;
            if (entry.status === 'finished') {
                confetti({
                    zIndex: 999,
                    particleCount: 200,
                    spread: 200,
                    angle: -70,
                    origin: {
                        x: 0.95,
                        y: 0,
                    },
                });
            }
            updateEntry(entry);
        } else {
            setErrorMessage('No se puede cambiar esta tarjeta')
        }
        setIsDragging(false);
    };

    const entriesByStatus = useMemo(() => {
        return entries.filter((e) => e.status === status);
    }, [entries]);

    return (
        <div
            id={status}
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ""}
        >
            <Paper
                sx={{
                    height: "calc(100vh - 250px)",
                    overflow: "scroll", //clean
                    backgroundColor: "transparent",
                }}
            >
                <List sx={{ opacity: isDragging ? "0.2" : "1", transition: "all .3s" }}>
                    {entriesByStatus.map((e) => (
                        <EntryListCard key={e._id} entry={e} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
