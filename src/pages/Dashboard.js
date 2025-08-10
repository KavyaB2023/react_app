import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stack } from '@fluentui/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const dashboardLayoutStyles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Ensure it takes full viewport height
    overflow: 'hidden', // Hide overflow from potential content
  },
};

const mainContentAreaStyles = {
  root: {
    display: 'flex',
    flexGrow: 1, // Allows this area to expand and fill available space
    overflow: 'hidden', // Important for scrollable content within
  },
};

const contentPaneStyles = {
  root: {
    flexGrow: 1, // Content pane takes remaining space
    padding: 20,
    overflowY: 'auto', // Enable scrolling for content if it overflows
    backgroundColor: '#f9f9f9', // Slightly different background for content area
  },
};

const DashboardLayout = () => {
  return (
    <Stack styles={dashboardLayoutStyles}>
      <Header />
      <Stack horizontal styles={mainContentAreaStyles}>
        <Sidebar />
        <Stack styles={contentPaneStyles}>
          {/* Outlet renders the nested route component (TaskList, Reports, Settings) */}
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;