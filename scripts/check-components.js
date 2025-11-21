#!/usr/bin/env node
/* eslint-disable */
const fs = require('fs');
const path = require('path');

// Configuration
const COMPONENTS_DIR = 'packages/chill-ui-core/src/components';
const STORIES_DIR = 'packages/chill-ui-core/stories';

// Components to skip story check
const SKIP_STORY_CHECK = ['loadingIndicatorsKit'];

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}${message}${colors.reset}`);
  log('='.repeat(message.length + 2));
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

/**
 * Get all component directories
 */
function getComponentDirectories() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    logError(`Components directory not found: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  return fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !name.startsWith('.')); // Exclude hidden directories
}

/**
 * Check if component has README
 */
function checkComponentReadme(componentName) {
  const readmePath = path.join(COMPONENTS_DIR, componentName, 'README.md');

  if (!fs.existsSync(readmePath)) {
    return {
      hasReadme: false,
      issues: [`Missing README.md`],
    };
  }

  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const issues = [];

  // Check for required sections (flexible matching)
  const usagePatterns = ['## Usage', '## Quick Start', '## Getting Started', '## Basic Usage'];
  const propsPatterns = ['## Props', '## API Reference', '## Properties'];

  const hasUsage = usagePatterns.some(pattern => readmeContent.includes(pattern));
  const hasProps = propsPatterns.some(pattern => readmeContent.includes(pattern));

  if (!hasUsage) {
    issues.push(`Missing usage section (looking for: ${usagePatterns.join(', ')})`);
  }

  if (!hasProps) {
    issues.push(`Missing props section (looking for: ${propsPatterns.join(', ')})`);
  }

  // Check for examples section (recommended)
  const examplesPatterns = ['## Examples', '## Usage Examples'];
  const hasExamples = examplesPatterns.some(pattern => readmeContent.includes(pattern));
  if (!hasExamples) {
    issues.push(`Missing section: ## Examples or ## Usage Examples (recommended)`);
  }

  return {
    hasReadme: true,
    issues: issues,
    content: readmeContent,
  };
}

/**
 * Check if component has Storybook story
 */
function checkComponentStory(componentName) {
  // Skip story check for certain components
  if (SKIP_STORY_CHECK.includes(componentName)) {
    return {
      hasStory: true,
      issues: [],
    };
  }

  // Check for direct story file (exact match)
  let storyPath = path.join(STORIES_DIR, `${componentName}.stories.tsx`);

  const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  // If not found, check for PascalCase version (e.g. Accordion.stories.tsx)
  if (!fs.existsSync(storyPath)) {
    storyPath = path.join(STORIES_DIR, `${capitalizedName}.stories.tsx`);
  }

  // If not found, check in subdirectory (e.g., Box/Box.stories.tsx)
  if (!fs.existsSync(storyPath)) {
    storyPath = path.join(STORIES_DIR, capitalizedName, `${capitalizedName}.stories.tsx`);
  }

  if (!fs.existsSync(storyPath)) {
    return {
      hasStory: false,
      issues: [`Missing story file: ${componentName}.stories.tsx or ${componentName}/${componentName}.stories.tsx`],
    };
  }

  const storyContent = fs.readFileSync(storyPath, 'utf8');
  const issues = [];

  // Check for basic story structure
  if (!storyContent.includes('export default')) {
    issues.push(`Missing default export`);
  }

  if (!storyContent.includes('export const')) {
    issues.push(`Missing story exports`);
  }

  // Check for meta configuration
  if (!storyContent.includes('title:')) {
    issues.push(`Missing story title`);
  }

  return {
    hasStory: true,
    issues: issues,
    content: storyContent,
  };
}

/**
 * Check component structure
 */
