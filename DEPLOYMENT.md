# Netlify Deployment Guide for Deuterium Intelligence

## 🚀 Quick Deploy to Netlify

### Method 1: GitHub Integration (Recommended)

1. **Go to Netlify Dashboard**
   - Visit [https://netlify.com](https://netlify.com)
   - Sign in or create an account

2. **Connect Repository**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub account
   - Select the `Deuterium` repository

3. **Configure Build Settings**
   ```
   Build command: npm install --legacy-peer-deps && npm run build
   Publish directory: .next
   ```

4. **Set Environment Variables**
   - Go to Site settings > Environment variables
   - Add these variables:
     ```
     NODE_VERSION=18
     NPM_FLAGS=--legacy-peer-deps
     NEXT_PRIVATE_STANDALONE=true
     ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (usually 3-5 minutes)

### Method 2: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## 🔧 Build Configuration

The project includes these Netlify-optimized files:

### netlify.toml
- Build command with legacy peer deps
- Node.js 18 environment
- Next.js plugin configuration
- Security headers
- Caching rules

### public/_headers
- Security headers (XSS protection, frame options)
- Cache control for static assets
- Performance optimizations

### public/_redirects
- Client-side routing support
- 404 fallback handling
- API route redirects

### .npmrc
- Legacy peer deps configuration
- Auto peer dependency installation

## 🐛 Troubleshooting

### Build Fails with Dependency Errors
1. Check that Node version is set to 18
2. Ensure `--legacy-peer-deps` flag is in build command
3. Clear build cache in Netlify dashboard

### Images Not Loading
1. Verify images are in `public/` directory
2. Check image paths are relative (start with `/`)
3. Ensure `unoptimized: false` in next.config.ts

### 404 Errors on Page Refresh
1. Verify `_redirects` file is in `public/` directory
2. Check that redirects are properly configured
3. Ensure client-side routing is working

### Build Takes Too Long
1. Check for large dependencies
2. Consider using build cache
3. Optimize images before deployment

## 📊 Performance Optimization

### Automatic Optimizations
- ✅ Image optimization via Next.js
- ✅ Code splitting and tree shaking
- ✅ Static asset caching
- ✅ Gzip compression
- ✅ CDN distribution

### Manual Optimizations
- Optimize images before upload
- Use WebP format when possible
- Minimize bundle size
- Enable service worker (if needed)

## 🔒 Security Features

### Headers Applied
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()

### Best Practices
- Environment variables for sensitive data
- HTTPS enforced by default
- Content Security Policy ready
- No sensitive data in client bundle

## 🌐 Custom Domain Setup

1. **Add Domain in Netlify**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**
   - Point your domain to Netlify's servers
   - Use Netlify DNS or configure CNAME records

3. **SSL Certificate**
   - Netlify automatically provisions SSL certificates
   - HTTPS will be enforced

## 📈 Monitoring & Analytics

### Built-in Features
- Build logs and error tracking
- Performance monitoring
- Bandwidth usage
- Deploy previews for pull requests

### Optional Integrations
- Google Analytics
- Sentry for error tracking
- Lighthouse CI for performance
- Custom analytics solutions

## 🔄 Continuous Deployment

### Automatic Deploys
- Pushes to `main` branch trigger deploys
- Pull requests create deploy previews
- Build status updates in GitHub

### Manual Control
- Pause auto-publishing if needed
- Deploy specific branches
- Rollback to previous deploys

Your Deuterium Intelligence website is now ready for production deployment on Netlify! 🎉
