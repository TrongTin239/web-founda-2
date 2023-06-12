import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Title
const title = "TASK LIST";

function TaskList({
  taskList,
  findTask,
  onOpen,
  onDelete,
  onFilter,
  onHandeClear,
  filterTags,
}) {
  // if (!taskList) return;
  const [search, setSearch] = useState("");

  const [open, setOpen] = React.useState(false);
  const [taskDelete, setTaskDelete] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskPrority, setTaskPrority] = useState("");
  // handle open ....
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, []);
  // Render list task
  const renderTaskList = () => {
    return taskList
      ?.filter((task) => {
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
            <TableCell align="left">
              <Typography
                sx={{
                  ...(task.taskStatus === "Ready" && {
                    padding: "8px 20px",

                    bgcolor: "#28a745",
                    display: "inline-block",
                    color: "white",
                    borderRadius: "20px",
                  }),
                  ...(task.taskStatus === "In Process" && {
                    padding: "8px 20px",

                    bgcolor: "#ffff00",
                    display: "inline-block",
                    color: "black",
                    borderRadius: "20px",
                  }),
                  ...(task.taskStatus === "Done" && {
                    padding: "8px 20px",

                    bgcolor: "#e4e5e7",
                    display: "inline-block",
                    color: "black",
                    borderRadius: "20px",
                  }),
                }}
              >
                {task?.taskStatus}
              </Typography>
            </TableCell>

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
        {title}
      </Typography>
      {/* search form */}
      <form
        onChange={(e) => {
          setSearch(e.target.value.toString().toLowerCase());
        }}
      >
        <TextField
          fullWidth
          type="text"
          autoComplete={"off"}
          placeholder="Search task by name, status or prority"
        />
      </form>
      {/* Filter form */}
      <Stack
        flexDirection={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        mt={3}
      >
        <Typography mr={2}>Filter by:</Typography>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <FormControl sx={{ mr: 3, width: "130px" }}>
            <FormLabel htmlFor="task-status">Task Status</FormLabel>
            <Select
              id="task-status"
              value={taskStatus}
              onChange={(e) => {
                onFilter(e);
                setTaskStatus(e.target.value);
              }}
            >
              <MenuItem value="Ready">Ready</MenuItem>
              <MenuItem value="In Process">In Process</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "130px" }}>
            <FormLabel htmlFor="task-prority">Task Prority</FormLabel>
            <Select
              id="task-prority"
              value={taskPrority}
              onChange={(e) => {
                // setCheckFIlter(true);
                onFilter(e);
                setTaskPrority(e.target.value);
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <Typography
            ml={2}
            onClick={() => {
              onHandeClear();
              setTaskPrority("");
              setTaskStatus("");
            }}
            sx={{ cursor: "pointer" }}
          >
            {" "}
            Clear filter
          </Typography>
        </Stack>
      </Stack>
      {/* Table task render */}
      <TableContainer sx={{ my: 6 }}>
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
