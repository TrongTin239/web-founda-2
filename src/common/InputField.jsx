import { TextField, Typography } from "@mui/material";
import React from "react";
export default function InputField({
  errors,
  register,
  label,
  placeholder,
  value,
  disable,
}) {
  return (
    <div>
      <Typography textAlign={"left"} my={2}>
        {" "}
        {label}{" "}
      </Typography>
      <TextField
        type="text"
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        value={value}
        disabled={disable}
      />
      <Typography className="errorMsg" sx={{ color: "red" }}>
        {errors.taskName?.message}
      </Typography>
    </div>
  );
}
