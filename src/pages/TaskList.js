// src/pages/TaskList.js

import React, { useState, useCallback, useMemo } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
} from '@fluentui/react/lib/DetailsList';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { Link } from '@fluentui/react/lib/Link';
import { Stack, Text } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { Dropdown } from '@fluentui/react/lib/Dropdown'; // Removed IDropdownOption import

// Mock Data
const initialTasks = [
  { id: '1', title: 'Plan project roadmap', description: 'Outline key milestones and deliverables for the Q3 project.', status: 'In Progress', dueDate: new Date(2025, 6, 20) },
  { id: '2', title: 'Develop login page', description: 'Implement responsive login UI with validation.', status: 'Done', dueDate: new Date(2025, 6, 10) },
  { id: '3', title: 'Research Fluent UI components', description: 'Explore DetailsList, Dialog, and other relevant components.', status: 'Done', dueDate: new Date(2025, 6, 12) },
  { id: '4', title: 'Prepare POC presentation', description: 'Create slides and talking points for the dashboard POC.', status: 'To Do', dueDate: new Date(2025, 7, 5) },
  { id: '5', title: 'Review team code', description: 'Provide feedback on recent pull requests.', status: 'To Do', dueDate: new Date(2025, 6, 25) },
];

// Define your status options here
const statusOptions = [ // <--- MODIFIED: Removed ': IDropdownOption[]'
  { key: 'To Do', text: 'To Do' },
  { key: 'In Progress', text: 'In Progress' },
  { key: 'Done', text: 'Done' },
];


