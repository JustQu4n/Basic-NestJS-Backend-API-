# 🚀 Hướng dẫn Deploy NestJS lên Render

## 📋 Mục lục
1. [Chuẩn bị deploy](#chuẩn-bị-deploy)
2. [Tạo tài khoản Render](#tạo-tài-khoản-render)
3. [Deploy từ GitHub](#deploy-từ-github)
4. [Cấu hình Environment Variables](#cấu-hình-environment-variables)
5. [Cấu hình Database](#cấu-hình-database)
6. [Kiểm tra và troubleshooting](#kiểm-tra-và-troubleshooting)
7. [Custom Domain](#custom-domain)

## 🛠️ Chuẩn bị deploy

### 1. Đảm bảo dự án hoạt động local
```bash
# Test dự án local
npm install
npm run build
npm run start:prod

# Kiểm tra API hoạt động
curl http://localhost:3000
```

### 2. Chuẩn bị GitHub Repository
```bash
# Commit tất cả thay đổi
git add .
git commit -m "Prepare for deployment"

# Push lên GitHub
git push origin main
```

### 3. Kiểm tra files cần thiết đã có:
- ✅ `package.json` - Script build và start
- ✅ `Dockerfile` - Container configuration
- ✅ `.dockerignore` - Optimize build
- ✅ `render.yaml` - Render configuration
- ✅ `.env.example` - Environment template

## 🔐 Tạo tài khoản Render

1. Truy cập [render.com](https://render.com)
2. Đăng ký bằng GitHub account
3. Authorize Render truy cập repositories

## 🚀 Deploy từ GitHub

### Bước 1: Tạo Web Service
1. Click **"New +"** → **"Web Service"**
2. Chọn repository của bạn
3. Cấu hình deployment:

```yaml
Name: nestjs-api-project
Environment: Node
Region: Singapore (gần Việt Nam nhất)
Branch: main
Build Command: npm install && npm run build
Start Command: npm run start:prod
```

### Bước 2: Cấu hình Plan
- **Free Plan**: 0.1 CPU, 512MB RAM
- **Paid Plan**: Tốt hơn cho production

## ⚙️ Cấu hình Environment Variables

Trong Render Dashboard, thêm các biến môi trường:

### Database Configuration
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database
```

### JWT Configuration
```env
JWT_SECRET=your-super-secret-production-jwt-key
JWT_EXPIRES_IN=1d
```

### Server Configuration
```env
NODE_ENV=production
PORT=3000
```

### CORS Configuration
```env
FRONTEND_URL=https://your-frontend-domain.com
CORS_ORIGIN=https://your-frontend-domain.com,https://your-admin-panel.com
```

**Lưu ý:** Render sẽ tự động inject `PORT` environment variable, nhưng bạn nên set để đảm bảo.

## 🗄️ Cấu hình Database

### Option 1: MongoDB Atlas (Khuyến nghị)
1. Tạo cluster tại [MongoDB Atlas](https://cloud.mongodb.com)
2. Whitelist IP `0.0.0.0/0` (cho Render)
3. Tạo database user
4. Copy connection string vào `MONGODB_URI`

### Option 2: Render PostgreSQL
```yaml
# Thêm vào render.yaml
- type: pserv
  name: nestjs-db
  env: postgresql
  plan: free
  databaseName: nestjs_db
  databaseUser: nestjs_user
```

## 🔍 Kiểm tra và Troubleshooting

### Kiểm tra deployment
1. **Build Logs**: Xem quá trình build có lỗi không
2. **Deploy Logs**: Kiểm tra startup logs
3. **Health Check**: Test API endpoint

### Logs thường gặp
```bash
# Check deployment status
curl https://your-app.onrender.com/health

# Check API response
curl https://your-app.onrender.com/auth/login
```

### Lỗi thường gặp

#### 1. Build Failed
```
Error: Cannot find module '@nestjs/core'
```
**Giải pháp:**
- Đảm bảo `package.json` có đầy đủ dependencies
- Không có `node_modules` trong `.gitignore`

#### 2. App crashes on startup
```
Error: Cannot connect to database
```
**Giải pháp:**
- Kiểm tra `MONGODB_URI` đúng format
- Whitelist IP 0.0.0.0/0 trong MongoDB Atlas

#### 3. CORS errors
```
Access to XMLHttpRequest blocked by CORS
```
**Giải pháp:**
- Cập nhật `CORS_ORIGIN` với domain frontend
- Đảm bảo `main.ts` cấu hình CORS đúng

## 🌐 Custom Domain

### Bước 1: Thêm Custom Domain
1. Trong Render Dashboard → Settings → Custom Domains
2. Thêm domain của bạn: `api.yourdomain.com`

### Bước 2: Cấu hình DNS
Tại domain provider (Namecheap, GoDaddy, etc):
```
Type: CNAME
Name: api
Value: your-app.onrender.com
```

### Bước 3: SSL Certificate
Render tự động tạo SSL certificate cho custom domain.

## 📊 Monitoring và Scaling

### Metrics
- **CPU Usage**: Monitor trong dashboard
- **Memory Usage**: Free plan có 512MB
- **Response Time**: Kiểm tra performance

### Auto-scaling
```yaml
# Trong render.yaml (chỉ với paid plan)
autoDeploy: true
healthCheckPath: /health
```

### Health Check Endpoint
Tạo endpoint để Render monitor:

```typescript
// src/app.controller.ts
@Get('health')
healthCheck() {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
}
```

## 🔄 CI/CD với GitHub Actions

Tạo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Render
      run: |
        curl -X POST "${{ secrets.RENDER_DEPLOY_HOOK }}"
```

## 💰 Cost Optimization

### Free Plan Limitations
- **Sleep after 15 min inactivity**
- **750 hours/month** (khoảng 31 ngày)
- **Cold start** khi app sleep

### Tips tiết kiệm
1. **Keep-alive service**: Ping API định kỳ
2. **Optimize build**: Giảm dependencies
3. **Monitor usage**: Track monthly hours

## 🛡️ Security Best Practices

### Environment Variables
- Không commit `.env` vào Git
- Dùng strong JWT secret cho production
- Rotate secrets định kỳ

### Database Security
- Enable authentication
- Whitelist specific IPs nếu có thể
- Use connection pooling

### API Security
- Rate limiting
- Request validation
- HTTPS only

## 📞 Support

### Render Support
- [Render Docs](https://render.com/docs)
- [Community Forum](https://community.render.com)
- Email support (paid plans)

### Debugging Resources
- Render logs
- Application metrics
- Database monitoring

---

## 🎉 Chúc mừng!

Dự án NestJS của bạn đã được deploy thành công lên Render!

**API URL**: `https://your-app.onrender.com`

### Next Steps:
1. Test tất cả API endpoints
2. Cấu hình monitoring
3. Setup custom domain
4. Deploy frontend application

**Happy coding! 🚀**
