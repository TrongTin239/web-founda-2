import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import TaskList from "../component/TaskList";
import ToDoForm from "../component/ToDoForm";
import EditTasktModal from "../component/EditTasktModal";

const title = "TASK MANAGER";

export default function ToDoApp() {
  // list task to do
  const listTask = [
    {
      taskName: "Learn Front-end",
      taskPrority: "Normal",
      taskStatus: "In Process",
    },
    {
      taskName: "Learn Back-end",
      taskPrority: "High",
      taskStatus: "Ready",
    },
  ];

  // hanlde Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // state for Tasklist to render
  const [taskList, setTaskList] = useState([...listTask]);
  // state for find task to edit or delete
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
  // handle delete task
  const handldeDelete = (task) => {
    const index = taskList.findIndex((e) => e === task);

    if (index >= 0) {
      const taskClone = [...taskList];
      taskClone.splice(index, 1);
      setTaskList(taskClone);
    }
  };
  // handle filter
  let [filterTags, setFilterTags] = useState([]);

  const filteredDATA = taskList.filter((task) =>
    filterTags?.length > 0
      ? task.taskStatus.includes(filterTags) ||
        task.taskPrority.includes(filterTags)
      : taskList
  );

  // console.log(filteredDATA);
  const handleFilter = (event) => {
    let newFilter = [...filterTags];
    newFilter = event.target?.value;

    setFilterTags(newFilter);
  };
  // handle clear filter

  const handleClearFilter = () => {
    setFilterTags([]);
  };

  useEffect(() => {}, [taskList]);
  return (
    <Container>
      <Box textAlign={"center"} mt={6}>
        {title}
      </Box>
      <ToDoForm onSubmit={onSubmit} />
      <TaskList
        taskList={filteredDATA}
        open={open}
        handleClose={handleClose}
        onOpen={handleOpen}
        findTask={findTask}
        onDelete={handldeDelete}
        onFilter={handleFilter}
        onHandeClear={handleClearFilter}
        filterTags={filterTags}
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
