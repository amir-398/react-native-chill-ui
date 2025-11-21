#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

/**
 * Main script to convert imports in generated libs
 * Usage: node scripts/convert-imports.js [direction]
 *
 * Available directions:
 * - to-relative: Converts aliases to relative paths
 * - to-aliases: Converts relative paths to aliases
 */

function showUsage() {
  console.log(`
🔄 Import conversion script

Usage: node scripts/convert-imports.js [direction]

Available directions:
  to-relative    Converts aliases (@types, @utils) to relative paths
  to-aliases     Converts relative paths to aliases (@types, @utils)

Examples:
  node scripts/convert-imports.js to-relative
  node scripts/convert-imports.js to-aliases
`);
}

function main() {
  const direction = process.argv[2];

  if (!direction || !['to-relative', 'to-aliases'].includes(direction)) {
    showUsage();
    process.exit(1);
  }

  const scriptPath =
    direction === 'to-relative'
      ? path.join(__dirname, 'convert-aliases-to-relative.js')
      : path.join(__dirname, 'convert-relative-to-aliases.js');

  try {
    console.log(`🚀 Executing conversion: ${direction}\n`);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error("✗ Error executing script:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
