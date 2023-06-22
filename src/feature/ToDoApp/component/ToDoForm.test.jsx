import { render, screen, fireEvent } from "@testing-library/react";
import ToDoForm from "./ToDoForm";
import "@testing-library/jest-dom";
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);
test("test Render Form", () => {
  render(<ToDoForm />);
  const taskName = screen.getByText("Task Name");
  const prorityLevel = screen.getByText("Prority Level");
  const placeHolder = screen.getByPlaceholderText("Type here");

  expect(taskName).toBeInTheDocument();
  expect(placeHolder).toBeInTheDocument();
  expect(prorityLevel).toBeInTheDocument();
});
test("Click submit with blank task name", async () => {
  render(<ToDoForm />);
  const button = screen.getByRole("button", { name: "Add" });
  fireEvent.click(button);
  await screen.findByText("This field not allowed to be empty");
});
