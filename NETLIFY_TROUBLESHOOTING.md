# Netlify Build Troubleshooting Guide

## 🚨 Common Build Errors & Solutions

### 1. Dependency Resolution Errors

**Error**: `ERESOLVE unable to resolve dependency tree`

**Solution**:
```bash
# In Netlify build settings, use:
Build command: npm install --legacy-peer-deps && npm run build
```

**Files Updated**:
- `.npmrc` - Added legacy-peer-deps configuration
- `package.json` - Added overrides for React 19 compatibility

### 2. Node.js Version Issues

**Error**: `Node.js version not supported`

**Solution**:
- Set Node.js version to 18 in `netlify.toml`
- Ensure build environment uses correct version

**Configuration**:
```toml
[build.environment]
  NODE_VERSION = "18"
```

### 3. TypeScript Build Errors

**Error**: `Type errors during build`

**Solution**:
- Check `tsconfig.json` configuration
- Verify all imports are correct
- Use build check script: `npm run build:check`

### 4. Next.js Configuration Issues

**Error**: `Invalid Next.js configuration`

**Solution**:
- Simplified `next.config.ts`
- Removed problematic experimental features
- Added ESLint ignore for builds

### 5. Memory/Timeout Issues

**Error**: `Build timeout or out of memory`

**Solution**:
```toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

## 🔧 Build Configuration Files

### netlify.toml
```toml
[build]
  publish = ".next"
  command = "npm install --legacy-peer-deps && npm run build"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--legacy-peer-deps"
  NEXT_TELEMETRY_DISABLED = "1"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### .npmrc
```
legacy-peer-deps=true
auto-install-peers=true
fund=false
audit=false
progress=false
```

### package.json (scripts)
```json
{
  "scripts": {
    "build": "next build",
    "build:check": "node scripts/build-check.js",
    "prebuild": "npm run build:check"
  }
}
```

## 🐛 Debugging Steps

### 1. Local Build Test
```bash
# Test locally first
npm install --legacy-peer-deps
npm run build
```

### 2. Check Build Logs
- Go to Netlify dashboard
- Click on failed deploy
- Review build logs for specific errors

### 3. Environment Variables
Ensure these are set in Netlify:
- `NODE_VERSION=18`
- `NPM_FLAGS=--legacy-peer-deps`
- `NEXT_TELEMETRY_DISABLED=1`

### 4. Clear Build Cache
- In Netlify dashboard: Site settings > Build & deploy > Clear cache

## 🔍 Build Check Script

Run before deployment:
```bash
npm run build:check
```

This script verifies:
- Required files exist
- Dependencies are installed
- TypeScript configuration is valid
- Build scripts are present

## 📊 Performance Optimization

### Reduce Bundle Size
- Check for large dependencies
- Use dynamic imports for heavy components
- Optimize images before deployment

### Build Speed
- Use `npm ci` instead of `npm install` (when package-lock.json is stable)
- Enable build caching
- Minimize build steps

## 🚀 Alternative Deployment Methods

### Method 1: Manual Deploy
```bash
npm run build
npx netlify deploy --prod --dir=.next
```

### Method 2: GitHub Actions
Create `.github/workflows/deploy.yml` for custom build process

### Method 3: Vercel (Alternative)
If Netlify continues to fail, consider Vercel deployment:
```bash
npx vercel
```

## 📞 Getting Help

### Check Build Logs
1. Netlify Dashboard > Site > Deploys
2. Click on failed deploy
3. Scroll to build logs
4. Look for specific error messages

### Common Error Patterns
- `Module not found` → Check imports and file paths
- `Type error` → Check TypeScript configuration
- `Command failed` → Check build scripts
- `Out of memory` → Increase memory limit

### Support Resources
- Netlify Community Forum
- Next.js Documentation
- GitHub Issues for specific packages

## ✅ Success Checklist

Before deploying:
- [ ] Local build works: `npm run build`
- [ ] All dependencies installed: `npm install --legacy-peer-deps`
- [ ] TypeScript compiles without errors
- [ ] No missing imports or files
- [ ] Build check passes: `npm run build:check`
- [ ] Netlify configuration is correct
- [ ] Environment variables are set

Your Deuterium Intelligence website should now build successfully on Netlify! 🎉
