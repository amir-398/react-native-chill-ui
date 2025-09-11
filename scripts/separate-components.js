#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SOURCE_DIR = 'chill-ui-watch/src/components';
const CORE_DIR = 'core';

const VARIANTS = {
  hybrid: {
    suffix: '.tsx',
    coreDir: 'core-hybrid',
    excludeSuffix: '',
  },
  tailwind: {
    suffix: '.tw.tsx',
    coreDir: 'core-tailwind',
    excludeSuffix: '.tw',
  },
  stylesheet: {
    suffix: '.ss.tsx',
    coreDir: 'core-stylesheet',
    excludeSuffix: '.ss',
  },
};

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

/**
 * Copy file and update imports
 */
function copyFileWithImportFix(sourcePath, destPath, variant) {
  let content = fs.readFileSync(sourcePath, 'utf8');

  // Fix imports for styles files (vr/sv) in types files
  if (destPath.includes('/types/') && destPath.endsWith('.types.ts')) {
    // For all variants, change ../../components/ to ../components/ for styles imports
    content = content.replace(
      /from\s+['"]\.\.\/\.\.\/components\/(.+?)\/styles\/(.+?)\.(variants|styles)['"]/g,
      "from '../components/$1/styles/$2.$3'",
    );

    // Change ../[file].types to ./[file].types for type imports
    content = content.replace(/from\s+['"]\.\.\/(.+?)\.types['"]/g, "from './$1.types'");
  }

  // Remove /ss/ and /tw/ from utils imports for all variants
  content = content.replace(/from\s+['"](.+?)\/ss\/styleSheetVariants['"]/g, "from '$1/styleSheetVariants'");
  content = content.replace(/from\s+['"](.+?)\/tw\/(.+?)['"]/g, "from '$1/$2'");

  // Fix relative imports based on variant
  if (variant === 'hybrid') {
    // For hybrid, remove .tw and .ss suffixes from imports
    content = content.replace(/from\s+['"](.+?)\.tw['"]/g, "from '$1'");
    content = content.replace(/from\s+['"](.+?)\.ss['"]/g, "from '$1'");

    // Remove /hybrid from utils imports
    content = content.replace(/from\s+['"](.+?)\/hybrid\/(.+?)['"]/g, "from '$1/$2'");
  } else if (variant === 'tailwind') {
    // For tailwind, remove .tw suffixes from all imports
    content = content.replace(/from\s+['"](.+?)\.tw\.types['"]/g, "from '$1.types'");
    content = content.replace(/from\s+['"](.+?)\.tw['"]/g, "from '$1'");
  } else if (variant === 'stylesheet') {
    // For stylesheet, change ../../utils/ to ../utils/ in types files
    if (destPath.includes('/types/') && destPath.endsWith('.types.ts')) {
      content = content.replace(/from\s+['"]\.\.\/\.\.\/utils\/(.+?)['"]/g, "from '../utils/$1'");
    }

    // For stylesheet, remove .ss suffixes from all imports (including types)
    content = content.replace(/from\s+['"](.+?)\.ss\.types['"]/g, "from '$1.types'");
    content = content.replace(/from\s+['"](.+?)\.ss['"]/g, "from '$1'");
  }

  // Fix types import paths to remove duplicate component name and intermediate folder
  // This applies to ALL variants, not just stylesheet
  // This handles all cases: import, import type, export, etc.
  // e.g., '../../../types/box/box.types' -> '../../../types/box.types'
  // e.g., './string/string.types' -> './string.types'
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.types(['"])/g, '$1$2$3.types$4');
  content = content.replace(/(['"])\.\/([^\/]+)\/\2\.types(['"])/g, '$1./$2.types$3');

  // Fix .tw.types and .ss.types imports to just .types (for all variants)
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.tw\.types(['"])/g, '$1$2$3.types$4');
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.ss\.types(['"])/g, '$1$2$3.types$4');

  ensureDir(path.dirname(destPath));
  fs.writeFileSync(destPath, content);
  console.log(`📄 Copied: ${sourcePath} → ${destPath}`);
}

/**
 * Copy directory recursively
 */
function copyDirectory(sourceDir, destDir, variant) {
  ensureDir(destDir);

  const items = fs.readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const destPath = path.join(destDir, item);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      copyDirectory(sourcePath, destPath, variant);
    } else if (stat.isFile()) {
      copyFileWithImportFix(sourcePath, destPath, variant);
    }
  }
}

/**
 * Process types for a component
 */
function processComponentTypes(componentName, variantName, coreDir) {
  const typesSourceDir = path.join('chill-ui-watch/src/types', componentName);
  const typesDestDir = path.join(CORE_DIR, coreDir, 'src/types');

  if (!fs.existsSync(typesSourceDir)) {
    console.log(`⚠️  No types directory found for ${componentName}`);
    return;
  }

  ensureDir(typesDestDir);

  if (variantName === 'hybrid') {
    // For hybrid, copy only the tailwind types directly to the root types directory (like tailwind variant)
    const typeFiles = fs.readdirSync(typesSourceDir);

    for (const file of typeFiles) {
      const sourcePath = path.join(typesSourceDir, file);

      // Copy .tw.types.ts and rename to .types.ts (same as tailwind)
      if (file.endsWith('.tw.types.ts')) {
        const destPath = path.join(typesDestDir, `${componentName}.types.ts`);
        copyFileWithImportFix(sourcePath, destPath, variantName);
      }
    }
    console.log(`📁 Copied tailwind types to hybrid variant (direct to root)`);
    return;
  }

  const typeFiles = fs.readdirSync(typesSourceDir);

  for (const file of typeFiles) {
    const sourcePath = path.join(typesSourceDir, file);

    if (variantName === 'tailwind') {
      // For tailwind, copy .tw.types.ts and rename to .types.ts
      if (file.endsWith('.tw.types.ts')) {
        const destPath = path.join(typesDestDir, `${componentName}.types.ts`);
        copyFileWithImportFix(sourcePath, destPath, variantName);
      }
    } else if (variantName === 'stylesheet') {
      // For stylesheet, copy .ss.types.ts and rename to .types.ts
      if (file.endsWith('.ss.types.ts')) {
        const destPath = path.join(typesDestDir, `${componentName}.types.ts`);
        copyFileWithImportFix(sourcePath, destPath, variantName);
      }
    }
  }
}

/**
 * Process a single component
 */
function processComponent(componentName) {
  const componentPath = path.join(SOURCE_DIR, componentName);

  if (!fs.existsSync(componentPath)) {
    console.error(`❌ Component not found: ${componentName}`);
    return;
  }

  console.log(`\n🔄 Processing component: ${componentName}`);

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreBasePath = path.join(CORE_DIR, config.coreDir, 'src');
    const coreComponentPath = path.join(coreBasePath, 'components', componentName);

    console.log(`\n📦 Processing variant: ${variantName}`);

    // Clean destination
    if (fs.existsSync(coreComponentPath)) {
      fs.rmSync(coreComponentPath, { recursive: true });
      console.log(`🧹 Cleaned: ${coreComponentPath}`);
    }

    // Copy component structure
    ensureDir(coreComponentPath);

    // Copy shared files (utils, README, etc.)
    const sharedDirs = ['utils'];
    const sharedFiles = ['README.md'];

    for (const dir of sharedDirs) {
      const sourceDir = path.join(componentPath, dir);
      if (fs.existsSync(sourceDir)) {
        copyDirectory(sourceDir, path.join(coreComponentPath, dir), variantName);
      }
    }

    for (const file of sharedFiles) {
      const sourceFile = path.join(componentPath, file);
      if (fs.existsSync(sourceFile)) {
        copyFileWithImportFix(sourceFile, path.join(coreComponentPath, file), variantName);
      }
    }

    // Handle styles directory with variant-specific filtering
    const stylesDir = path.join(componentPath, 'styles');
    if (fs.existsSync(stylesDir)) {
      const destStylesDir = path.join(coreComponentPath, 'styles');
      ensureDir(destStylesDir);

      const styleFiles = fs.readdirSync(stylesDir);

      for (const file of styleFiles) {
        const sourceFile = path.join(stylesDir, file);
        const destFile = path.join(destStylesDir, file);

        // Filter style files based on variant
        if (variantName === 'tailwind') {
          // Tailwind: only keep .variants files
          if (file.includes('.variants.')) {
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        } else if (variantName === 'stylesheet') {
          // Stylesheet: only keep .styles files
          if (file.includes('.styles.')) {
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        } else if (variantName === 'hybrid') {
          // Hybrid: keep both .styles and .variants files
          if (file.includes('.styles.') || file.includes('.variants.')) {
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        }
      }
    }

    // Process components directory
    const componentsDir = path.join(componentPath, 'components');
    if (fs.existsSync(componentsDir)) {
      const componentFiles = fs.readdirSync(componentsDir);
      const destComponentsDir = path.join(coreComponentPath, 'components');
      ensureDir(destComponentsDir);

      for (const file of componentFiles) {
        const sourceFile = path.join(componentsDir, file);

        if (variantName === 'hybrid') {
          // For hybrid, only copy base .tsx files
          if (file.endsWith('.tsx') && !file.includes('.tw.') && !file.includes('.ss.')) {
            const destFile = path.join(destComponentsDir, file);
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        } else if (variantName === 'tailwind') {
          // For tailwind, copy .tw.tsx files and rename them to .tsx
          if (file.endsWith('.tw.tsx')) {
            const destFile = path.join(destComponentsDir, file.replace('.tw.tsx', '.tsx'));
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        } else if (variantName === 'stylesheet') {
          // For stylesheet, copy .ss.tsx files and rename them to .tsx
          if (file.endsWith('.ss.tsx')) {
            const destFile = path.join(destComponentsDir, file.replace('.ss.tsx', '.tsx'));
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        }
      }
    }

    // Process types for this component
    processComponentTypes(componentName, variantName, config.coreDir);

    // Create index.ts for the component using the same format as the main library
    const indexPath = path.join(coreComponentPath, 'index.ts');
    const mainIndexPath = path.join(SOURCE_DIR, componentName, 'index.ts');

    if (fs.existsSync(mainIndexPath)) {
      let mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
      let indexContent = '';

      // Get the component name from the path (e.g., "Box", "Avatar", etc.)
      const componentBaseName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

      // For all variants, use the first export block (hybrid/neutral format)
      const firstExportRegex = new RegExp(
        `export\\s*\\{[\\s\\S]*?\\}\\s*from\\s*['"][^'"]*\\/${componentBaseName}['"];`,
      );
      const firstExportMatch = mainIndexContent.match(firstExportRegex);
      if (firstExportMatch) {
        indexContent = firstExportMatch[0];
      }

      if (indexContent) {
        fs.writeFileSync(indexPath, indexContent);
        console.log(`📄 Created index: ${indexPath}`);
      }
    } else {
      // Fallback to old method if main index doesn't exist
      const componentFiles = fs.existsSync(path.join(coreComponentPath, 'components'))
        ? fs.readdirSync(path.join(coreComponentPath, 'components'))
        : [];

      let indexContent = '';
      for (const file of componentFiles) {
        if (file.endsWith('.tsx')) {
          const componentName = path.basename(file, '.tsx');
          indexContent += `export { default as ${componentName} } from './components/${componentName}';\n`;
        }
      }

      if (indexContent) {
        fs.writeFileSync(indexPath, indexContent);
        console.log(`📄 Created index: ${indexPath}`);
      }
    }
  }
}

/**
 * Process utils for all variants
 */
function processUtils() {
  console.log('\n🔄 Processing utils...');

  const utilsSourceDir = 'chill-ui-watch/src/utils';

  if (!fs.existsSync(utilsSourceDir)) {
    console.log('⚠️  No utils directory found');
    return;
  }

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreUtilsDir = path.join(CORE_DIR, config.coreDir, 'src/utils');

    console.log(`\n📦 Processing utils for variant: ${variantName}`);

    // Clean destination
    if (fs.existsSync(coreUtilsDir)) {
      fs.rmSync(coreUtilsDir, { recursive: true });
      console.log(`🧹 Cleaned: ${coreUtilsDir}`);
    }

    ensureDir(coreUtilsDir);

    // Only copy variant-specific files, no common files

    // Handle variant-specific utils
    if (variantName === 'tailwind') {
      // Copy files from tw/ directory
      const twDir = path.join(utilsSourceDir, 'tw');
      if (fs.existsSync(twDir)) {
        const twFiles = fs.readdirSync(twDir);
        for (const file of twFiles) {
          const sourcePath = path.join(twDir, file);
          const destPath = path.join(coreUtilsDir, file);
          copyFileWithImportFix(sourcePath, destPath, variantName);
        }
      }
    } else if (variantName === 'stylesheet') {
      // Copy files from ss/ directory
      const ssDir = path.join(utilsSourceDir, 'ss');
      if (fs.existsSync(ssDir)) {
        const ssFiles = fs.readdirSync(ssDir);
        for (const file of ssFiles) {
          const sourcePath = path.join(ssDir, file);
          const destPath = path.join(coreUtilsDir, file);
          copyFileWithImportFix(sourcePath, destPath, variantName);
        }
      }
    } else if (variantName === 'hybrid') {
      // Copy files from hybrid/ directory directly into utils/
      const hybridDir = path.join(utilsSourceDir, 'hybrid');
      if (fs.existsSync(hybridDir)) {
        const hybridFiles = fs.readdirSync(hybridDir);
        for (const file of hybridFiles) {
          const sourcePath = path.join(hybridDir, file);
          const destPath = path.join(coreUtilsDir, file);
          copyFileWithImportFix(sourcePath, destPath, variantName);
        }
      }
    }

    // Create utils index.ts
    const utilsIndexPath = path.join(coreUtilsDir, 'index.ts');
    const utilsFiles = fs.readdirSync(coreUtilsDir).filter(file => file.endsWith('.ts') && file !== 'index.ts');

    let utilsIndexContent = '';
    for (const file of utilsFiles) {
      const moduleName = path.basename(file, '.ts');
      utilsIndexContent += `export * from './${moduleName}';\n`;
    }

    if (utilsIndexContent) {
      fs.writeFileSync(utilsIndexPath, utilsIndexContent);
      console.log(`📄 Created utils index: ${utilsIndexPath}`);
    }
  }
}

/**
 * Create types index files for each variant
 */
function createTypesIndexes() {
  console.log('\n🔄 Creating types index files...');

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const typesDir = path.join(CORE_DIR, config.coreDir, 'src/types');

    if (!fs.existsSync(typesDir)) {
      console.log(`⚠️  No types directory found for ${variantName}`);
      continue;
    }

    const typesIndexPath = path.join(typesDir, 'index.ts');
    let typesIndexContent = '';

    if (variantName === 'hybrid') {
      // For hybrid, export individual component types (same as tailwind and stylesheet)
      const typeFiles = fs.readdirSync(typesDir).filter(file => file.endsWith('.types.ts'));
      for (const typeFile of typeFiles) {
        const typeName = path.basename(typeFile, '.types.ts');
        typesIndexContent += `export * from './${typeName}.types';\n`;
      }
    } else {
      // For other variants, export individual component types
      const typeFiles = fs.readdirSync(typesDir).filter(file => file.endsWith('.types.ts'));
      for (const typeFile of typeFiles) {
        const typeName = path.basename(typeFile, '.types.ts');
        typesIndexContent += `export * from './${typeName}.types';\n`;
      }
    }

    if (typesIndexContent) {
      fs.writeFileSync(typesIndexPath, typesIndexContent);
      console.log(`📄 Created types index: ${typesIndexPath}`);
    }
  }
}

/**
 * Update core index files
 */
function updateCoreIndexes() {
  console.log('\n🔄 Updating core index files...');

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreIndexPath = path.join(CORE_DIR, config.coreDir, 'src', 'index.ts');
    const coreSrcPath = path.join(CORE_DIR, config.coreDir, 'src');

    if (!fs.existsSync(coreSrcPath)) continue;

    let indexContent = '';

    // Export all components
    const componentsPath = path.join(coreSrcPath, 'components');
    if (fs.existsSync(componentsPath)) {
      const components = fs.readdirSync(componentsPath).filter(item => {
        const itemPath = path.join(componentsPath, item);
        return fs.statSync(itemPath).isDirectory();
      });

      for (const component of components) {
        indexContent += `export * from './components/${component}';\n`;
      }
    }

    // Export all types from types/index.ts
    const typesPath = path.join(coreSrcPath, 'types');
    if (fs.existsSync(typesPath) && fs.existsSync(path.join(typesPath, 'index.ts'))) {
      indexContent += `export * from './types';\n`;
    }

    // Add utils exports if they exist
    if (fs.existsSync(path.join(coreSrcPath, 'utils'))) {
      indexContent += `export * from './utils';\n`;
    }

    fs.writeFileSync(coreIndexPath, indexContent);
    console.log(`📄 Updated: ${coreIndexPath}`);
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('📋 Available components:');
    const components = fs.readdirSync(SOURCE_DIR).filter(item => {
      const itemPath = path.join(SOURCE_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const component of components) {
      console.log(`  - ${component}`);
    }

    console.log('\n💡 Usage:');
    console.log('  node scripts/separate-components.js <component-name>');
    console.log('  node scripts/separate-components.js all');
    console.log('\n📝 Examples:');
    console.log('  node scripts/separate-components.js avatar');
    console.log('  node scripts/separate-components.js button');
    console.log('  node scripts/separate-components.js all');
    return;
  }

  const componentName = args[0];

  if (componentName === 'all') {
    console.log('🚀 Processing all components...');
    const components = fs.readdirSync(SOURCE_DIR).filter(item => {
      const itemPath = path.join(SOURCE_DIR, item);
      return fs.statSync(itemPath).isDirectory();
    });

    for (const component of components) {
      processComponent(component);
    }

    processUtils();
  } else {
    processComponent(componentName);
    processUtils();
  }

  createTypesIndexes();
  updateCoreIndexes();
  console.log('\n✅ Component separation completed!');
}

// Run the script
main();
