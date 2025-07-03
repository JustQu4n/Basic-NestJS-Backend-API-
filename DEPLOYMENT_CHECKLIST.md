# 📋 Checklist Deploy NestJS lên Render

## Pre-deployment Checklist

### ✅ Code Preparation
- [ ] Tất cả features đã được test local
- [ ] Code đã được commit và push lên GitHub
- [ ] Environment variables đã được chuẩn bị
- [ ] Health check endpoint hoạt động
- [ ] CORS được cấu hình đúng

### ✅ Files Required
- [ ] `package.json` - có scripts build và start:prod
- [ ] `Dockerfile` - container configuration
- [ ] `.dockerignore` - optimize build size
- [ ] `render.yaml` - Render configuration
- [ ] `.env.example` - environment template

### ✅ Database Setup
- [ ] MongoDB Atlas cluster được tạo
- [ ] Database user được tạo với quyền đọc/ghi
- [ ] IP whitelist: 0.0.0.0/0 (cho Render)
- [ ] Connection string đã được test

## Deploy Process

### 1. Test Local Build
```bash
npm run deploy:check
```

### 2. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 3. Create Render Service
- [ ] Tạo Web Service từ GitHub repo
- [ ] Chọn Node environment
- [ ] Set build command: `npm install && npm run build`
- [ ] Set start command: `npm run start:prod`

### 4. Configure Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com
```

### 5. Monitor Deployment
- [ ] Build logs không có error
- [ ] Deploy logs thành công
- [ ] Health check endpoint respond
- [ ] Test main API endpoints

## Post-deployment Checklist

### ✅ Verification
- [ ] `GET /health` returns 200
- [ ] `POST /auth/register` works
- [ ] `POST /auth/login` works
- [ ] `GET /users` works (with auth)
- [ ] Database connection stable
- [ ] Frontend có thể call API

### ✅ Performance
- [ ] Response time < 1000ms
- [ ] Memory usage reasonable
- [ ] No memory leaks
- [ ] Error monitoring setup

### ✅ Security
- [ ] JWT secret is strong
- [ ] CORS properly configured
- [ ] Environment variables secured
- [ ] Database access restricted

### ✅ Monitoring
- [ ] Render metrics dashboard
- [ ] Database monitoring
- [ ] Error logging
- [ ] Uptime monitoring

## Common Issues & Solutions

### Build Fails
- Check package.json dependencies
- Verify Node.js version compatibility
- Check TypeScript compilation errors

### App Crashes
- Verify environment variables
- Check database connection
- Review startup logs

### CORS Errors
- Update CORS_ORIGIN with correct domain
- Verify frontend URL configuration
- Check preflight request handling

### Database Connection
- Verify MongoDB URI format
- Check IP whitelist settings
- Test connection string locally

## Quick Commands

```bash
# Test build locally
npm run build

# Check environment
npm run start:prod

# Test health endpoint
curl http://localhost:3000/health

# Test deployed API
curl https://your-app.onrender.com/health
```

## Support Resources

- [Render Documentation](https://render.com/docs)
- [NestJS Deployment Guide](https://docs.nestjs.com/deployment)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

---

**Last Updated**: January 2025
**Status**: ✅ Ready for Production
