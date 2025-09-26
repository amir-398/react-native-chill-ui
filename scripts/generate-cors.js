#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');

// Configuration
const SOURCE_DIR = 'chill-ui-core/src/components';
const CORE_DIR = 'generated';

const VARIANTS = {
  hybrid: {
    coreDir: 'core-hybrid',
    excludeSuffix: '',
    suffix: '.tsx',
  },
  stylesheet: {
    coreDir: 'core-stylesheet',
    excludeSuffix: '.ss',
    suffix: '.ss.tsx',
  },
  tailwind: {
    coreDir: 'core-tailwind',
    excludeSuffix: '.tw',
    suffix: '.tw.tsx',
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
    content = content.replace(/from\s+['"](.+?)\.tw\.types['"]/g, "from '$1.types'");
    content = content.replace(/from\s+['"](.+?)\.ss\.types['"]/g, "from '$1.types'");
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

  // Fix imports from nested component folders (like BounceBox/) to types FIRST
  // e.g., '../../../../types/animatedBox/bounceBox.types' -> '../../../../types/bounceBox.types'
  // This removes only the intermediate component folder name, preserving the relative path depth
  content = content.replace(/(['"])((?:\.\.\/)+)types\/([^\/]+)\/([^\/]+)\.types(['"])/g, '$1$2types/$4.types$5');

  // Fix .tw.types and .ss.types imports to just .types (for all variants)
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.tw\.types(['"])/g, '$1$2$3.types$4');
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.ss\.types(['"])/g, '$1$2$3.types$4');

  // Fix types import paths to remove duplicate component name and intermediate folder
  // This applies to ALL variants, not just stylesheet
  // This handles all cases: import, import type, export, etc.
  // e.g., '../../../types/box/box.types' -> '../../../types/box.types'
  // e.g., './string/string.types' -> './string.types'
  // BUT ONLY when the folder name and file name are actually the same
  content = content.replace(/(['"])(.+?\/types\/)([^\/]+)\/\3\.types(['"])/g, '$1$2$3.types$4');
  content = content.replace(/(['"])\.\/([^\/]+)\/\2\.types(['"])/g, '$1./$2.types$3');

  // Remove suffixes from type names in imports (Ss, Tw, etc.)
  // This transforms: import type { StringPropsSs } from '@types' -> import type { StringProps } from '@types'
  // This transforms: import type { StringPropsTw } from '@types' -> import type { StringProps } from '@types'
  content = content.replace(/(import\s+type\s*\{[^}]*?)(\w+)(Ss|Tw)([^}]*?\}\s*from\s*['"][^'"]*['"])/g, '$1$2$4');

  // Also handle cases where the type is used in the import without curly braces
  // e.g., import type StringPropsSs from '@types' -> import type StringProps from '@types'
  content = content.replace(/(import\s+type\s+)(\w+)(Ss|Tw)(\s+from\s+['"][^'"]*['"])/g, '$1$2$4');

  // Remove suffixes from type names used in function parameters and type annotations
  // This transforms: (props: PropsWithChildren<StringPropsSs>) -> (props: PropsWithChildren<StringProps>)
  // This transforms: (props: StringPropsTw) -> (props: StringProps)
  // This transforms: StringPropsSs -> StringProps (anywhere in the code)
  content = content.replace(/(\w+)(Ss|Tw)(\s*[>,\)\]\s])/g, '$1$3');

  // Also handle cases where the type name is at the end of a line or followed by other characters
  content = content.replace(/(\w+)(Ss|Tw)(\s*[;,}])/g, '$1$3');

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
  const typesSourceDir = path.join('chill-ui-core/src/types', componentName);
  const typesDestDir = path.join(CORE_DIR, coreDir, 'src/types');

  if (!fs.existsSync(typesSourceDir)) {
    console.log(`⚠️  No types directory found for ${componentName}`);
    return;
  }

  ensureDir(typesDestDir);

  const typeFiles = fs.readdirSync(typesSourceDir);
  const copiedFiles = new Set();

  // Helper function to copy a type file with fallback logic
  function copyTypeFile(baseFileName, variantSuffix, targetFileName) {
    const variantFile = baseFileName.replace('.types.ts', `${variantSuffix}.types.ts`);
    const baseFile = baseFileName;

    let sourceFile = null;

    // Try variant-specific file first
    if (typeFiles.includes(variantFile)) {
      sourceFile = variantFile;
      console.log(`📄 Using variant-specific type: ${variantFile}`);
    } else if (typeFiles.includes(baseFile)) {
      sourceFile = baseFile;
      console.log(`📄 Using base type (fallback): ${baseFile}`);
    }

    if (sourceFile) {
      const sourcePath = path.join(typesSourceDir, sourceFile);
      const destPath = path.join(typesDestDir, targetFileName);
      copyFileWithImportFix(sourcePath, destPath, variantName);
      copiedFiles.add(sourceFile);
      return true;
    }

    return false;
  }

  if (variantName === 'hybrid') {
    // For hybrid, use tailwind types with fallback to base types
    for (const file of typeFiles) {
      if (file.endsWith('.types.ts') && !file.includes('.tw.') && !file.includes('.ss.')) {
        const targetFileName = file === 'index.ts' ? 'index.ts' : file;
        copyTypeFile(file, '.tw', targetFileName);
      }
    }

    // Special handling for components that only have variant-specific types (like animatedBox)
    if (copiedFiles.size === 0) {
      console.log(`📄 No base types found, trying variant-specific types for hybrid...`);
      for (const file of typeFiles) {
        if (file.endsWith('.tw.types.ts')) {
          const baseFileName = file.replace('.tw.types.ts', '.types.ts');
          const sourcePath = path.join(typesSourceDir, file);
          const destPath = path.join(typesDestDir, baseFileName);
          copyFileWithImportFix(sourcePath, destPath, variantName);
          copiedFiles.add(file);
          console.log(`📄 Used tailwind variant for hybrid: ${file} → ${baseFileName}`);
        }
      }
    }

    console.log(`📁 Processed hybrid types with fallback logic`);
    return;
  }

  // For tailwind and stylesheet variants
  const variantSuffix = variantName === 'tailwind' ? '.tw' : '.ss';

  for (const file of typeFiles) {
    if (file.endsWith('.types.ts') && !file.includes('.tw.') && !file.includes('.ss.')) {
      const targetFileName = file === 'index.ts' ? 'index.ts' : file;
      copyTypeFile(file, variantSuffix, targetFileName);
    }
  }

  // Special handling for components that only have variant-specific types (like animatedBox)
  if (copiedFiles.size === 0) {
    console.log(`📄 No base types found, trying variant-specific types for ${variantName}...`);
    const targetSuffix = `${variantSuffix}.types.ts`;

    for (const file of typeFiles) {
      if (file.endsWith(targetSuffix)) {
        const baseFileName = file.replace(targetSuffix, '.types.ts');
        const sourcePath = path.join(typesSourceDir, file);
        const destPath = path.join(typesDestDir, baseFileName);
        copyFileWithImportFix(sourcePath, destPath, variantName);
        copiedFiles.add(file);
        console.log(`📄 Used ${variantName} variant: ${file} → ${baseFileName}`);
      }
    }
  }

  // Copy index.ts if it exists and wasn't copied yet
  if (typeFiles.includes('index.ts') && !copiedFiles.has('index.ts')) {
    const sourcePath = path.join(typesSourceDir, 'index.ts');
    const destPath = path.join(typesDestDir, 'index.ts');
    copyFileWithImportFix(sourcePath, destPath, variantName);
    console.log(`📄 Copied index.ts`);
  }
}

/**
 * Check if component has sub-components structure
 */
function hasSubComponentsStructure(componentPath) {
  const componentsDir = path.join(componentPath, 'components');
  if (!fs.existsSync(componentsDir)) {
    return false;
  }

  // Check if components directory contains subdirectories (indicating sub-components)
  const items = fs.readdirSync(componentsDir);
  return items.some(item => {
    const itemPath = path.join(componentsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });
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

  // Check if this component has sub-components structure
  const hasSubComponents = hasSubComponentsStructure(componentPath);

  if (hasSubComponents) {
    console.log(`\n🔄 Processing component with sub-components: ${componentName}`);
    processComponentWithSubComponents(componentName);
  } else {
    console.log(`\n🔄 Processing standard component: ${componentName}`);
    processStandardComponent(componentName);
  }
}

/**
 * Process component with sub-components (like animatedBox)
 */
function processComponentWithSubComponents(componentName) {
  const componentPath = path.join(SOURCE_DIR, componentName);
  const componentsDir = path.join(componentPath, 'components');

  // Get all sub-components
  const subComponents = fs.readdirSync(componentsDir).filter(item => {
    const itemPath = path.join(componentsDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log(`📋 Found sub-components: ${subComponents.join(', ')}`);

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreBasePath = path.join(CORE_DIR, config.coreDir, 'src');
    const coreComponentPath = path.join(coreBasePath, 'components', componentName);

    console.log(`\n📦 Processing variant: ${variantName}`);

    // Clean destination
    if (fs.existsSync(coreComponentPath)) {
      fs.rmSync(coreComponentPath, { recursive: true });
      console.log(`🧹 Cleaned: ${coreComponentPath}`);
    }

    ensureDir(coreComponentPath);

    // Copy shared files (README, etc.)
    const sharedFiles = ['README.md'];
    for (const file of sharedFiles) {
      const sourceFile = path.join(componentPath, file);
      if (fs.existsSync(sourceFile)) {
        copyFileWithImportFix(sourceFile, path.join(coreComponentPath, file), variantName);
      }
    }

    // Handle styles directory with variant-specific filtering
    const stylesDir = path.join(componentPath, 'styles');
    if (fs.existsSync(stylesDir)) {
      const styleFiles = fs.readdirSync(stylesDir);
      let hasFilesToCopy = false;

      // First pass: check if there are any files to copy for this variant
      for (const file of styleFiles) {
        if (variantName === 'tailwind') {
          // Tailwind: only keep .variants files
          if (file.includes('.variants.')) {
            hasFilesToCopy = true;
            break;
          }
        } else if (variantName === 'stylesheet') {
          // Stylesheet: only keep .styles files
          if (file.includes('.styles.')) {
            hasFilesToCopy = true;
            break;
          }
        } else if (variantName === 'hybrid') {
          // Hybrid: copy all style files
          hasFilesToCopy = true;
          break;
        }
      }

      // Only create the directory and copy files if there are files to copy
      if (hasFilesToCopy) {
        const destStylesDir = path.join(coreComponentPath, 'styles');
        ensureDir(destStylesDir);

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
            // Hybrid: copy all style files
            copyFileWithImportFix(sourceFile, destFile, variantName);
          }
        }
      }
    }

    // Create components directory in destination
    const destComponentsDir = path.join(coreComponentPath, 'components');
    ensureDir(destComponentsDir);

    // Process each sub-component
    for (const subComponentName of subComponents) {
      const sourceSubComponentDir = path.join(componentsDir, subComponentName);
      const destSubComponentDir = path.join(destComponentsDir, subComponentName);

      ensureDir(destSubComponentDir);

      // Copy the appropriate variant file
      const sourceFileName = `${subComponentName}${config.suffix}`;
      const sourceFile = path.join(sourceSubComponentDir, sourceFileName);
      // Capitalize the first letter for the destination filename
      const capitalizedName = subComponentName.charAt(0).toUpperCase() + subComponentName.slice(1);
      const destFile = path.join(destSubComponentDir, `${capitalizedName}.tsx`);

      if (fs.existsSync(sourceFile)) {
        copyFileWithImportFix(sourceFile, destFile, variantName);
        console.log(`📄 Copied: ${sourceFileName} → ${capitalizedName}.tsx`);
      } else {
        // Fallback: try base .tsx file if variant-specific file doesn't exist
        const fallbackFileName = `${subComponentName}.tsx`;
        const fallbackSourceFile = path.join(sourceSubComponentDir, fallbackFileName);

        if (fs.existsSync(fallbackSourceFile)) {
          copyFileWithImportFix(fallbackSourceFile, destFile, variantName);
          console.log(`📄 Copied (fallback): ${fallbackFileName} → ${capitalizedName}.tsx`);
        } else {
          console.log(`⚠️  File not found: ${sourceFile} or ${fallbackSourceFile}`);
        }
      }
    }

    // Process types for this component
    processComponentTypes(componentName, variantName, config.coreDir);

    // Create index.ts with all sub-components
    const indexPath = path.join(coreComponentPath, 'index.ts');
    const mainIndexPath = path.join(SOURCE_DIR, componentName, 'index.ts');

    if (fs.existsSync(mainIndexPath)) {
      const mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
      let indexContent = '';

      // Process each export line for the current variant
      const lines = mainIndexContent.split('\n');
      for (const line of lines) {
        if (line.includes('export {') && line.includes('default as')) {
          const match = line.match(/export\s*{\s*default\s+as\s+(\w+)\s*}\s*from\s*['"](.+?)['"]/);
          if (match) {
            const exportName = match[1];
            const importPath = match[2];

            // Skip variant-specific exports for other variants
            if (variantName === 'hybrid' && (exportName.endsWith('Ss') || exportName.endsWith('Tw'))) {
              continue;
            }
            if (variantName === 'stylesheet' && exportName.endsWith('Tw')) {
              continue;
            }
            if (variantName === 'tailwind' && exportName.endsWith('Ss')) {
              continue;
            }

            // Transform the import path and export name for the current variant
            let newImportPath = importPath;
            let newExportName = exportName;

            if (variantName === 'stylesheet' && exportName.endsWith('Ss')) {
              newExportName = exportName.replace('Ss', '');
              newImportPath = importPath.replace('.ss', '');
            } else if (variantName === 'tailwind' && exportName.endsWith('Tw')) {
              newExportName = exportName.replace('Tw', '');
              newImportPath = importPath.replace('.tw', '');
            } else if (variantName === 'hybrid' && !exportName.endsWith('Ss') && !exportName.endsWith('Tw')) {
              // Keep as is for hybrid
            } else {
              continue; // Skip this export for this variant
            }

            indexContent += `export { default as ${newExportName} } from '${newImportPath}';\n`;
          }
        } else if (line.trim() && !line.startsWith('//')) {
          // Copy comments and other lines (including JSDoc comments)
          indexContent += `${line}\n`;
        }
      }

      fs.writeFileSync(indexPath, indexContent);
      console.log(`📝 Created index.ts for ${componentName} (${variantName})`);
    }
  }
}

/**
 * Process standard component (like avatar, box, etc.)
 */
function processStandardComponent(componentName) {
  const componentPath = path.join(SOURCE_DIR, componentName);

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
      const styleFiles = fs.readdirSync(stylesDir);
      let hasFilesToCopy = false;

      // First pass: check if there are any files to copy for this variant
      for (const file of styleFiles) {
        if (variantName === 'tailwind') {
          // Tailwind: only keep .variants files
          if (file.includes('.variants.')) {
            hasFilesToCopy = true;
            break;
          }
        } else if (variantName === 'stylesheet') {
          // Stylesheet: only keep .styles files
          if (file.includes('.styles.')) {
            hasFilesToCopy = true;
            break;
          }
        } else if (variantName === 'hybrid') {
          // Hybrid: keep both .styles and .variants files
          if (file.includes('.styles.') || file.includes('.variants.')) {
            hasFilesToCopy = true;
            break;
          }
        }
      }

      // Only create the directory and copy files if there are files to copy
      if (hasFilesToCopy) {
        const destStylesDir = path.join(coreComponentPath, 'styles');
        ensureDir(destStylesDir);

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
    }

    // Process components directory (handles both files and subdirectories)
    const componentsDir = path.join(componentPath, 'components');
    if (fs.existsSync(componentsDir)) {
      const componentItems = fs.readdirSync(componentsDir);
      const destComponentsDir = path.join(coreComponentPath, 'components');
      ensureDir(destComponentsDir);

      for (const item of componentItems) {
        const sourceItem = path.join(componentsDir, item);
        const itemStat = fs.statSync(sourceItem);

        if (itemStat.isDirectory()) {
          // Handle subdirectories (like FadeInBox, ScaleInBox, etc.)
          const subDirFiles = fs.readdirSync(sourceItem);
          const destSubDir = path.join(destComponentsDir, item);
          ensureDir(destSubDir);

          for (const file of subDirFiles) {
            const sourceFile = path.join(sourceItem, file);

            if (variantName === 'hybrid') {
              // For hybrid, only copy base .tsx files
              if (file.endsWith('.tsx') && !file.includes('.tw.') && !file.includes('.ss.')) {
                const destFile = path.join(destSubDir, file);
                copyFileWithImportFix(sourceFile, destFile, variantName);
              }
            } else if (variantName === 'tailwind') {
              // For tailwind, copy .tw.tsx files and rename them to .tsx
              if (file.endsWith('.tw.tsx')) {
                const destFile = path.join(destSubDir, file.replace('.tw.tsx', '.tsx'));
                copyFileWithImportFix(sourceFile, destFile, variantName);
              } else if (file.endsWith('.tsx') && !file.includes('.tw.') && !file.includes('.ss.')) {
                // Check if .tw.tsx variant exists before using fallback
                const twVariantFile = file.replace('.tsx', '.tw.tsx');
                const twVariantPath = path.join(sourceItem, twVariantFile);
                if (!fs.existsSync(twVariantPath)) {
                  // Fallback: copy base .tsx files if no .tw.tsx variant exists
                  const destFile = path.join(destSubDir, file);
                  copyFileWithImportFix(sourceFile, destFile, variantName);
                }
              }
            } else if (variantName === 'stylesheet') {
              // For stylesheet, copy .ss.tsx files and rename them to .tsx
              if (file.endsWith('.ss.tsx')) {
                const destFile = path.join(destSubDir, file.replace('.ss.tsx', '.tsx'));
                copyFileWithImportFix(sourceFile, destFile, variantName);
              } else if (file.endsWith('.tsx') && !file.includes('.tw.') && !file.includes('.ss.')) {
                // Check if .ss.tsx variant exists before using fallback
                const ssVariantFile = file.replace('.tsx', '.ss.tsx');
                const ssVariantPath = path.join(sourceItem, ssVariantFile);
                if (!fs.existsSync(ssVariantPath)) {
                  // Fallback: copy base .tsx files if no .ss.tsx variant exists
                  const destFile = path.join(destSubDir, file);
                  copyFileWithImportFix(sourceFile, destFile, variantName);
                }
              }
            }
          }
        } else if (itemStat.isFile()) {
          // Handle direct files in components directory (existing behavior)
          if (variantName === 'hybrid') {
            // For hybrid, only copy base .tsx files
            if (item.endsWith('.tsx') && !item.includes('.tw.') && !item.includes('.ss.')) {
              const destFile = path.join(destComponentsDir, item);
              copyFileWithImportFix(sourceItem, destFile, variantName);
            }
          } else if (variantName === 'tailwind') {
            // For tailwind, copy .tw.tsx files and rename them to .tsx
            if (item.endsWith('.tw.tsx')) {
              const destFile = path.join(destComponentsDir, item.replace('.tw.tsx', '.tsx'));
              copyFileWithImportFix(sourceItem, destFile, variantName);
            } else if (item.endsWith('.tsx') && !item.includes('.tw.') && !item.includes('.ss.')) {
              // Check if .tw.tsx variant exists before using fallback
              const twVariantFile = item.replace('.tsx', '.tw.tsx');
              const twVariantPath = path.join(componentsDir, twVariantFile);
              if (!fs.existsSync(twVariantPath)) {
                // Fallback: copy base .tsx files if no .tw.tsx variant exists
                const destFile = path.join(destComponentsDir, item);
                copyFileWithImportFix(sourceItem, destFile, variantName);
              }
            }
          } else if (variantName === 'stylesheet') {
            // For stylesheet, copy .ss.tsx files and rename them to .tsx
            if (item.endsWith('.ss.tsx')) {
              const destFile = path.join(destComponentsDir, item.replace('.ss.tsx', '.tsx'));
              copyFileWithImportFix(sourceItem, destFile, variantName);
            } else if (item.endsWith('.tsx') && !item.includes('.tw.') && !item.includes('.ss.')) {
              // Check if .ss.tsx variant exists before using fallback
              const ssVariantFile = item.replace('.tsx', '.ss.tsx');
              const ssVariantPath = path.join(componentsDir, ssVariantFile);
              if (!fs.existsSync(ssVariantPath)) {
                // Fallback: copy base .tsx files if no .ss.tsx variant exists
                const destFile = path.join(destComponentsDir, item);
                copyFileWithImportFix(sourceItem, destFile, variantName);
              }
            }
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
      const mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
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

  const utilsSourceDir = 'chill-ui-core/src/utils';

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

    // Copy common utils first (shared by all variants)
    const commonDir = path.join(utilsSourceDir, 'common');
    if (fs.existsSync(commonDir)) {
      const commonFiles = fs.readdirSync(commonDir);
      for (const file of commonFiles) {
        const sourcePath = path.join(commonDir, file);
        const destPath = path.join(coreUtilsDir, file);
        copyFileWithImportFix(sourcePath, destPath, variantName);
      }
      console.log(`📄 Copied common utils for ${variantName}`);
    }

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
      // For hybrid, copy utils from hybrid/, tw/, and ss/ directories

      // Copy hybrid utils
      const hybridDir = path.join(utilsSourceDir, 'hybrid');
      if (fs.existsSync(hybridDir)) {
        const hybridFiles = fs.readdirSync(hybridDir);
        for (const file of hybridFiles) {
          const sourcePath = path.join(hybridDir, file);
          const destPath = path.join(coreUtilsDir, file);
          copyFileWithImportFix(sourcePath, destPath, variantName);
        }
      }

      // Copy tw utils
      const twDir = path.join(utilsSourceDir, 'tw');
      if (fs.existsSync(twDir)) {
        const twFiles = fs.readdirSync(twDir);
        for (const file of twFiles) {
          const sourcePath = path.join(twDir, file);
          const destPath = path.join(coreUtilsDir, file);
          copyFileWithImportFix(sourcePath, destPath, variantName);
        }
      }

      // Copy ss utils
      const ssDir = path.join(utilsSourceDir, 'ss');
      if (fs.existsSync(ssDir)) {
        const ssFiles = fs.readdirSync(ssDir);
        for (const file of ssFiles) {
          const sourcePath = path.join(ssDir, file);
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
 * Process shared directories (constants, etc.) for all variants
 */
function processSharedDirectories() {
  console.log('\n🔄 Processing shared directories...');

  const sourceDir = 'chill-ui-core/src';
  const sharedDirs = ['constants'];
  const sharedFiles = ['index.ts', 'index.ss.ts', 'index.tw.ts'];

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreSrcDir = path.join(CORE_DIR, config.coreDir, 'src');

    console.log(`\n📦 Processing shared directories for variant: ${variantName}`);

    for (const sharedDir of sharedDirs) {
      const sourceSharedDir = path.join(sourceDir, sharedDir);
      const destSharedDir = path.join(coreSrcDir, sharedDir);

      if (fs.existsSync(sourceSharedDir)) {
        // Clean destination
        if (fs.existsSync(destSharedDir)) {
          fs.rmSync(destSharedDir, { recursive: true });
          console.log(`🧹 Cleaned: ${destSharedDir}`);
        }

        // Copy directory
        copyDirectory(sourceSharedDir, destSharedDir, variantName);
        console.log(`📁 Copied shared directory: ${sharedDir} for ${variantName}`);
      } else {
        console.log(`⚠️  Shared directory not found: ${sourceSharedDir}`);
      }
    }

    // Copy shared files
    for (const sharedFile of sharedFiles) {
      const sourceFile = path.join(sourceDir, sharedFile);
      const destFile = path.join(coreSrcDir, sharedFile);

      if (fs.existsSync(sourceFile)) {
        copyFileWithImportFix(sourceFile, destFile, variantName);
        console.log(`📄 Copied shared file: ${sharedFile} for ${variantName}`);
      } else {
        console.log(`⚠️  Shared file not found: ${sourceFile}`);
      }
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
 * Create components index file
 */
function createComponentsIndex() {
  console.log('\n🔄 Creating components index files...');

  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const componentsPath = path.join(CORE_DIR, config.coreDir, 'src', 'components');
    const componentsIndexPath = path.join(componentsPath, 'index.ts');

    if (!fs.existsSync(componentsPath)) continue;

    const components = fs.readdirSync(componentsPath).filter(item => {
      const itemPath = path.join(componentsPath, item);
      return fs.statSync(itemPath).isDirectory();
    });

    // Sort components alphabetically for consistent output
    components.sort();

    let indexContent = '';
    for (const component of components) {
      indexContent += `export * from './${component}';\n`;
    }

    if (indexContent) {
      fs.writeFileSync(componentsIndexPath, indexContent);
      console.log(`📄 Created components index: ${componentsIndexPath}`);
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

    // Export all components from components/index.ts
    const componentsIndexPath = path.join(coreSrcPath, 'components', 'index.ts');
    if (fs.existsSync(componentsIndexPath)) {
      indexContent += `export * from './components';\n`;
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
 * Generate configuration files for a variant
 */
function generateConfigFiles(variantName, config) {
  console.log(`🔧 Generating config files for ${variantName}...`);

  const coreDir = path.join(CORE_DIR, config.coreDir);

  // Generate tsconfig.json from template
  const tsconfigTemplate = fs.readFileSync('scripts/templates/tsconfig.template.json', 'utf8');
  const tsconfigPath = path.join(coreDir, 'tsconfig.json');
  fs.writeFileSync(tsconfigPath, tsconfigTemplate);
  console.log(`📄 Generated: ${tsconfigPath}`);

  // Generate bob.config.js
  const bobTemplate = fs.readFileSync('scripts/templates/bob.config.template.js', 'utf8');
  const bobConfig = bobTemplate.replace('{{CORE_NAME}}', config.coreDir);
  const bobPath = path.join(coreDir, 'bob.config.js');
  fs.writeFileSync(bobPath, bobConfig);
  console.log(`📄 Generated: ${bobPath}`);

  // Generate package.json
  const packageTemplatePath = `scripts/templates/package.${variantName}.template.json`;
  const packageTemplate = fs.readFileSync(packageTemplatePath, 'utf8');

  const packagePath = path.join(coreDir, 'package.json');
  fs.writeFileSync(packagePath, packageTemplate);
  console.log(`📄 Generated: ${packagePath}`);

  // Copy nativewind-env.d.ts for tailwind variant
  if (variantName === 'tailwind') {
    const sourceNativewindEnv = path.join('chill-ui-core', 'nativewind-env.d.ts');
    const destNativewindEnv = path.join(coreDir, 'nativewind-env.d.ts');

    if (fs.existsSync(sourceNativewindEnv)) {
      fs.copyFileSync(sourceNativewindEnv, destNativewindEnv);
      console.log(`📄 Copied: ${sourceNativewindEnv} → ${destNativewindEnv}`);
    } else {
      console.log(`⚠️  Source file not found: ${sourceNativewindEnv}`);
    }
  }
}

/**
 * Initialize core directories if they don't exist
 */
function initializeCoreDirectories() {
  console.log('🔄 Initializing core directories...');

  // Create main core directory
  ensureDir(CORE_DIR);

  // Create each variant directory with basic structure
  for (const [variantName, config] of Object.entries(VARIANTS)) {
    const coreDir = path.join(CORE_DIR, config.coreDir);
    const srcDir = path.join(coreDir, 'src');
    const componentsDir = path.join(srcDir, 'components');
    const typesDir = path.join(srcDir, 'types');
    const utilsDir = path.join(srcDir, 'utils');

    ensureDir(coreDir);
    ensureDir(srcDir);
    ensureDir(componentsDir);
    ensureDir(typesDir);
    ensureDir(utilsDir);

    // Generate configuration files
    generateConfigFiles(variantName, config);

    console.log(`📁 Initialized ${config.coreDir} structure`);
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  // Initialize core directories first
  initializeCoreDirectories();

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

  processSharedDirectories();
  createTypesIndexes();
  createComponentsIndex();
  updateCoreIndexes();

  // Convert aliases to relative paths
  console.log('\n🔄 Converting aliases to relative paths...');
  const { execSync } = require('child_process');
  try {
    execSync('node scripts/convert-aliases-to-relative.js', { stdio: 'inherit' });
    console.log('✅ Aliases converted successfully!');
  } catch (error) {
    console.error('❌ Error converting aliases:', error.message);
  }

  console.log('\n✅ Component separation completed!');
}

// Run the script
main();
