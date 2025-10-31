# LinkedIn Clone Backend

A RESTful API backend for a LinkedIn-like social networking platform.

## Tech Stack

**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**Authentication:** JWT (JSON Web Tokens)  
**Password Hashing:** bcryptjs  
**Environment:** dotenv  
**Development:** Nodemon

## Features

- **User Authentication:** Register, login, JWT token management, account deletion
- **Post Management:** Create, read, update, delete posts
- **Social Interactions:** Like/unlike posts, add comments
- **Security:** Password hashing, JWT authentication, CORS configuration
- **Database:** MongoDB with Mongoose ODM

## How to Run

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create `.env` file in backend folder:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/linkedin-clone
   JWT_SECRET=your-secret-key-here
   ```

4. **Start the server**
   ```bash
   npm run dev  # Development mode with nodemon
   # or
   npm start    # Production mode
   ```

The API will run at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `DELETE /api/auth/delete` - Delete account

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (auth required, owner only)
- `DELETE /api/posts/:id` - Delete post (auth required, owner only)
- `PUT /api/posts/like/:id` - Like/unlike post (auth required)
- `POST /api/posts/comment/:id` - Add comment to post (auth required)

## Project Structure

```
backend/
├── models/           # MongoDB schemas
│   ├── User.js       # User model
│   └── Post.js       # Post model
├── routes/           # API routes
│   ├── auth.js       # Authentication routes
│   └── posts.js      # Post management routes
├── middleware/       # Custom middleware
│   └── auth.js       # JWT authentication middleware
├── server.js         # Main server file
├── package.json      # Dependencies
└── .env              # Environment variables
```

## Database Schema

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- createdAt: Date

### Post
- user: ObjectId (ref: User)
- text: String (required)
- likes: Array of ObjectId (ref: User)
- comments: Array of {user: ObjectId, text: String, createdAt: Date}
- createdAt: Date

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration for frontend access
- Input validation on all endpoints
- Authorization checks for post operations

## Development

Use `npm run dev` for development with auto-restart on file changes.
