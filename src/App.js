// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeIcons } from '@fluentui/font-icons-mdl2'; // Ensure icons are initialized

// Import our custom ThemeProvider
import { ThemeProvider } from './contexts/ThemeContext'; // <--- NEW IMPORT: Import ThemeProvider

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import TaskDetails from './pages/TaskDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Initialize Fluent UI icons once at the very top level of your app
initializeIcons();

const App = () => {
  return (
    // Wrap the entire application with our ThemeProvider
    <ThemeProvider> {/* <--- NEW: ThemeProvider wrapping Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Nested routes for the dashboard */}
            <Route index element={<Navigate to="tasks" replace />} /> {/* Redirects /dashboard to /dashboard/tasks */}
            <Route path="tasks" element={<TaskList />} />
            <Route path="tasks/:id" element={<TaskDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* Fallback for any unmatched routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider> // <--- NEW: Closing ThemeProvider
  );
};

export default App;