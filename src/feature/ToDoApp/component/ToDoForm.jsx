import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import InputField from "../../../common/InputField";

const schema = yup
  .object({
    taskName: yup.string().required("This field not allowed to be empty"),
    taskPrority: yup.string().required("This field not allowed to be empty"),
  })
  .required();

//   Function ToDo
export default function ToDoForm({ onSubmit }) {
  const [status, setStatus] = useState("Normal");
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
      taskPrority: "Normal",
    },
  });
  useEffect(() => {}, [status]);
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
          toast.success("Add task successfully!", { toastId: "successMsg" });
          setStatus("Normal");
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
          Prority Level
        </Typography>
        <Select
          {...register("taskPrority")}
          value={status}
          sx={{ width: "300px" }}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Normal">Normal</MenuItem>
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
