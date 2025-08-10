// src/pages/TaskDetails.js

import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Text, PrimaryButton, DefaultButton } from '@fluentui/react';

// Re-use the mock data from TaskList for demonstration
// In a real app, this would come from an API call
const allTasks = [
  { id: '1', title: 'Plan project roadmap', description: 'Outline key milestones and deliverables for the Q3 project.', status: 'In Progress', dueDate: new Date(2025, 6, 20) },
  { id: '2', title: 'Develop login page', description: 'Implement responsive login UI with validation.', status: 'Done', dueDate: new Date(2025, 6, 10) },
  { id: '3', title: 'Research Fluent UI components', description: 'Explore DetailsList, Dialog, and other relevant components.', status: 'Done', dueDate: new Date(2025, 6, 12) },
  { id: '4', title: 'Prepare POC presentation', description: 'Create slides and talking points for the dashboard POC.', status: 'To Do', dueDate: new Date(2025, 7, 5) },
  { id: '5', title: 'Review team code', description: 'Provide feedback on recent pull requests.', status: 'To Do', dueDate: new Date(2025, 6, 25) },
];

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate();

  // Find the task based on the ID from the URL
  const task = useMemo(() => {
    return allTasks.find(t => t.id === id);
  }, [id]);

  if (!task) {
    return (
      <Stack tokens={{ childrenGap: 20 }} horizontalAlign="center" verticalAlign="center" style={{ height: '80%' }}>
        <Text variant="xxLarge">Task Not Found</Text>
        <Text variant="large">The task with ID "{id}" could not be found.</Text>
        <PrimaryButton text="Back to Task List" onClick={() => navigate('/dashboard/tasks')} />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Text variant="xxLarge">Task Details</Text>
        <DefaultButton text="Back to Task List" onClick={() => navigate('/dashboard/tasks')} />
      </Stack>

      <Stack tokens={{ childrenGap: 10 }}>
        <Text variant="large" style={{ fontWeight: 'bold' }}>Title:</Text>
        <Text>{task.title}</Text>

        <Text variant="large" style={{ fontWeight: 'bold' }}>Description:</Text>
        <Text>{task.description}</Text>

        <Text variant="large" style={{ fontWeight: 'bold' }}>Status:</Text>
        <Text>{task.status}</Text>

        <Text variant="large" style={{ fontWeight: 'bold' }}>Due Date:</Text>
        <Text>{task.dueDate ? task.dueDate.toLocaleDateString() : 'N/A'}</Text>
      </Stack>

      {/* You can add more details or actions here later */}
    </Stack>
  );
};

export default TaskDetails;