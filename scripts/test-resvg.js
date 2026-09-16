const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../assets/images/products/somato-stem-cellular-anti-aging-cure-detail.svg');
const pngPath = path.join(__dirname, '../assets/images/products/somato-stem-cellular-anti-aging-cure-detail.png');

console.time('resvg-render');
const svg = fs.readFileSync(svgPath, 'utf8');
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 800 }
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();
fs.writeFileSync(pngPath, pngBuffer);
console.timeEnd('resvg-render');

console.log('Successfully rendered PNG:', pngPath, 'Size:', pngBuffer.length, 'bytes');
