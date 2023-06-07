import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm, Controller, useController } from "react-hook-form";
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
      <Typography> {label} </Typography>
      <TextField
        type="text"
        placeholder={placeholder}
        {...register}
        autoComplete="off"
        value={value}
        disabled={disable}
      />
      <Typography sx={{ color: "red" }}>{errors.taskName?.message}</Typography>
    </div>
  );
}
