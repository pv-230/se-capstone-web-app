import React, { useState } from 'react'
import { TextField, Button, Stack, Typography, Link } from "@mui/material"

const PasswordReset = () => {
  // Form states
  const [inputText, setInputText] = useState({
    email: "",
    currentPassword: "",
    newPassword: ""
  });

  // Event handler for user input inside the forms
  const handleInputChange = event => {
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    })
  }

  const handleResetButton = event => {
    console.log("Reset");
  }

  return (
    <Stack className="login" spacing={2}>
      <Typography variant="h4">Welcome!</Typography>

      <TextField
        type="text"
        onChange={handleInputChange}
        label="Email"
        variant="outlined"
        name="email"
        required
      />

      <TextField
        type="password"
        onChange={handleInputChange}
        label="Current password"
        variant="outlined"
        name="currentPassword"
        required
      />

      <TextField
        type="password"
        onChange={handleInputChange}
        label="New password"
        variant="outlined"
        name="newPassword"
        required
      />

      <Button onClick={handleResetButton} variant="contained">Reset</Button>
    </Stack>
  )
}

export default PasswordReset