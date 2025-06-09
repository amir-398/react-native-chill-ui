const fs = require('fs');
const path = require('path');

const flagsDir = path.join(__dirname, '../src/components/inputs/phoneNumberInput/flags');
const outputFile = path.join(flagsDir, 'index.ts');

// Read all PNG files from the flags directory
const files = fs
  .readdirSync(flagsDir)
  .filter(file => file.endsWith('.png'))
  .sort();

// Generate the import statements
const imports = files
  .map(file => {
    const countryCode = path.basename(file, '.png');
    return `export { default as ${countryCode} } from './${file}';`;
  })
  .join('\n');

// Write to the index.ts file
fs.writeFileSync(outputFile, imports);

console.log('Flag imports generated successfully!');
