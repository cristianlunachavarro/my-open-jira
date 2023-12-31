import { ChangeEvent, DragEvent, FC, useContext, useState } from "react";

import { Box, Button, Card, CardActionArea, CardActions, CardContent, TextField, Typography, } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";

import ProgressLine from "../ui/ProgressLine"

import { formatTime } from "../../utils/helpers";
import TasksList from "./TasksList";

interface Props {
    entry: Entry;
}

export const EntryListCard: FC<Props> = ({ entry }) => {
    const [inputDescription, setInputDescription] = useState(entry.description);

    const { setIsDragging } = useContext(UIContext);
    const { setIsEditing, updateEntry, deleteEntry, completedTask } = useContext(EntriesContext);

    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.dataTransfer.setData("id", entry._id);
    };

    const onDragEnd = () => {
        setIsDragging(false);
    };

    const handleIsEditing = () => {
        entry.editing = true;
        setIsEditing(entry);
    };

    const handleEdit = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        setInputDescription(value);
    };

    const handleDelete = () => {
        deleteEntry(entry)
    }

    const handleSubmit = () => {
        if (inputDescription.length <= 0) return;
        entry.description = inputDescription;
        entry.editing = false;
        updateEntry(entry);
    };

    return (
        <Card
            sx={{ margin: 2 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                {entry.editing ? (
                    <Box sx={{ flexDirection: "column", display: "flex" }}>
                        <TextField
                            onChange={handleEdit}
                            onBlur={handleSubmit}
                            value={inputDescription}
                            error={inputDescription.length <= 0}
                            autoFocus
                            multiline
                            sx={{ padding: 1 }}
                        />
                        <Button onClick={handleSubmit} sx={{ margin: 1 }}>
                            Guardar
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <CardContent onClick={handleIsEditing}>
                            <Typography sx={{ whiteSpace: "pre-line" }}>
                                {entry.description}
                            </Typography>
                        </CardContent>
                        <TasksList entry={entry} />
                        <CardActions
                            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
                        >
                            <Box
                                display="flex"
                                width="100%"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Button onClick={handleIsEditing}>Editar</Button>
                                <Typography variant="body2"
                                    sx={{ marginRight: 2 }}>{formatTime(entry.createdAt)}</Typography>
                            </Box>
                            <DeleteOutlineOutlinedIcon onClick={handleDelete} />
                        </CardActions>
                        <ProgressLine status={entry.status} />
                    </Box>
                )}
            </CardActionArea>
        </Card>
    );
};
