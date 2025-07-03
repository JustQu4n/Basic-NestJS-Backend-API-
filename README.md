<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Basic NestJS Backend API

## Hướng dẫn cài đặt dự án từ GitHub (Vietnamese Installation Guide)

### Yêu cầu hệ thống
- Node.js (phiên bản 18.x hoặc cao hơn)
- npm hoặc yarn
- Git
- MongoDB (nếu dự án sử dụng MongoDB)

### Bước 1: Clone dự án từ GitHub
```bash
# Clone repository về máy local
git clone <URL_GITHUB_REPOSITORY>

# Ví dụ:
# git clone https://github.com/your-username/Basic-NestJS-Backend-API-.git

# Di chuyển vào thư mục dự án
cd Basic-NestJS-Backend-API-
```

### Bước 2: Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

### Bước 3: Cấu hình môi trường
```bash
# Tạo file .env từ file .env.example (nếu có)
cp .env.example .env

# Hoặc tạo file .env mới
touch .env
```

Thêm các biến môi trường cần thiết vào file `.env`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/nestjs-api
DATABASE_URL=mongodb://localhost:27017/nestjs-api

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=1d

# Server
PORT=3000
NODE_ENV=development
```

### Bước 4: Khởi động cơ sở dữ liệu (nếu cần)
```bash
# Khởi động MongoDB (nếu cài đặt local)
mongod

# Hoặc sử dụng Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Bước 5: Chạy dự án
```bash
# Chế độ development (tự động reload khi có thay đổi)
npm run start:dev

# Chế độ production
npm run build
npm run start:prod

# Chế độ debug
npm run start:debug
```

### Bước 6: Kiểm tra dự án
Mở trình duyệt và truy cập:
- API: `http://localhost:3000`
- Health check: `http://localhost:3000/health` (nếu có)
- API Documentation: `http://localhost:3000/api` (nếu có Swagger)

### Các lệnh hữu ích khác

#### Testing
```bash
# Chạy unit tests
npm run test

# Chạy e2e tests
npm run test:e2e

# Chạy test với coverage
npm run test:cov

# Chạy test ở chế độ watch
npm run test:watch
```

#### Code Quality
```bash
# Format code
npm run format

# Lint code
npm run lint
```

#### Build
```bash
# Build dự án cho production
npm run build
```

### Cấu trúc dự án
```
src/
├── auth/                 # Module xác thực
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── dto/
├── users/               # Module người dùng
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── dto/
│   └── schemas/
├── app.module.ts        # Module chính
├── app.controller.ts
├── app.service.ts
└── main.ts             # Entry point
```

### Troubleshooting (Xử lý sự cố)

#### Lỗi thường gặp:

1. **Port đã được sử dụng**
   ```bash
   Error: listen EADDRINUSE: address already in use :::3000
   ```
   Giải pháp: Thay đổi port trong file `.env` hoặc dừng process đang sử dụng port 3000

2. **Không kết nối được database**
   ```bash
   MongoNetworkError: failed to connect to server
   ```
   Giải pháp: Kiểm tra MongoDB có đang chạy không và cấu hình MONGODB_URI đúng

3. **Missing dependencies**
   ```bash
   Module not found
   ```
   Giải pháp: Chạy lại `npm install`

### Các API endpoints chính
- `POST /auth/register` - Đăng ký tài khoản
- `POST /auth/login` - Đăng nhập
- `GET /users` - Lấy danh sách người dùng
- `GET /users/:id` - Lấy thông tin người dùng theo ID

### Development Tips
1. Sử dụng `npm run start:dev` để development với hot reload
2. Kiểm tra logs trong console để debug
3. Sử dụng Postman hoặc Thunder Client để test API
4. Đọc documentation của NestJS tại: https://docs.nestjs.com
