import { FC, DragEvent, useContext, useState, ChangeEvent } from "react";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui";
import { EntriesContext } from "../../context/entries";

interface Props {
  entry: Entry;
}

export const EntryListCard: FC<Props> = ({ entry }) => {
  const [inputDescription, setInputDescription] = useState(entry.description);

  const { setIsDragging } = useContext(UIContext);
  const { setIsEditing, updateEntry } = useContext(EntriesContext);

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
                <Typography variant="body2">{entry.createdAt}</Typography>
              </Box>
            </CardActions>
          </Box>
        )}
      </CardActionArea>
    </Card>
  );
};
