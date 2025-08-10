// src/components/Sidebar.js

import React from 'react';
import { Nav, INavLink, INavStyles, Stack } from '@fluentui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const navStyles = { /* ... */ };

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    {
      name: 'Dashboard',
      url: '/dashboard', // Base URL for the group
      icon: 'Home',
      key: 'dashboard',
      isExpanded: true,
      links: [
        {
          name: 'Task List',
          url: '/dashboard/tasks',
          key: 'tasks',
          icon: 'TaskManager',
          isCurrent: location.pathname === '/dashboard' || location.pathname === '/dashboard/tasks',
        },
        {
          name: 'Reports',
          url: '/dashboard/reports',
          key: 'reports',
          icon: 'Chart',
          isCurrent: location.pathname === '/dashboard/reports',
        },
        {
          name: 'Settings',
          url: '/dashboard/settings', // <--- THIS URL IS CRUCIAL
          key: 'settings',
          icon: 'Settings',
          isCurrent: location.pathname === '/dashboard/settings',
        },
      ],
    },
  ];

  const onLinkClick = (ev, item) => {
    if (item && item.url) {
      ev.preventDefault();
      navigate(item.url); // Uses the URL from the navLinks
    }
  };

  return (
    <Stack styles={navStyles}>
      <Nav
        groups={navLinks}
        onLinkClick={onLinkClick}
        selectedKey={
          navLinks[0].links.find(link => link.isCurrent)?.key || 'tasks'
        }
        ariaLabel="Main navigation"
      />
    </Stack>
  );
};

export default Sidebar;