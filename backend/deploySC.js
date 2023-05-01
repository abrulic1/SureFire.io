const { exec } = require('child_process');

// Run the 'ls' command and log the output to the console
const deplySC = () => exec('mkdir new1dir && mkdir new2dir', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

module.exports =  deplySC;

