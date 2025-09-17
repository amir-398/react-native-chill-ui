#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

/**
 * Script principal pour convertir les imports dans les libs générées
 * Usage: node scripts/convert-imports.js [direction]
 *
 * Directions disponibles:
 * - to-relative: Convertit les alias en chemins relatifs
 * - to-aliases: Convertit les chemins relatifs en alias
 */

function showUsage() {
  console.log(`
🔄 Script de conversion des imports

Usage: node scripts/convert-imports.js [direction]

Directions disponibles:
  to-relative    Convertit les alias (@types, @utils) en chemins relatifs
  to-aliases     Convertit les chemins relatifs en alias (@types, @utils)

Exemples:
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
    console.log(`🚀 Exécution de la conversion: ${direction}\n`);
    execSync(`node "${scriptPath}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error("✗ Erreur lors de l'exécution du script:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
