import React, { useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../common/InputField";
import { Box, TextareaAutosize } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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

  //   submit form
  //   const onSubmit = ({ ...data }) => {
  //     // const newTaskList = taskList;
  //     // newTaskList.push(data);
  //     // console.log(taskList);

  //   };

  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
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
        <InputLabel id="demo-simple-select-label">Priority Level</InputLabel>
        <Select {...register("taskPrority")} defaultValue={"Medium"}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

        <br />
        <button type="submit"> Add</button>
      </form>
    </Box>
  );
}
