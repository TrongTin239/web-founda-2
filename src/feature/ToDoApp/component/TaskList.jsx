import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

// Title
const title = "TASK LIST";

function TaskList({ taskList, findTask, onOpen, onDelete }) {
  // if (!taskList) return;
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [taskDelete, setTaskDelete] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Render list task
  const renderTaskList = () => {
    return taskList
      .filter((task) => {
        return search.toLowerCase() === ""
          ? task
          : task.taskName.toLowerCase().includes(search) ||
              task.taskStatus.toLowerCase().includes(search) ||
              task.taskPrority.toLowerCase().includes(search);
      })
      ?.map((task, index) => {
        return (
          <TableRow key={index}>
            <TableCell align="left">{task?.taskName}</TableCell>
            <TableCell align="left">{task?.taskStatus}</TableCell>

            <TableCell align="left">{task?.taskPrority}</TableCell>
            <TableCell align="left">
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => {
                    setTaskDelete(task);
                    handleClickOpen();
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
      <Typography my={2} component={"h2"} textAlign={"center"}>
        {" "}
        {title}{" "}
      </Typography>
      <form
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      >
        <TextField
          fullWidth
          type="text"
          autoComplete={"off"}
          placeholder="Search task by name, status or prority"
        />
      </form>
      <TableContainer sx={{ mt: 5 }}>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure about delete this task?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleClose();
              onDelete(taskDelete);
              toast.success("Delete successfully!");
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default TaskList;
