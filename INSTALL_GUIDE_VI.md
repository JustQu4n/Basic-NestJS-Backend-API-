# 🚀 Hướng dẫn cài đặt dự án NestJS từ GitHub

## 📋 Mục lục
1. [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
2. [Cài đặt từ GitHub](#cài-đặt-từ-github)
3. [Cấu hình dự án](#cấu-hình-dự-án)
4. [Chạy dự án](#chạy-dự-án)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Xử lý sự cố](#xử-lý-sự-cố)

## 🔧 Yêu cầu hệ thống

### Phần mềm cần thiết:
- **Node.js** (phiên bản 18.x hoặc mới hơn)
- **npm** (đi kèm với Node.js) hoặc **yarn**
- **Git** (để clone repository)
- **MongoDB** (cơ sở dữ liệu)

### Kiểm tra phiên bản:
```bash
node --version    # Nên ≥ v18.0.0
npm --version     # Nên ≥ 8.0.0
git --version     # Bất kỳ phiên bản nào
```

## 📥 Cài đặt từ GitHub

### Bước 1: Clone repository
```bash
# Thay thế <repository-url> bằng URL thực của dự án
git clone <repository-url>

# Ví dụ:
git clone https://github.com/your-username/Basic-NestJS-Backend-API-.git

# Di chuyển vào thư mục dự án
cd Basic-NestJS-Backend-API-
```

### Bước 2: Cài đặt dependencies
```bash
# Sử dụng npm (khuyến nghị)
npm install

# Hoặc sử dụng yarn
yarn install

# Nếu gặp lỗi, thử xóa cache và cài lại
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## ⚙️ Cấu hình dự án

### Bước 1: Tạo file môi trường
```bash
# Copy file template
cp .env.example .env

# Hoặc tạo file mới (Windows)
copy .env.example .env
```

### Bước 2: Cấu hình file .env
Mở file `.env` và chỉnh sửa các giá trị sau:

```env
# 🗄️ Cấu hình Database
MONGODB_URI=mongodb://localhost:27017/nestjs-api
DATABASE_URL=mongodb://localhost:27017/nestjs-api

# 🔐 Cấu hình JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d

# 🌐 Cấu hình Server
PORT=3000
NODE_ENV=development

# 🔗 CORS (nếu cần)
CORS_ORIGIN=http://localhost:3000
```

### Bước 3: Cài đặt MongoDB

#### Option 1: Cài đặt MongoDB local
- **Windows**: Tải từ [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- **macOS**: `brew install mongodb-community`
- **Ubuntu**: Xem [hướng dẫn chính thức](https://docs.mongodb.com/manual/installation/)

#### Option 2: Sử dụng Docker
```bash
# Chạy MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest

# Kiểm tra container đang chạy
docker ps
```

#### Option 3: Sử dụng MongoDB Atlas (Cloud)
1. Tạo tài khoản tại [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Tạo cluster miễn phí
3. Lấy connection string và cập nhật vào `.env`

## 🚀 Chạy dự án

### Development Mode (Khuyến nghị cho dev)
```bash
# Chạy với hot reload
npm run start:dev

# Hoặc
yarn start:dev
```

### Production Mode
```bash
# Build dự án
npm run build

# Chạy production
npm run start:prod
```

### Debug Mode
```bash
# Chạy với debugger
npm run start:debug
```

### Kiểm tra dự án đã chạy thành công
Mở trình duyệt và truy cập:
- **API Base**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Docs**: http://localhost:3000/api (nếu có Swagger)

## 🧪 Testing

### Unit Tests
```bash
# Chạy tất cả unit tests
npm run test

# Chạy test với watch mode
npm run test:watch

# Chạy test cho file cụ thể
npm run test -- auth.service.spec.ts
```

### End-to-End Tests
```bash
# Chạy e2e tests
npm run test:e2e

# Chạy với coverage
npm run test:cov
```

### Code Quality
```bash
# Format code
npm run format

# Lint và fix
npm run lint
```

## 🌐 Deployment

### Build cho Production
```bash
# Build
npm run build

# File build sẽ có trong thư mục dist/
ls dist/
```

### Deploy lên Heroku
```bash
# Cài Heroku CLI
# Tạo app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

### Deploy lên Vercel/Netlify
Tham khảo [NestJS Deployment Guide](https://docs.nestjs.com/deployment)

## 🔧 Xử lý sự cố

### ❌ Lỗi thường gặp

#### 1. Port đã được sử dụng
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Giải pháp:**
```bash
# Tìm process đang sử dụng port 3000
netstat -ano | findstr :3000  # Windows
lsof -ti:3000                 # macOS/Linux

# Kill process
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # macOS/Linux

# Hoặc đổi port trong .env
PORT=3001
```

#### 2. Không kết nối được MongoDB
```
MongoNetworkError: failed to connect to server
```
**Giải pháp:**
```bash
# Kiểm tra MongoDB có đang chạy
# Windows
net start MongoDB

# macOS/Linux
brew services start mongodb-community
sudo systemctl start mongod

# Kiểm tra connection string trong .env
```

#### 3. Missing dependencies
```
Module '"@nestjs/common"' not found
```
**Giải pháp:**
```bash
# Xóa và cài lại dependencies
rm -rf node_modules package-lock.json
npm install

# Hoặc
npm ci
```

#### 4. JWT Secret không được set
```
Error: JWT secret not configured
```
**Giải pháp:**
- Kiểm tra file `.env` có biến `JWT_SECRET`
- Đảm bảo file `.env` ở đúng thư mục root

### 🔍 Debug Tips

1. **Kiểm tra logs**: Luôn xem console logs để biết lỗi gì
2. **Sử dụng debugger**: `npm run start:debug` và attach debugger
3. **Test API**: Dùng Postman, Thunder Client, hoặc curl
4. **Kiểm tra database**: Dùng MongoDB Compass hoặc mongo shell

### 📚 Tài liệu tham khảo

- [NestJS Documentation](https://docs.nestjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### 🆘 Cần hỗ trợ?

1. Kiểm tra [Issues](../../issues) trên GitHub
2. Tạo issue mới nếu chưa có
3. Tham gia [NestJS Discord](https://discord.gg/G7Qnnhy)

---

**Chúc bạn code vui vẻ! 🎉**
