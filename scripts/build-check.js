#!/usr/bin/env node

/**
 * Build verification script for Netlify deployment
 * This script checks for common issues that cause build failures
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running pre-build checks...\n');

// Check if required files exist
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/page.tsx'
];

let hasErrors = false;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    hasErrors = true;
  }
});

// Check package.json for required dependencies
console.log('\n📦 Checking dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss', '@tailwindcss/postcss', 'postcss'];
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep}: ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ Missing dependency: ${dep}`);
      hasErrors = true;
    }
  });
  
  // Check for build script
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log(`✅ Build script: ${packageJson.scripts.build}`);
  } else {
    console.log('❌ Missing build script');
    hasErrors = true;
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
  hasErrors = true;
}

// Check TypeScript configuration
console.log('\n🔧 Checking TypeScript config...');
try {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  if (tsconfig.compilerOptions) {
    console.log('✅ TypeScript configuration found');
    if (tsconfig.compilerOptions.paths && tsconfig.compilerOptions.paths['@/*']) {
      console.log('✅ Path mapping configured for @/*');
    } else {
      console.log('⚠️ Path mapping for @/* not found');
    }
  }
} catch (error) {
  console.log('❌ Error reading tsconfig.json:', error.message);
  hasErrors = true;
}

// Check specific component files
console.log('\n📦 Checking required components...');
const requiredComponents = [
  'src/components/ErrorReporter.tsx',
  'src/components/blocks/heros/deuterium-hero-with-animation.tsx',
  'src/components/blocks/feature-sections/deuterium-about-timeline.tsx',
  'src/components/blocks/feature-sections/deuterium-technologies.tsx',
  'src/components/blocks/cards/deuterium-bot-cards.tsx',
  'src/components/blocks/feature-sections/deuterium-labs-research.tsx',
  'src/components/blocks/ctas/deuterium-careers-board.tsx',
  'src/components/blocks/contact-forms/deuterium-holographic-contact.tsx',
  'src/components/blocks/footers/deuterium-minimal-footer.tsx'
];

requiredComponents.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ ${component}`);
  } else {
    console.log(`❌ Missing component: ${component}`);
    hasErrors = true;
  }
});

// Check Next.js configuration
console.log('\n⚙️ Checking Next.js config...');
if (fs.existsSync('next.config.ts') || fs.existsSync('next.config.js')) {
  console.log('✅ Next.js configuration found');
} else {
  console.log('⚠️ No Next.js configuration found (optional)');
}

// Check PostCSS configuration
console.log('\n🎨 Checking PostCSS/Tailwind config...');
if (fs.existsSync('postcss.config.mjs') || fs.existsSync('postcss.config.js')) {
  console.log('✅ PostCSS configuration found');
} else {
  console.log('❌ PostCSS configuration missing');
  hasErrors = true;
}

if (fs.existsSync('src/app/globals.css')) {
  const globalsCss = fs.readFileSync('src/app/globals.css', 'utf8');
  if (globalsCss.includes('@import \'tailwindcss\'') || globalsCss.includes('@tailwind')) {
    console.log('✅ Tailwind CSS imports found in globals.css');
  } else {
    console.log('⚠️ Tailwind CSS imports not found in globals.css');
  }
} else {
  console.log('❌ globals.css not found');
  hasErrors = true;
}

// Summary
console.log('\n📊 Build Check Summary:');
if (hasErrors) {
  console.log('❌ Build check failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ All checks passed! Ready for build.');
  process.exit(0);
}
