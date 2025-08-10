import React from 'react';
import { Stack, Text, CommandBarButton, IButtonStyles, Persona, PersonaSize } from '@fluentui/react';
//import { useTheme } from '@fluentui/react/lib/Utilities';
import { useTheme } from '@fluentui/react';

const headerStyles = {
  root: {
    padding: '0 20px',
    height: 50,
    backgroundColor: '#0078d4', // Fluent UI blue
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0, // Prevents header from shrinking
  },
};

const userMenuButtonStyles = {
  root: {
    color: 'white',
  },
  rootHovered: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  iconHovered: {
    color: 'white',
  },
};

const Header = () => {
  const theme = useTheme(); // For accessing theme colors if needed

  // Mock user data
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    initials: 'JD',
  };

  const onUserMenuClick = () => {
    alert('User menu clicked! (Placeholder)');
    // In a real app, you'd show a Popover or ContextualMenu here
  };

  return (
    <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={headerStyles}>
      <Text variant="xLarge" style={{ color: 'white', fontWeight: 'bold' }}>
        Task Manager
      </Text>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
        {/* User Persona/Menu Placeholder */}
        <CommandBarButton
          text={currentUser.name}
          iconProps={{ iconName: 'ChevronDown' }}
          styles={userMenuButtonStyles}
          onClick={onUserMenuClick}
        >
          <Persona
            text={currentUser.name}
            secondaryText={currentUser.email}
            initialsColor={theme.palette.themePrimary}
            size={PersonaSize.size24} // Smaller size for header
            hidePersonaDetails={true} // Hide text by default, show on hover/click if needed
          />
        </CommandBarButton>
      </Stack>
    </Stack>
  );
};

export default Header;