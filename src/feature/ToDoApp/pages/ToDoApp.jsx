import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import TaskList from "../component/TaskList";
import ToDoForm from "../component/ToDoForm";
import EditTasktModal from "../component/EditTasktModal";

const title = "TASK MANAGER";

export default function ToDoApp() {
  const listTask = [
    {
      taskName: "Learn Front-end",
      taskPrority: "Medium",
      taskStatus: "In Process",
    },
  ];
  // hanlde Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [taskList, setTaskList] = useState(listTask);
  const [foundTask, setFoundTask] = useState();
  // submit data  react-hook-form to add task list
  const onSubmit = ({ ...data }) => {
    setTaskList([...taskList, data]);
  };
  // findtask to edit
  const findTask = (name) => {
    const find = taskList.find((i) => i.taskName === name);
    setFoundTask(find);
  };
  // submit task need edit
  const handleSubmitEdit = (data) => {
    const index = taskList.findIndex(
      (task) => task.taskName === foundTask.taskName
    );
    taskList[index] = data;
  };

  const handldeDelete = (task) => {
    const index = taskList.findIndex((e) => e === task);
    console.log(index);

    if (index >= 0) {
      taskList.splice(index, 1);
      console.log(taskList);
    }

    // console.log("delete");
  };

  return (
    <Container>
      <Box textAlign={"center"}>{title}</Box>
      <ToDoForm onSubmit={onSubmit} />
      <TaskList
        taskList={taskList}
        open={open}
        handleClose={handleClose}
        onOpen={handleOpen}
        findTask={findTask}
        onDelete={handldeDelete}
      />
      <EditTasktModal
        foundTask={foundTask}
        onOpen={open}
        onClose={handleClose}
        onSubmitEdit={handleSubmitEdit}
      />
    </Container>
  );
}
