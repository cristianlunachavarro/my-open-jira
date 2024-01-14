import { Button, Box, TextField } from "@mui/material";
import { SaveOutlined, AddOutlined } from "@mui/icons-material";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../../context/entries";
import { UIContext } from "../../../context/ui";

export const NewEntry = () => {
  const { addNewEntry, entries } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const handleAddClicked = (value: boolean) => {
    setIsAddingEntry(value);
  };

  const handleInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
    setInputTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddinX: 1 }}>
      {isAddingEntry ? (
        <>
          <TextField
            value={inputValue}
            label="Nueva entrada"
            placeholder="Nueva entrada"
            fullWidth
            autoFocus
            multiline
            onChange={(e) => handleInputValue(e)}
            error={inputValue.length <= 0 && inputTouched}
            onBlur={() => setInputTouched(true)}
          />
          <Box display="flex" justifyContent="space-between" marginTop={1}>
            {" "}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleAddClicked(false)}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveOutlined />}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddOutlined />}
          fullWidth
          variant="outlined"
          onClick={() => handleAddClicked(true)}
        >
          Create ticket
        </Button>
      )}
    </Box>
  );
};
