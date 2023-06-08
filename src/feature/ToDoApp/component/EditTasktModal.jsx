import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

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
// schema react-hook-form
const schema = yup
  .object({
    taskName: yup.string(),
    taskPrority: yup.string(),
    description: yup.string(),
  })
  .required();
// controller

//Edit Task function
function EditTasktModal({ onOpen, onClose, foundTask, onSubmitEdit }) {
  const [taskEdit, setTaskEdit] = useState({
    taskName: "",
    taskPrority: "",
    description: "",
  });

  // react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { touched },
  } = useForm({
    defaultValues: {
      // taskName: taskName,
      // taskPrority: taskPrority,
      // description: description,
    },
  });
  useEffect(() => {
    reset();
  }, [foundTask]);
  // check edit exist
  if (!foundTask) {
    return;
  }

  const { taskName, taskPrority, taskStatus } = foundTask;
  console.log(taskName);
  return (
    <Modal
      open={onOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ lg: { width: "250px" } }}
    >
      <Box sx={style}>
        {/* test form */}

        <form
          onSubmit={handleSubmit((data) => {
            onSubmitEdit(data);

            onClose();
            toast.success("Update successfully!!");
          })}
        >
          <p>Task Name</p>
          <TextField
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
          <p>Task Prorority</p>
          <Select
            {...register("taskPrority")}
            defaultValue={taskPrority}
            sx={{ width: "210px" }}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          {/* <input
            type="text"
            {...register("taskPrority")}
            defaultValue={taskPrority}
          /> */}

          <br />
          <ButtonGroup sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
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

// save here
{
  /* <Controller
            control={control}
            name="test"
            register={{ ...register("taskName") }}
            render={({
              field: { onChange, onBlur, value = foundTask, ref },
            }) => {
              // sending integer instead of string.
              return <TextField onChange={onChange} value={value?.taskName} />;
            }}
          />
          <Controller
            control={control}
            name="test"
            register={{ ...register("taskPrority") }}
            render={({
              field: { onChange, onBlur, value = foundTask, ref },
            }) => {
              // sending integer instead of string.
              return (
                <TextField onChange={onChange} value={value?.taskPrority} />
              );
            }}
          />
          <Controller
            control={control}
            name="test"
            register={{ ...register("description") }}
            render={({
              field: { onChange, onBlur, value = foundTask, ref },
            }) => {
              // sending integer instead of string.
              return (
                <TextareaAutosize
                  onChange={onChange}
                  value={value?.description}
                />
              );
            }}
          /> */
}
