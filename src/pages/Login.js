import React, { useState } from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email cannot be empty.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Mock login logic:
      // In a real application, you would send these credentials to a backend API
      // and handle the response (e.g., store a token, fetch user data).
      console.log('Attempting mock login with:', { email, password });
      alert('Mock Login Successful! Redirecting to Dashboard.');
      navigate('/dashboard'); // Navigate to the Dashboard page
    }
  };

  const stackTokens = { childrenGap: 15 };
  const containerStyles = {
    root: {
      maxWidth: 400,
      margin: '50px auto',
      padding: 20,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: 8,
      backgroundColor: 'white',
    },
  };

  return (
    <Stack horizontalAlign="center" verticalAlign="center" styles={containerStyles}>
      <Text variant="xxLarge" style={{ marginBottom: 20 }}>Login</Text>
      <Stack tokens={stackTokens} style={{ width: '100%' }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e, newValue) => setEmail(newValue || '')}
          errorMessage={emailError}
          required
        />
        <TextField
          label="Password"
          type="password"
          canRevealPassword
          value={password}
          onChange={(e, newValue) => setPassword(newValue || '')}
          errorMessage={passwordError}
          required
        />
        <PrimaryButton
          text="Login"
          onClick={handleLogin}
          allowDisabledFocus
          style={{ marginTop: 10 }}
        />
      </Stack>
    </Stack>
  );
};

export default Login;