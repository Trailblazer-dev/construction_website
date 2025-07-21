#!/usr/bin/env node

/**
 * This script creates the necessary files for Vercel to handle client-side routing
 * with React Router correctly.
 */

const fs = require('fs');
const path = require('path');

// Get the build directory (usually 'dist' for Vite projects)
const buildDir = path.join(__dirname, 'dist');

// Create a Vercel specific _redirects file if it doesn't exist
const redirectsPath = path.join(buildDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  fs.writeFileSync(redirectsPath, '/* /index.html 200');
  console.log('Created _redirects file for client-side routing');
}

// Ensure there's a proper 404.html that redirects to the index
const notFoundPath = path.join(buildDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  const notFoundContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="refresh" content="0;url=/" />
    <title>StratoPath Constructors</title>
  </head>
  <body>
    <script>
      window.location.href = "/";
    </script>
  </body>
</html>`;

  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('Created 404.html file for better routing fallback');
}

console.log('Vercel deployment optimizations completed');
