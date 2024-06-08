import { useState, ChangeEvent, useEffect } from "react";
import {
  Modal,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

interface FormDataState {
  todo: string;
  isCompleted: boolean;
  dueDate: Date;
}

interface TodoModalProps {
  isOpen: boolean;
  onSubmit: (values: FormDataState) => void;
  title: string;
  onClose: () => void;
  initialValues: {
    todo: string;
    isCompleted: boolean;
    dueDate: Date;
  };
}

const TodoModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  initialValues,
}: TodoModalProps) => {
  const [formData, setFormData] = useState<FormDataState>({
    todo: initialValues.todo,
    isCompleted: initialValues.isCompleted,
    dueDate: initialValues.dueDate,
  });

  useEffect(() => {
    setFormData(initialValues)
  }, [initialValues]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleDateChange = (date: Date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      todo: "",
      isCompleted: false,
      dueDate: new Date(),
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="todo-modal-container">
        <h2>{title}</h2>
        <TextField
          label="Todo text"
          name="todo"
          value={formData.todo}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.isCompleted}
              onChange={handleCheckboxChange}
              name="isCompleted"
              color="primary"
            />
          }
          label="Is todo completed"
        />
        <div style={{ marginBottom: "20px" }}>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a due date"
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export default TodoModal;
