<div align="center">

# 🚨 Complaint Management System

### *Streamline Infrastructure Complaint Handling*

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, full-stack web application for managing street light and infrastructure complaints. Users can submit complaints with images and signatures, while administrators can review and approve them efficiently.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Documentation](#-api-endpoints)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👤 User Features
- 🔐 **Secure Authentication** - Register and login with JWT
- 📝 **Submit Complaints** - Detailed forms with location, fault type
- 📸 **Image Upload** - Attach photos via Firebase storage
- ✍️ **Digital Signature** - Sign complaints electronically
- 📊 **Track Status** - Monitor complaint progress in real-time
- 👨‍💼 **Profile Management** - Update personal information

</td>
<td width="50%">

### 🛡️ Admin Features
- 🔑 **Admin Portal** - Separate authentication system
- 📋 **Complaint Dashboard** - View all submitted complaints
- ✅ **Approve/Reject** - Process complaints with remarks
- 📈 **Status Tracking** - Monitor complaint lifecycle
- 💬 **Add Remarks** - Provide feedback to users
- 🔍 **Detailed View** - Access complete complaint information

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

### Frontend
| Technology | Purpose |
|------------|---------|
| ⚛️ **React 18** | UI library |
| ⚡ **Vite** | Build tool and dev server |
| 🧭 **React Router** | Client-side routing |
| 🗃️ **Redux Toolkit** | State management |
| 🎨 **Tailwind CSS** | Utility-first styling |
| 🌐 **Axios** | HTTP client |
| 🔥 **Firebase** | Image storage |
| 🎯 **Lucide React** | Modern icon library |
| ✍️ **React Signature Canvas** | Digital signatures |

### Backend
| Technology | Purpose |
|------------|---------|
| 🟢 **Node.js** | Runtime environment |
| 🚂 **Express** | Web framework |
| 🍃 **MongoDB** | NoSQL database |
| 🦫 **Mongoose** | MongoDB ODM |
| 🔐 **JWT** | Token-based authentication |
| 🔒 **bcrypt** | Password hashing |
| 🔄 **Nodemon** | Development auto-reload |
| 🌍 **CORS** | Cross-origin resource sharing |

</div>

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- ![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=flat-square&logo=node.js) Node.js (v14 or higher)
- ![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat-square&logo=mongodb) MongoDB (running locally or remote connection)
- ![npm](https://img.shields.io/badge/npm-or%20yarn-CB3837?style=flat-square&logo=npm) npm or yarn package manager

## 🚀 Installation

### 1. 📥 Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

### 2. 🔧 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 3. 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Configure Firebase in `frontend/services/firebaseConfig.js` with your Firebase credentials.

## ▶️ Running the Application

### 🍃 Start MongoDB
Make sure MongoDB is running on your system:
```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 🚀 Start Backend Server
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

### 🎨 Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout

### 🛡️ Admin
- `POST /api/v1/admin/register` - Admin registration
- `POST /api/v1/admin/login` - Admin login
- `GET /api/v1/admin/complaints` - Get all complaints (admin only)

### 📝 Complaints
- `POST /api/v1/complaints/new` - Create new complaint
- `GET /api/v1/complaints` - Get user's complaints
- `GET /api/v1/complaints/:id` - Get complaint details
- `PUT /api/v1/complaints/:id` - Update complaint status (admin)

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middlewares/     # Auth & validation
│   │   ├── utils/           # Helper functions
│   │   ├── db/              # Database connection
│   │   ├── app.js           # Express app setup
│   │   └── index.js         # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # Redux store
    │   ├── App.jsx          # Main app component
    │   └── main.jsx         # Entry point
    ├── public/              # Static assets
    └── package.json
```

## 📜 Available Scripts

### Backend 🔧
- `npm start` - Start server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET=your_secret_key
PORT=5000
```

### 🔥 Frontend
Configure Firebase credentials in `frontend/services/firebaseConfig.js`

## 🗄️ Database Models

### 👤 User
- name, username, password (hashed), phoneNo
- Timestamps: createdAt, updatedAt

### 🛡️ Admin
- name, username, password (hashed), phoneNo
- Timestamps: createdAt, updatedAt

### 📋 Complaint
- callerName, callerPhone, callerAddress
- area, division, category, typeOfFault
- complainCentre, complainCentrePhone
- location, picture, signature, remarks
- status (pending/approved/rejected)
- approvedBy, approverRemarks
- Timestamps: createdAt, updatedAt

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **ISC License**.

## 👨‍💻 Author

**Dipanshu Kumar Mishra**

## 💬 Support

For issues and questions, please open an issue in the repository.

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Dipanshu Kumar Mishra

</div>
