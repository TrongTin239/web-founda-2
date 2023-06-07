import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
// Title
const title = "TASK LIST";

function TaskList({ taskList, findTask, onOpen, onDelete }) {
  // if (!taskList) return;
  // Render list task
  const taskRender = [...taskList];
  const handldeDelete = (task) => {
    const index = taskList.findIndex((e) => e === task);
    console.log(index);

    if (index >= 0) {
      taskRender.splice(index, 1);
      console.log(taskRender);
    }

    // console.log("delete");
  };
  const renderTaskList = () => {
    return taskRender?.map((task, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="left">{task.taskName}</TableCell>
          <TableCell align="left">{task.taskStatus}</TableCell>
          <TableCell align="left">{task.taskPrority}</TableCell>
          <TableCell align="left">
            <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  handldeDelete(task);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  onOpen();
                  findTask(task.taskName);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <Typography component={"h2"} textAlign={"center"}>
        {" "}
        {title}{" "}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Task Name</TableCell>
            <TableCell>Task Status</TableCell>
            <TableCell>Task Prority</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          <TableBody>{renderTaskList()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default TaskList;
