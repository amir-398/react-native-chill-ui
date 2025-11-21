#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to convert TypeScript aliases to relative paths
 * in generated libs core-stylesheet, core-hybrid and core-tailwind
 */

// Alias configuration based on tsconfig.json
const ALIAS_CONFIG = {
  '@constants': './src/constants',
  '@types': './src/types',
  '@utils': './src/utils',
};

// Wildcard alias configuration
const WILDCARD_ALIAS_CONFIG = {
  '@components/*': './src/components/*',
};

// File extensions to process
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.js.map', '.d.ts'];

/**
 * Calculates the relative path between two files
 */
function getRelativePath(fromFile, toPath) {
  const fromDir = path.dirname(fromFile);
  const relativePath = path.relative(fromDir, toPath);

  // Ensure path starts with ./
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * Replaces aliases with relative paths in file content
 */
function replaceAliasesInContent(content, filePath, baseDir) {
  let modifiedContent = content;

  // Replace each exact alias
  for (const [alias, aliasPath] of Object.entries(ALIAS_CONFIG)) {
    const fullAliasPath = path.resolve(baseDir, aliasPath);
    const relativePath = getRelativePath(filePath, fullAliasPath);

    // Pattern to match imports with alias
    const aliasPattern = new RegExp(`(['"\`])${alias.replace('@', '\\@')}(['"\`])`, 'g');

    modifiedContent = modifiedContent.replace(aliasPattern, `$1${relativePath}$2`);
  }

  // Replace each wildcard alias
  for (const [alias, aliasPath] of Object.entries(WILDCARD_ALIAS_CONFIG)) {
    // Pattern to match wildcard alias imports (e.g. @components/animatedBox)
    const escapedAlias = alias.replace('@', '\\@').replace('*', '([^"\'`]+)');
    const aliasPattern = new RegExp(`(['"\`])${escapedAlias}(['"\`])`, 'g');

    modifiedContent = modifiedContent.replace(aliasPattern, (match, quote1, subPath, quote2) => {
      // Build full path by replacing * with subpath
      const fullAliasPath = path.resolve(baseDir, aliasPath.replace('*', subPath));
      const relativePath = getRelativePath(filePath, fullAliasPath);
      return `${quote1}${relativePath}${quote2}`;
    });
  }

  return modifiedContent;
}

/**
 * Processes an individual file
 */
function processFile(filePath, baseDir) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const modifiedContent = replaceAliasesInContent(content, filePath, baseDir);

    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`✓ Converted: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Recursively traverses a directory and processes all files
 */
function processDirectory(dirPath, baseDir) {
  let processedCount = 0;

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Ignore node_modules and other irrelevant folders
        if (!['node_modules', '.git', 'dist', 'lib'].includes(item)) {
          processedCount += processDirectory(itemPath, baseDir);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (FILE_EXTENSIONS.includes(ext)) {
          if (processFile(itemPath, baseDir)) {
            processedCount++;
          }
        }
      }
    }
  } catch (error) {
    console.error(`✗ Error traversing ${dirPath}:`, error.message);
  }

  return processedCount;
}

/**
 * Main function
 */
function main() {
  const generatedDir = path.join(__dirname, '..', 'generated');

  if (!fs.existsSync(generatedDir)) {
    console.error('✗ The "generated" folder does not exist');
    process.exit(1);
  }

  console.log('🔄 Converting aliases to relative paths...\n');

  const libs = ['core-stylesheet', 'core-hybrid', 'core-tailwind'];
  let totalProcessed = 0;

  for (const lib of libs) {
    const libPath = path.join(generatedDir, lib);

    if (!fs.existsSync(libPath)) {
      console.log(`⚠️  Lib ${lib} not found, skipped`);
      continue;
    }

    console.log(`📁 Processing ${lib}...`);

    // Process src folder
    const srcPath = path.join(libPath, 'src');
    if (fs.existsSync(srcPath)) {
      const processed = processDirectory(srcPath, libPath);
      totalProcessed += processed;
      console.log(`   ${processed} file(s) modified in src/\n`);
    }

    // Process lib folder if it exists
    const libBuildPath = path.join(libPath, 'lib');
    if (fs.existsSync(libBuildPath)) {
      const processed = processDirectory(libBuildPath, libPath);
      totalProcessed += processed;
      console.log(`   ${processed} file(s) modified in lib/\n`);
    }
  }

  console.log(`✅ Conversion complete! ${totalProcessed} file(s) modified in total.`);
}

// Execute script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  processDirectory,
  processFile,
  replaceAliasesInContent,
};
