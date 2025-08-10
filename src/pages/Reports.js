// src/pages/Reports.js

import React, { useMemo } from 'react';
import { Stack, Text } from '@fluentui/react';
import { Doughnut } from 'react-chartjs-2'; // <--- NEW: Import Doughnut chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; // <--- NEW: Import Chart.js essentials

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Mock Data (For demonstration purposes in Reports.js)
// In a real app, you'd ideally get this from a shared state or API
const mockTasks = [
  { id: '1', title: 'Plan project roadmap', description: 'Outline key milestones and deliverables for the Q3 project.', status: 'In Progress', dueDate: new Date(2025, 6, 20) },
  { id: '2', title: 'Develop login page', description: 'Implement responsive login UI with validation.', status: 'Done', dueDate: new Date(2025, 6, 10) },
  { id: '3', title: 'Research Fluent UI components', description: 'Explore DetailsList, Dialog, and other relevant components.', status: 'Done', dueDate: new Date(2025, 6, 12) },
  { id: '4', title: 'Prepare POC presentation', description: 'Create slides and talking points for the dashboard POC.', status: 'To Do', dueDate: new Date(2025, 7, 5) },
  { id: '5', title: 'Review team code', description: 'Provide feedback on recent pull requests.', status: 'To Do', dueDate: new Date(2025, 6, 25) },
  { id: '6', title: 'Refactor authentication module', description: 'Improve security and clean up login logic.', status: 'In Progress', dueDate: new Date(2025, 7, 10) },
  { id: '7', title: 'Write unit tests for UI components', description: 'Cover critical UI components with unit tests.', status: 'To Do', dueDate: new Date(2025, 7, 15) },
  { id: '8', title: 'Deploy to staging environment', description: 'Prepare release candidates for staging deployment.', status: 'Done', dueDate: new Date(2025, 7, 1) },
];


const Reports = () => {
  // Process task data for the chart
  const chartData = useMemo(() => {
    const statusCounts = mockTasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    // Define colors for each status
    const backgroundColors = labels.map(status => {
      switch (status) {
        case 'To Do':
          return '#FFC107'; // Amber/Yellow
        case 'In Progress':
          return '#2196F3'; // Blue
        case 'Done':
          return '#4CAF50'; // Green
        default:
          return '#9E9E9E'; // Grey for unknown
      }
    });

    return {
      labels: labels,
      datasets: [
        {
          label: '# of Tasks',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.2', '1')), // Solid border
          borderWidth: 1,
        },
      ],
    };
  }, []); // Dependencies: mockTasks (if it were dynamic)

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize within its container
    plugins: {
      legend: {
        position: 'right', // Position legend to the right
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' tasks';
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <Stack tokens={{ childrenGap: 20 }} style={{ height: '100%' }}>
      <Text variant="xxLarge">Task Status Reports</Text>

      <Stack horizontal wrap tokens={{ childrenGap: 30 }} horizontalAlign="center" verticalAlign="center">
        <Stack style={{ width: '100%', maxWidth: '400px', height: '300px' }}> {/* Chart container */}
          {mockTasks.length > 0 ? (
            <Doughnut data={chartData} options={chartOptions} />
          ) : (
            <Text variant="large" style={{ textAlign: 'center' }}>No tasks to display in the report yet.</Text>
          )}
        </Stack>
      </Stack>

      <Text variant="medium">
        This report visualizes the current distribution of tasks across different statuses.
      </Text>
    </Stack>
  );
};

export default Reports;