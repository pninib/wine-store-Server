# Wine Store Server

A Node.js Express REST API for managing a wine store, including user authentication, email verification (OTP), role-based access, product and order management, and MongoDB integration.

## Features

- **User Registration & Login** – with JWT authentication
- **Email Verification** – OTP code sent to user email
- **Role-based Access** – admin/user roles for protected actions
- **Product Management** – add, update, delete, and list wines
- **Order Management** – create, update, delete, and search orders
- **MongoDB Integration** – using Mongoose ODM

## Main Endpoints

- `POST /api/user/add_user` – Register new user (sends OTP to email)
- `POST /api/user/verify_email` – Verify email with OTP code
- `POST /api/user/login` – User login (returns JWT)
- `GET /api/user/` – Get all users (admin only)
- `GET /api/user/:id` – Get user by ID (admin only)
- `DELETE /api/user/:id` – Delete user (admin only)
- `GET /api/user/me` – Get current user (by token)

- `POST /api/product/add_wine` – Add wine (admin only)
- `PUT /api/product/:wineid` – Update wine (admin only)
- `DELETE /api/product/:id` – Delete wine (admin only)
- `GET /api/product/` – List wines (with search & pagination)
- `GET /api/product/:id` – Get wine by ID

- `POST /api/order/` – Add order
- `PUT /api/order/:id` – Update order (admin only)
- `DELETE /api/order/:id` – Delete order (admin only)
- `GET /api/order/` – List orders (admin only, with filters)
- `GET /api/order/:id` – Get order by ID

## Technologies

- Node.js, Express.js
- MongoDB & Mongoose
- JWT (JSON Web Token)
- Nodemailer (for email verification)
- Joi (validation)
- bcryptjs (password hashing)

## Getting Started

1. Clone the repository
2. Install dependencies:  
   `npm install`
3. Set up your `.env` file (see `.env.example`)
4. Start the server:  
   `npm run dev`

## Environment Variables

- `PORT` – Server port
- `MONGO_URL` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT
- `GMAIL_APP_PASSWORD` – App password for sending emails

## License

This project is licensed under the MIT