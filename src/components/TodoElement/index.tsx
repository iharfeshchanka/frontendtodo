import { memo } from "react";
import { Button } from "@material-ui/core";

import formatDate from "../../formatters/date.ts";

import "./style.css";


interface ModalValues {
  id: number ;
  dueDate: Date;
  todo: string;
  isCompleted: boolean;
}

interface TodoElementProps {
  value: string;
  isCompleted: boolean;
  onDelete: (id: number) => void;
  onUpdate: (values: ModalValues) => void;
  id: number;
  dueDate: Date;
}


const TodoElement = ({
  value,
  isCompleted,
  id,
  onDelete,
  onUpdate,
  dueDate,
}: TodoElementProps) => {
  const onDeleteClick = () => onDelete(id);
  const onUpdateClick = () => onUpdate({todo: value, id, isCompleted, dueDate});

  return (
    <div className="todo-element-container">
      <div>
        <p
          className={
            isCompleted ? "todo-element-text-completed" : "todo-element-text"
          }
        >
          todo: {value}
        </p>
        <p>Due date: {formatDate(new Date(dueDate))}</p>
      </div>
      <div className="todo-element-button-container">
        <Button variant="outlined" color="primary" onClick={onDeleteClick}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={onUpdateClick}>
          Update
        </Button>
      </div>
    </div>
  );
};

const MemoTodoElement = memo(TodoElement);

export default MemoTodoElement;
