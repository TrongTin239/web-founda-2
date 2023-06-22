import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// style modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, sm: 250 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// controller

//Edit Task function
function EditTasktModal({ onOpen, onClose, foundTask, onSubmitEdit }) {
  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    // formState: { touched },
  } = useForm({
    defaultValues: {
      // taskName: taskName,
      // taskPrority: taskPrority,
      // description: description,
    },
  });
  useEffect(() => {}, [foundTask]);
  // check edit exist
  if (!foundTask) {
    return;
  }

  const { taskName, taskPrority, taskStatus } = foundTask;

  return (
    <Modal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ lg: { width: "250px" } }}
    >
      <Box sx={style}>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmitEdit(data);
            reset();
            onClose();
            // add toastid for test cypress
            toast.success("Update successfully!!", { toastId: "updateTask" });
          })}
        >
          <p>Task Name</p>
          <TextField
            id="input-field__Modal"
            type="text"
            {...register("taskName")}
            defaultValue={taskName}
          />
          <p>Task Status</p>
          <Select
            {...register("taskStatus")}
            defaultValue={taskStatus}
            sx={{ width: "210px" }}
          >
            <MenuItem value="Ready">Ready</MenuItem>
            <MenuItem value="In Process">In Process</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
          <p>Task Prority</p>
          <Select
            {...register("taskPrority")}
            defaultValue={taskPrority}
            sx={{ width: "210px" }}
            id="task-prority__Modal"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>

          <br />
          <ButtonGroup sx={{ mt: 3 }}>
            <Button
              type="submit"
              id="updateTask"
              variant="contained"
              sx={{ mr: 2 }}
            >
              {" "}
              Update
            </Button>
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
}
export default memo(EditTasktModal);
