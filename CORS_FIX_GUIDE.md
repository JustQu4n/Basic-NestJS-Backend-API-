# 🔧 Khắc phục lỗi CORS - NestJS

## ❌ Lỗi CORS phổ biến

```
Access to XMLHttpRequest at 'http://localhost:3000/auth/login' from origin 'http://localhost:5173' 
has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## ✅ Giải pháp đã được áp dụng

### 1. Cấu hình CORS trong `src/main.ts`

File `main.ts` đã được cập nhật với cấu hình CORS đầy đủ:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite default port
    'http://localhost:3001',
    'http://localhost:4200', // Angular default port
    'http://localhost:8080', // Vue CLI default port
    process.env.FRONTEND_URL || 'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods'
  ],
  credentials: true,
});
```

### 2. Cấu hình biến môi trường

File `.env` đã được cập nhật:
```env
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Cách sử dụng

### Bước 1: Khởi động lại server
```bash
# Dừng server hiện tại (Ctrl+C)
# Sau đó khởi động lại
npm run start:dev
```

### Bước 2: Kiểm tra console
Server sẽ hiển thị:
```
🚀 Application is running on: http://localhost:3000
```

### Bước 3: Test API từ frontend

#### JavaScript/TypeScript Frontend:
```javascript
// Ví dụ với fetch
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
  credentials: 'include' // Nếu cần cookies
});

const data = await response.json();
console.log(data);
```

#### Axios:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true, // Nếu cần cookies
});

const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password123'
});
```

## 🔍 Troubleshooting

### Lỗi vẫn còn sau khi cấu hình?

1. **Kiểm tra cache browser:**
   - Mở DevTools (F12)
   - Right-click trên nút refresh → "Empty Cache and Hard Reload"

2. **Kiểm tra server đã restart:**
   ```bash
   # Dừng server (Ctrl+C)
   npm run start:dev
   ```

3. **Kiểm tra port frontend:**
   - Nếu frontend chạy trên port khác (không phải 5173), cập nhật `.env`:
   ```env
   FRONTEND_URL=http://localhost:YOUR_PORT
   ```

4. **Kiểm tra network tab:**
   - Mở DevTools → Network
   - Tìm request OPTIONS (preflight)
   - Kiểm tra response headers có `Access-Control-Allow-Origin`

### Cấu hình nâng cao

#### Chỉ cho phép một domain cụ thể:
```typescript
app.enableCors({
  origin: 'http://localhost:5173',
  // ... other options
});
```

#### Cho phép tất cả origins (KHÔNG khuyến nghị cho production):
```typescript
app.enableCors({
  origin: true,
  // ... other options
});
```

#### Sử dụng callback để validate origin:
```typescript
app.enableCors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // ... other options
});
```

## 📝 Ghi chú quan trọng

1. **Development vs Production:**
   - Development: Có thể cho phép nhiều origins
   - Production: Chỉ cho phép domain chính thức

2. **Credentials:**
   - `credentials: true` cần thiết nếu gửi cookies/auth headers
   - Frontend cũng phải set `withCredentials: true` hoặc `credentials: 'include'`

3. **Preflight Requests:**
   - Browser tự động gửi OPTIONS request trước POST/PUT/DELETE
   - NestJS CORS config tự động xử lý điều này

## ✅ Checklist sau khi cấu hình

- [ ] Server đã restart
- [ ] Browser cache đã clear
- [ ] Network tab không còn lỗi CORS
- [ ] API response thành công
- [ ] Headers có `Access-Control-Allow-Origin`
