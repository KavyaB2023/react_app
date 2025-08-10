// src/pages/Settings.js

import React, { useState, useCallback } from 'react';
import { Stack, Text, Toggle, TextField, PrimaryButton } from '@fluentui/react'; // <--- NEW: Import Toggle, TextField, PrimaryButton
import { useTheme } from '../contexts/ThemeContext'; // <--- NEW: Import our custom useTheme hook

const Settings = () => {
  // Use our custom hook to access the current theme state and the toggle function
  const { isDarkTheme, toggleTheme } = useTheme();

  // Mock state for user preferences
  const [userName, setUserName] = useState('John Doe');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mock function to handle saving preferences
  const handleSavePreferences = useCallback(() => {
    alert(`Preferences Saved!\nDisplay Name: ${userName}\nNotifications: ${notificationsEnabled ? 'Enabled' : 'Disabled'}`);
    // In a real application, you would send this data to a backend API or save it to persistent storage.
  }, [userName, notificationsEnabled]);


  return (
    <Stack tokens={{ childrenGap: 20 }} style={{ height: '100%' }}>
      <Text variant="xxLarge">Settings</Text>

      {/* Theme Toggle Section */}
      <Stack tokens={{ childrenGap: 10 }} styles={{ root: { maxWidth: 400 } }}>
        <Text variant="large">Application Theme</Text>
        <Toggle
          label="Dark Mode"
          onText="On"
          offText="Off"
          checked={isDarkTheme}
          onChange={toggleTheme} // <--- This function toggles the theme
          inlineLabel
        />
      </Stack>

      {/* User Preferences Section */}
      <Stack tokens={{ childrenGap: 10 }} styles={{ root: { maxWidth: 400, paddingTop: 30 } }}>
        <Text variant="large">User Preferences</Text>
        <TextField
          label="Display Name"
          value={userName}
          onChange={(e, newValue) => setUserName(newValue || '')}
        />
        <Toggle
          label="Enable Notifications"
          onText="Yes"
          offText="No"
          checked={notificationsEnabled}
          onChange={(e, checked) => setNotificationsEnabled(checked)}
          inlineLabel
        />
        <PrimaryButton text="Save Preferences" onClick={handleSavePreferences} styles={{ root: { marginTop: 20 } }} />
      </Stack>

    </Stack>
  );
};

export default Settings;