import { FC, useState, useEffect, useCallback } from "react";
import { Button } from "@material-ui/core";

import {
  requestTodoList,
  addTodo as httpAddTodo,
  updateTodo as httpUpdateTodo,
  deleteTodo as httpDeleteTodo,
} from "../../http/todo";
import type { addTodoDto, updateTodoDto } from "../../http/todo";
import { Todo } from "../../types";

import "./style.css";
import TodoElement from "../../components/TodoElement";
import TodoModal from "../../components/Modal";

interface initialValuesState {
  id: number | undefined;
  dueDate: Date;
  todo: string;
  isCompleted: boolean;
}

const ToDoList: FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState<initialValuesState>({
    id: undefined,
    dueDate: new Date(),
    todo: "",
    isCompleted: false,
  });
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await requestTodoList();
        if (response) {
          setTodoList(response.data);
        }
      } catch (error) {
        console.error("Error fetching todo list", error);
      }
    };

    fetchTodos();
  }, []);

  const onCloseModal = () => {
    setModalVisible(false);
    setInitialValues({
      id: undefined,
      dueDate: new Date(),
      todo: "",
      isCompleted: false,
    });
  };
  const onOpenModal = useCallback((values: initialValuesState | undefined) => {
    setModalVisible(true);
    if(values) {
      setInitialValues(values)
    }
  }, []);

  const addTodo = async (formData: addTodoDto) => {
    try {
      const response = await httpAddTodo(formData);
      if (response) {
        setTodoList((prevValue) => [...prevValue, response.data]);
      }
      onCloseModal();
    } catch (error) {
      console.error("Error fetching todo list", error);
    }
  };

  const updateTodo = async (formData: updateTodoDto) => {
    try {
      if (typeof initialValues.id === "number") {
        const response = await httpUpdateTodo(initialValues.id, formData);
        if (response) {
          const updatedList = todoList.map((item) => {
            if (item.id === initialValues.id) {
              return { ...item, ...response.data };
            }
            return item;
          });
          setTodoList(updatedList);
        }
        onCloseModal();
      }
    } catch (error) {
      console.error("Error fetching todo list", error);
    }
  };
  const onDelete = async (id: number) => {
    try {
      await httpDeleteTodo(id);
      const newList = todoList.filter((item) => item.id !== id);
      setTodoList(newList);
    } catch (error) {
      console.error("Error fetching todo list", error);
    }
  };

  return (
    <div className="page-todo-container">
      <h1 className="page-todo-title">To do List</h1>
      <div className="todo-list-container">
        <div className="todo-list-add-todo-container">
          <Button
            onClick={() => onOpenModal(undefined)}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </div>
        {todoList.length
          ? todoList.map((item) => (
              <TodoElement
                key={item.id}
                id={item.id}
                value={item.todo}
                dueDate={item.dueDate}
                isCompleted={item.isCompleted}
                onDelete={onDelete}
                onUpdate={onOpenModal}
              />
            ))
          : null}
      </div>
      <TodoModal
        isOpen={isModalVisible}
        onClose={onCloseModal}
        initialValues={initialValues}
        onSubmit={initialValues.id ? updateTodo : addTodo}
        title={initialValues.id ? "Update Todo" : "Create Todo"}
      />
    </div>
  );
};

export default ToDoList;
