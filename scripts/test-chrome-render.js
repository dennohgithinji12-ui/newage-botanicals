const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testSvg = path.join(__dirname, '../assets/images/products/somato-stem-cellular-anti-aging-cure-packaging.svg');
const testOut = path.join(__dirname, '../assets/images/products/somato-stem-cellular-anti-aging-cure-packaging.png');

console.log('Testing Chrome rendering on:', testSvg);

const cmd = `"${chromePath}" --headless=new --disable-gpu --screenshot="${testOut}" --window-size=600,600 --default-background-color=000000 "file:///${testSvg.replace(/\\/g, '/')}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  if (fs.existsSync(testOut)) {
    const stat = fs.statSync(testOut);
    console.log('Success! Captured PNG:', testOut, 'size:', stat.size, 'bytes');
  } else {
    console.log('File not created');
  }
} catch (err) {
  console.error('Error running chrome:', err.message);
}