function checkComponentStructure(componentName) {
  const componentDir = path.join(COMPONENTS_DIR, componentName);
  const issues = [];

  // Check for index.ts
  const indexPath = path.join(componentDir, 'index.ts');
  if (!fs.existsSync(indexPath)) {
    issues.push(`Missing index.ts`);
  }

  // Check for main component file (look in components/ subdirectory)
  const componentsSubDir = path.join(componentDir, 'components');
  let componentFiles = [];

  if (fs.existsSync(componentsSubDir)) {
    const capitalizedName = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    const suffixes = ['', '.ss', '.tw', '.hybrid']; // Support for stylesheet, tailwind, hybrid variants

    // First, try to find component directly in components/ directory (e.g., components/Avatar.tsx or Avatar.ss.tsx)
    for (const suffix of suffixes) {
      // Check PascalCase (e.g. ButtonIcon.tsx)
      let directComponentFile = path.join(componentsSubDir, `${capitalizedName}${suffix}.tsx`);
      if (fs.existsSync(directComponentFile)) {
        componentFiles = [`${capitalizedName}${suffix}.tsx`];
        break;
      }
      
      // Check camelCase/lowercase (e.g. buttonIcon.tsx) - matching directory name
      directComponentFile = path.join(componentsSubDir, `${componentName}${suffix}.tsx`);
      if (fs.existsSync(directComponentFile)) {
        componentFiles = [`${componentName}${suffix}.tsx`];
        break;
      }
    }

    if (componentFiles.length === 0) {
      // Second, try to find component with same name as parent directory in subdirectory (e.g., components/animatedBox/AnimatedBox.tsx)
      const mainComponentDir = path.join(componentsSubDir, componentName);
      for (const suffix of suffixes) {
        // Check PascalCase
        let mainComponentFile = path.join(mainComponentDir, `${capitalizedName}${suffix}.tsx`);
        if (fs.existsSync(mainComponentFile)) {
          componentFiles = [`${capitalizedName}${suffix}.tsx`];
          break;
        }
        
        // Check camelCase/lowercase
        mainComponentFile = path.join(mainComponentDir, `${componentName}${suffix}.tsx`);
        if (fs.existsSync(mainComponentFile)) {
          componentFiles = [`${componentName}${suffix}.tsx`];
          break;
        }
      }
    }

    if (componentFiles.length === 0) {
      // Fallback: look for any .tsx files in components/ subdirectories
      const subDirs = fs
        .readdirSync(componentsSubDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const subDir of subDirs) {
        const subDirPath = path.join(componentsSubDir, subDir);
        const files = fs
          .readdirSync(subDirPath)
          .filter(file => file.endsWith('.tsx') && !file.includes('.stories') && !file.includes('.test'));
        componentFiles.push(...files);
      }
    }
  } else {
    // Fallback: check in main directory
    componentFiles = fs
      .readdirSync(componentDir)
      .filter(file => file.endsWith('.tsx') && !file.includes('.stories') && !file.includes('.test'));
  }

  if (componentFiles.length === 0) {
    issues.push(`No main component file found`);
  }

  return {
    issues: issues,
  };
}

/**
 * Main check function
 */
function checkComponents() {
  logHeader('🔍 Checking Components Documentation & Stories');

  const components = getComponentDirectories();
  log(`Found ${components.length} components to check\n`);

  let totalIssues = 0;
  let componentsWithIssues = 0;
  const results = [];

  components.forEach(componentName => {
    log(`\n${colors.bold}📦 ${componentName}${colors.reset}`);

    const readmeCheck = checkComponentReadme(componentName);
    const storyCheck = checkComponentStory(componentName);
    const structureCheck = checkComponentStructure(componentName);

    const allIssues = [...readmeCheck.issues, ...storyCheck.issues, ...structureCheck.issues];

    if (allIssues.length === 0) {
      logSuccess('All checks passed');
    } else {
      componentsWithIssues++;
      totalIssues += allIssues.length;

      allIssues.forEach(issue => {
        logWarning(issue);
      });
    }

    results.push({
      component: componentName,
      readme: readmeCheck,
      story: storyCheck,
      structure: structureCheck,
      totalIssues: allIssues.length,
    });
  });

  // Summary
  logHeader('📊 Summary');
  log(`Total components: ${components.length}`);
  log(`Components with issues: ${componentsWithIssues}`, componentsWithIssues > 0 ? 'yellow' : 'green');
  log(`Total issues found: ${totalIssues}`, totalIssues > 0 ? 'yellow' : 'green');

  if (totalIssues === 0) {
    logSuccess('🎉 All components are properly documented and have stories!');
  } else {
    logError(`\n❌ Found ${totalIssues} issues across ${componentsWithIssues} components`);

    // Show components with most issues
    const sortedResults = results.filter(r => r.totalIssues > 0).sort((a, b) => b.totalIssues - a.totalIssues);

    if (sortedResults.length > 0) {
      logHeader('🔧 Components needing attention');
      sortedResults.forEach(result => {
        log(`${result.component}: ${result.totalIssues} issues`, 'yellow');
      });
    }
  }

  return totalIssues === 0;
}

/**
 * Generate report
 */
function generateReport() {
  const components = getComponentDirectories();
  const report = {
    timestamp: new Date().toISOString(),
    totalComponents: components.length,
    components: [],
  };

  components.forEach(componentName => {
    const readmeCheck = checkComponentReadme(componentName);
    const storyCheck = checkComponentStory(componentName);
    const structureCheck = checkComponentStructure(componentName);

    report.components.push({
      name: componentName,
      readme: {
        exists: readmeCheck.hasReadme,
        issues: readmeCheck.issues,
      },
      story: {
        exists: storyCheck.hasStory,
        issues: storyCheck.issues,
      },
      structure: {
        issues: structureCheck.issues,
      },
    });
  });

  const reportPath = 'component-check-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Report saved to: ${reportPath}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    log('Usage: node scripts/check-components.js [options]');
    log('Options:');
    log('  --report    Generate JSON report');
    log('  --help, -h  Show this help');
    return;
  }

  const success = checkComponents();

  if (args.includes('--report')) {
    generateReport();
  }

  // Exit with error code if issues found
  if (!success) {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkComponents,
  getComponentDirectories,
  checkComponentReadme,
  checkComponentStory,
};
