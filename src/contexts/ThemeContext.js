// src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { createTheme, loadTheme } from '@fluentui/react';

// 1. Define the context. This will hold the theme state and the toggle function.
const ThemeContext = createContext(null);

// Define your light and dark Fluent UI themes
const lightTheme = createTheme({
  palette: {
    themePrimary: '#0078d4', // Primary blue
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  },
});

const darkTheme = createTheme({
  palette: {
    themePrimary: '#1a76d2', // Darker blue for primary
    themeLighterAlt: '#0a0d14',
    themeLighter: '#10141f',
    themeLight: '#1d2332',
    themeTertiary: '#3b4961',
    themeSecondary: '#243045',
    themeDarkAlt: '#1f293b',
    themeDark: '#243045',
    themeDarker: '#1a222e',
    neutralLighterAlt: '#2d2d2d', // Dark neutral background
    neutralLighter: '#373737',
    neutralLight: '#444444',
    neutralQuaternaryAlt: '#4e4e4e',
    neutralQuaternary: '#565656',
    neutralTertiaryAlt: '#606060',
    neutralTertiary: '#a8a8a8',
    neutralSecondary: '#b8b8b8',
    neutralPrimaryAlt: '#c7c7c7',
    neutralPrimary: '#d0d0d0',
    neutralDark: '#e4e4e4',
    black: '#f8f8f8',
    white: '#292929', // Darker background for text on dark mode
  },
});

// Helper function to apply the Fluent UI theme and body background/text color
const applyTheme = (isDark) => {
  const theme = isDark ? darkTheme : lightTheme;
  loadTheme(theme); // This function from @fluentui/react updates the global Fluent UI theme

  // Also apply background and text color to the body for non-Fluent UI elements
  document.body.style.backgroundColor = theme.palette.neutralLighterAlt;
  document.body.style.color = theme.palette.neutralPrimary;
};

// 2. Create a ThemeProvider component. This component will manage the theme state
// and provide it to all its children.
export const ThemeProvider = ({ children }) => {
  // Initialize theme state from local storage or default to light theme
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('isDarkTheme');
      return savedTheme ? JSON.parse(savedTheme) : false;
    } catch (error) {
      console.error("Failed to parse theme from localStorage, defaulting to light.", error);
      return false;
    }
  });

  // Apply theme on initial render and whenever the theme state changes
  useEffect(() => {
    applyTheme(isDarkTheme);
    // Save theme preference to local storage
    localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  // Function to toggle the theme
  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Create a custom hook `useTheme`. This hook makes it easy for any component
// to consume the theme context without directly importing `ThemeContext` and `useContext`.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    // This error will be thrown if useTheme is called outside of a ThemeProvider
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};