const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [isDialogHidden, setIsDialogHidden] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isConfirmDeleteDialogHidden, setIsConfirmDeleteDialogHidden] = useState(true);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const navigate = useNavigate();

  // Dialog handling functions
  const onDialogDismiss = useCallback(() => {
    setIsDialogHidden(true);
    setTaskToEdit(null);
  }, []);

  const onConfirmDeleteDialogDismiss = useCallback(() => {
    setIsConfirmDeleteDialogHidden(true);
    setTaskToDeleteId(null);
  }, []);

  // CRUD Operations
  const handleAddTask = useCallback((newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsDialogHidden(true);
  }, []);

  const handleUpdateTask = useCallback((updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setIsDialogHidden(true);
    setTaskToEdit(null);
  }, []);

  const handleDeleteTask = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDeleteId));
    setIsConfirmDeleteDialogHidden(true);
    setTaskToDeleteId(null);
  }, [taskToDeleteId]);

  const confirmDeleteTask = useCallback((id) => {
    setTaskToDeleteId(id);
    setIsConfirmDeleteDialogHidden(false);
  }, []);

  const handleEditTask = useCallback((task) => {
    setTaskToEdit(task);
    setIsDialogHidden(false);
  }, []);

  const openAddDialog = useCallback(() => {
    setTaskToEdit(null);
    setIsDialogHidden(false);
  }, []);

  // Function to handle status change directly from the dropdown
  const handleStatusChange = useCallback((taskId, newStatus) => { // <--- MODIFIED: Removed ': string' type annotations
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }, []);

  // Filtered tasks based on search input
  const filteredTasks = useMemo(() => {
    if (!searchText) {
      return tasks;
    }
    const lowercasedSearchText = searchText.toLowerCase();
    return tasks.filter(task =>
      task.title.toLowerCase().includes(lowercasedSearchText) ||
      task.description.toLowerCase().includes(lowercasedSearchText) ||
      task.status.toLowerCase().includes(lowercasedSearchText)
    );
  }, [tasks, searchText]);

  // DetailsList Columns
  const columns = useMemo(() => ([
    {
      key: 'title',
      name: 'Title',
      fieldName: 'title',
      minWidth: 150,
      maxWidth: 250,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item) => (
        <Link onClick={() => navigate(`/dashboard/tasks/${item.id}`)} style={{ cursor: 'pointer' }}>
          {item.title}
        </Link>
      ),
    },
    {
      key: 'description',
      name: 'Description',
      fieldName: 'description',
      minWidth: 200,
      maxWidth: 350,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item) => (
        <span style={{ whiteSpace: 'normal' }}>{item.description}</span>
      ),
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
      data: 'string',
      isPadded: true,
      onRender: (item) => (
        <Dropdown
          selectedKey={item.status}
          options={statusOptions}
          onChange={(event, option) => option && handleStatusChange(item.id, option.key.toString())}
          styles={{ root: { width: 120 } }}
        />
      ),
    },
    {
      key: 'dueDate',
      name: 'Due Date',
      fieldName: 'dueDate',
      minWidth: 100,
      maxWidth: 120,
      isResizable: true,
      data: 'date',
      onRender: (item) => (item.dueDate ? item.dueDate.toLocaleDateString() : 'N/A'),
      isPadded: true,
    },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 80,
      maxWidth: 80,
      isResizable: false,
      onRender: (item) => (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <IconButton
            iconProps={{ iconName: 'Edit' }}
            title="Edit Task"
            ariaLabel="Edit Task"
            onClick={() => handleEditTask(item)}
          />
          <IconButton
            iconProps={{ iconName: 'Delete' }}
            title="Delete Task"
            ariaLabel="Delete Task"
            onClick={() => confirmDeleteTask(item.id)}
          />
        </Stack>
      ),
      isPadded: true,
    },
  ]), [navigate, handleEditTask, confirmDeleteTask, handleStatusChange]);

  // Command Bar Items
  const commandBarItems = useMemo(() => ([
    {
      key: 'newItem',
      text: 'New Task',
      iconProps: { iconName: 'Add' },
      onClick: openAddDialog,
    },
  ]), [openAddDialog]);

  const commandBarFarItems = useMemo(() => ([
    {
      key: 'search',
      onRender: () => (
        <TextField
          placeholder="Search tasks..."
          iconProps={{ iconName: 'Search' }}
          value={searchText}
          onChange={(e, newValue) => setSearchText(newValue || '')}
          styles={{ root: { width: 200, marginRight: 10 } }}
        />
      ),
    },
  ]), [searchText]);

  const dialogContentProps = useMemo(() => ({
    type: DialogType.normal,
    title: taskToEdit ? 'Edit Task' : 'Add New Task',
    closeButtonAriaLabel: 'Close',
    subText: 'Fill in the details for your task.',
  }), [taskToEdit]);

  const dialogStyles = useMemo(() => ({
    main: { maxWidth: 450 },
  }), []);

  const detailsListStyles = useMemo(() => ({
    root: {
      overflowX: 'auto',
    },
    contentWrapper: {
      flexGrow: 1,
      minHeight: '200px',
    }
  }), []);

  return (
    <Stack tokens={{ childrenGap: 20 }} style={{ height: '100%' }}>
      <Text variant="xxLarge">Task List</Text>

      <CommandBar items={commandBarItems} farItems={commandBarFarItems} />

      {filteredTasks.length === 0 && (
        <Text variant="large" style={{ textAlign: 'center', marginTop: 50 }}>
          {searchText ? 'No tasks found matching your search.' : 'No tasks available. Click "New Task" to add one.'}
        </Text>
      )}

      {filteredTasks.length > 0 && (
        <DetailsList
          items={filteredTasks}
          columns={columns}
          setKey="items"
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          isHeaderVisible={true}
          styles={detailsListStyles}
        />
      )}

      {/* Add/Edit Task Dialog */}
      <Dialog
        hidden={isDialogHidden}
        onDismiss={onDialogDismiss}
        dialogContentProps={dialogContentProps}
        modalProps={{
          isBlocking: false,
          styles: dialogStyles,
        }}
      >
        <TaskForm
          task={taskToEdit}
          onSubmit={taskToEdit ? handleUpdateTask : handleAddTask}
          onCancel={onDialogDismiss}
        />
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        hidden={isConfirmDeleteDialogHidden}
        onDismiss={onConfirmDeleteDialogDismiss}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Confirm Deletion',
          subText: 'Are you sure you want to delete this task? This action cannot be undone.',
        }}
        modalProps={{
          isBlocking: true,
          styles: dialogStyles,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDeleteTask} text="Delete" />
          <DefaultButton onClick={onConfirmDeleteDialogDismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default TaskList;