import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../common/InputField";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from "react-toastify";

const schema = yup
  .object({
    taskName: yup.string().required("This field not allowed to be empty"),
    taskPrority: yup.string().required("This field not allowed to be empty"),
  })
  .required();

//   Function ToDo
export default function ToDoForm({ onSubmit }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      taskStatus: "Ready",
      taskPrority: "Medium",
    },
  });

  return (
    <Box
      sx={{
        ".MuiTextField-root": {
          width: "300px",
        },
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          toast.success("Add task successfully!");
          reset();
        })}
      >
        <InputField
          errors={errors}
          control={control}
          register={{ ...register("taskName") }}
          label="Task Name"
          placeholder="Type here"
          name="taskName"
        />
        <Typography id="demo-simple-select-label" textAlign={"left"} my={2}>
          Priority Level
        </Typography>
        <Select
          {...register("taskPrority")}
          defaultValue={"Medium"}
          sx={{ width: "300px" }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

        <br />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            width: "100px",
            mt: 3,
          }}
        >
          {" "}
          Add{" "}
        </Button>
      </form>
    </Box>
  );
}
