import axios from "axios";

import { Todo } from "../../types";
import { API_URL } from "../../constants";

export interface addTodoDto {
  isCompleted: boolean;
  todo: string;
  dueDate: Date;
}

export interface updateTodoDto {
  isCompleted?: boolean;
  todo?: string;
  dueDate?: Date;
}

export const addTodo = async (data: addTodoDto): Promise<{ data: Todo }> =>
  await axios.post(API_URL, data);

export const requestTodoList = async (): Promise<{ data: Todo[] }> =>
  await axios.get(API_URL);

export const updateTodo = async (id: number, data: updateTodoDto) =>
  await axios.patch(`${API_URL}/${id}`, data);

export const deleteTodo = async (id: number) =>
  await axios.delete(`${API_URL}/${id}`);
