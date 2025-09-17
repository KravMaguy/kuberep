// Simple Node.js application for Dependabot POC
// This file demonstrates usage of packages with "@" symbols in their names

const express = require('express');
// These imports would normally use packages with "@" symbols:
// import { Component } from '@angular/core';
// import { Button } from '@mui/material';
// import { render } from '@testing-library/react';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Dependabot POC for issue #13042',
    description: 'Testing commit message sanitization for @ symbols',
    issue: 'https://github.com/dependabot/dependabot-core/issues/13042'
  });
});

app.listen(port, () => {
  console.log(`POC server running on port ${port}`);
});

module.exports = app;