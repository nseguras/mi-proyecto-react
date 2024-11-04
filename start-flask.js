const { spawn } = require('child_process');

const flask = spawn('python', ['../backend/app.py'], { stdio: 'inherit' });

flask.on('close', (code) => {
  console.log(`Flask process exited with code ${code}`);
});
