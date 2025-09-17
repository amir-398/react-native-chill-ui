#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script pour convertir les alias TypeScript en chemins relatifs
 * dans les fichiers générés des libs core-stylesheet, core-hybrid et core-tailwind
 */

// Configuration des alias basée sur les tsconfig.json
const ALIAS_CONFIG = {
  '@types': './src/types',
  '@utils': './src/utils',
};

// Configuration des alias avec wildcards
const WILDCARD_ALIAS_CONFIG = {
  '@components/*': './src/components/*',
};

// Extensions de fichiers à traiter
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.js.map', '.d.ts'];

/**
 * Calcule le chemin relatif entre deux fichiers
 */
function getRelativePath(fromFile, toPath) {
  const fromDir = path.dirname(fromFile);
  const relativePath = path.relative(fromDir, toPath);

  // S'assurer que le chemin commence par ./
  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

/**
 * Remplace les alias par des chemins relatifs dans le contenu d'un fichier
 */
function replaceAliasesInContent(content, filePath, baseDir) {
  let modifiedContent = content;

  // Remplacer chaque alias exact
  for (const [alias, aliasPath] of Object.entries(ALIAS_CONFIG)) {
    const fullAliasPath = path.resolve(baseDir, aliasPath);
    const relativePath = getRelativePath(filePath, fullAliasPath);

    // Pattern pour matcher les imports avec l'alias
    const aliasPattern = new RegExp(`(['"\`])${alias.replace('@', '\\@')}(['"\`])`, 'g');

    modifiedContent = modifiedContent.replace(aliasPattern, `$1${relativePath}$2`);
  }

  // Remplacer chaque alias avec wildcard
  for (const [alias, aliasPath] of Object.entries(WILDCARD_ALIAS_CONFIG)) {
    // Pattern pour matcher les imports avec l'alias wildcard (ex: @components/animatedBox)
    const escapedAlias = alias.replace('@', '\\@').replace('*', '([^"\'`]+)');
    const aliasPattern = new RegExp(`(['"\`])${escapedAlias}(['"\`])`, 'g');

    modifiedContent = modifiedContent.replace(aliasPattern, (match, quote1, subPath, quote2) => {
      // Construire le chemin complet en remplaçant le * par le sous-chemin
      const fullAliasPath = path.resolve(baseDir, aliasPath.replace('*', subPath));
      const relativePath = getRelativePath(filePath, fullAliasPath);
      return `${quote1}${relativePath}${quote2}`;
    });
  }

  return modifiedContent;
}

/**
 * Traite un fichier individuel
 */
function processFile(filePath, baseDir) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const modifiedContent = replaceAliasesInContent(content, filePath, baseDir);

    if (content !== modifiedContent) {
      fs.writeFileSync(filePath, modifiedContent, 'utf8');
      console.log(`✓ Converti: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`✗ Erreur lors du traitement de ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Parcourt récursivement un répertoire et traite tous les fichiers
 */
function processDirectory(dirPath, baseDir) {
  let processedCount = 0;

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Ignorer node_modules et autres dossiers non pertinents
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
    console.error(`✗ Erreur lors du parcours de ${dirPath}:`, error.message);
  }

  return processedCount;
}

/**
 * Fonction principale
 */
function main() {
  const generatedDir = path.join(__dirname, '..', 'generated');

  if (!fs.existsSync(generatedDir)) {
    console.error('✗ Le dossier "generated" n\'existe pas');
    process.exit(1);
  }

  console.log('🔄 Conversion des alias en chemins relatifs...\n');

  const libs = ['core-stylesheet', 'core-hybrid', 'core-tailwind'];
  let totalProcessed = 0;

  for (const lib of libs) {
    const libPath = path.join(generatedDir, lib);

    if (!fs.existsSync(libPath)) {
      console.log(`⚠️  Lib ${lib} non trouvée, ignorée`);
      continue;
    }

    console.log(`📁 Traitement de ${lib}...`);

    // Traiter le dossier src
    const srcPath = path.join(libPath, 'src');
    if (fs.existsSync(srcPath)) {
      const processed = processDirectory(srcPath, libPath);
      totalProcessed += processed;
      console.log(`   ${processed} fichier(s) modifié(s) dans src/\n`);
    }

    // Traiter le dossier lib s'il existe
    const libBuildPath = path.join(libPath, 'lib');
    if (fs.existsSync(libBuildPath)) {
      const processed = processDirectory(libBuildPath, libPath);
      totalProcessed += processed;
      console.log(`   ${processed} fichier(s) modifié(s) dans lib/\n`);
    }
  }

  console.log(`✅ Conversion terminée ! ${totalProcessed} fichier(s) modifié(s) au total.`);
}

// Exécuter le script si appelé directement
if (require.main === module) {
  main();
}

module.exports = {
  main,
  processDirectory,
  processFile,
  replaceAliasesInContent,
};
