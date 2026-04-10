const fs = require('fs');

const signsDir = 'c:/Users/bajpa_/OneDrive/Desktop/NeoFuture_Ishario/ishario/public/signs';
const mappingsFile = 'c:/Users/bajpa_/OneDrive/Desktop/NeoFuture_Ishario/ishario/src/data/signMappings.js';

const allFiles = fs.readdirSync(signsDir)
  .filter(f => f.match(/\.(png|jpe?g|gif)$/i))
  .map(f => `/signs/${f}`);

const mappingCode = fs.readFileSync(mappingsFile, 'utf8');

const missing = [];
for (const file of allFiles) {
  if (!mappingCode.includes(file)) {
    missing.push(file);
  }
}

console.log('Missing from mappings:', missing);
