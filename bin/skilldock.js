#!/usr/bin/env node

/**
 * SkillDock CLI Wrapper (Node/npx)
 * Zero-dependency bridge that invokes scripts/skilldock_cli.py
 */

const { spawn } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const pythonScript = path.join(rootDir, 'scripts', 'skilldock_cli.py');
const args = process.argv.slice(2);

// Check python or python3
const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

const child = spawn(pythonCmd, [pythonScript, ...args], {
  stdio: 'inherit',
  cwd: rootDir
});

child.on('error', (err) => {
  if (err.code === 'ENOENT') {
    // Fallback to python3 if python wasn't found
    const fallback = spawn('python3', [pythonScript, ...args], {
      stdio: 'inherit',
      cwd: rootDir
    });
    fallback.on('error', (fallbackErr) => {
      console.error('Error: Python 3 runtime is required to execute skilldock CLI.');
      console.error(fallbackErr.message);
      process.exit(1);
    });
    fallback.on('exit', (code) => process.exit(code || 0));
  } else {
    console.error(`SkillDock CLI execution error: ${err.message}`);
    process.exit(1);
  }
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

