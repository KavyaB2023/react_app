import React, { useState, useEffect } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';

// Options for task status dropdown
const statusOptions = [
  { key: 'To Do', text: 'To Do' },
  { key: 'In Progress', text: 'In Progress' },
  { key: 'Done', text: 'Done' },
];

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: task ? task.id : Date.now(), // Use existing ID or generate new one
    title: task ? task.title : '',
    description: task ? task.description : '',
    status: task ? task.status : 'To Do',
    dueDate: task ? task.dueDate : null,
  });

  const [errors, setErrors] = useState({});

  // Populate form data when 'task' prop changes (for editing)
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
      });
    }
  }, [task]);

  const handleChange = (event, newValue) => {
    const { name } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: newValue,
    }));
    // Clear error for the field being edited
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleDropdownChange = (event, option) => {
    setFormData(prevData => ({
      ...prevData,
      status: option ? option.key : '',
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      status: '',
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      dueDate: date,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      dueDate: '',
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.status) newErrors.status = 'Status is required.';
    if (!formData.dueDate) newErrors.dueDate = 'Due Date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const stackTokens = { childrenGap: 15 };
  const buttonStackTokens = { childrenGap: 10 };

  return (
    <Stack tokens={stackTokens}>
      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        errorMessage={errors.title}
        required
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={3}
        value={formData.description}
        onChange={handleChange}
        errorMessage={errors.description}
        required
      />
      <Dropdown
        label="Status"
        options={statusOptions}
        selectedKey={formData.status}
        onChange={handleDropdownChange}
        errorMessage={errors.status}
        required
      />
      <DatePicker
        label="Due Date"
        value={formData.dueDate}
        onSelectDate={handleDateChange}
        placeholder="Select a date..."
        errorMessage={errors.dueDate}
        isRequired
      />
      <Stack horizontal tokens={buttonStackTokens} horizontalAlign="end">
        <DefaultButton text="Cancel" onClick={onCancel} />
        <PrimaryButton text={task ? 'Update Task' : 'Add Task'} onClick={handleSubmit} />
      </Stack>
    </Stack>
  );
};

export default TaskForm;