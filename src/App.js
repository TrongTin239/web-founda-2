import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToDoApp from "./feature/ToDoApp/pages/ToDoApp";
import { useForm } from "react-hook-form";

function App() {
  return (
    <>
      <ToDoApp />

      <ToastContainer />
    </>
  );
}

export default App;
