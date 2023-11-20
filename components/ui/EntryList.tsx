import { FC, useContext, useMemo, DragEvent } from "react";

import { Paper, List } from "@mui/material";

import { EntryListCard } from ".";
import { EntryStatus } from "../../interfaces";

import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";

import styles from "./EntryList.module.css";


interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { updateEntry, entries } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("id");
    const entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
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
          overflow: "scroll",
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
