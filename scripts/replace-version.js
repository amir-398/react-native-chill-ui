#!/usr/bin/env node

/**
 * Script to replace {{VERSION}} placeholder in generated package.json files
 * with the actual version from packages/chill-ui-core/package.json
 */

const fs = require('fs');
const path = require('path');

// Read the core package.json to get the version
const corePackagePath = path.join(__dirname, '../packages/chill-ui-core/package.json');
const corePackage = JSON.parse(fs.readFileSync(corePackagePath, 'utf-8'));
const { version } = corePackage;

console.log(`📦 Replacing {{VERSION}} with ${version}`);

// Paths to the generated package.json files
const generatedPackages = ['generated/core-tailwind/package.json', 'generated/core-stylesheet/package.json'];

generatedPackages.forEach(packagePath => {
  const fullPath = path.join(__dirname, '..', packagePath);

  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  File not found: ${fullPath}`);
    return;
  }

  // Read the generated package.json
  let content = fs.readFileSync(fullPath, 'utf-8');

  // Replace {{VERSION}} with the actual version
  content = content.replace(/{{VERSION}}/g, version);

  // Write back
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ Updated ${packagePath}`);
});

console.log('✨ Version replacement complete!');
