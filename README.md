# 🌃 Street Light Complaint Management System (SLCS)

> **Empowering citizens, streamlining administration.**
> A modern, full-stack solution for smarter civic infrastructure management.
---

## 🧐 What is SLCS?

This isn't just a CRUD app; it's a **Role-Based Civic Management System**. The SLCS solves a real-world problem: reporting broken infrastructure. It allows citizens to lodge complaints with visual proof (images) and location data, while giving authorities a dedicated dashboard to manage and resolve these issues.

It enforces strict **Role-Based Access Control (RBAC)**—ensuring that admins and users exist in completely separate digital jurisdictions.

---

## ⚡ Key Features

### 🛡️ Fortified Security & Auth

* **JWT Authentication:** Stateless, secure session management.
* **Strict RBAC:** Middleware barriers ensure Users cannot touch Admin APIs, and Admins cannot tamper with User profiles.
* **Password Hashing:** Industry-standard encryption for user data.

### 📸 Media & Cloud Handling

* **Firebase Storage:** Images are optimized and stored securely in the cloud, ensuring fast retrieval and low server load.
* **Multer Middleware:** Robust file handling for incoming media streams before upload.

### 🏗️ Enterprise-Grade Architecture

* **MVC Pattern:** Clean separation of concerns (Routes → Controllers → Services → Models).
* **Scalable Database:** Normalized MongoDB schema with clear relationships between Users, Admins, and Complaints.

---

## 🛠️ The Tech Ecosystem

We chose a high-performance stack to ensure speed, scalability, and developer experience.

### **Frontend (Client)**

| Tech | Badge | Why? |
| --- | --- | --- |
| **React** |  | Component-based UI |
| **Vite** |  | Lightning fast build tool |
| **Redux** |  | Global state management |
| **Tailwind** |  | Modern utility-first styling |

### **Backend (Server)**

| Tech | Badge | Why? |
| --- | --- | --- |
| **Node.js** |  | Scalable runtime |
| **Express** |  | Robust API framework |
| **MongoDB** |  | Flexible NoSQL database |
| **JWT** |  | Stateless authentication |

### **Cloud & Tools**

---

## 📐 System Architecture

The application follows a **Decoupled Monolithic** architecture:

1. **Client:** React (Vite) consumes RESTful APIs.
2. **Server:** Express.js handles business logic, validation, and remarks.
3. **Database:** MongoDB stores users, admins, and complaint documents.
4. **Storage:** Firebase handles heavy media assets (complaint images).

---

## ⚡ Getting Started

### Prerequisites

* Node.js (v14+)
* MongoDB (Local or Atlas)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/street-light-complaint-system.git
cd street-light-complaint-system

```

### 2. Backend Setup

```bash
cd backend
npm install
# Create .env file with MONGODB_URL and JWT_SECRET
npm start

```

### 3. Frontend Setup

```bash
cd frontend
npm install
# Create .env with VITE_FIREBASE_ config
npm run dev

```

---

## 🛣️ API Roadmap

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | User Registration |
| `POST` | `/api/v1/complaints` | Submit Complaint (w/ Image) |
| `PUT` | `/api/v1/complaints/:id` | **Admin:** Update Status/Remarks |
| `GET` | `/api/v1/users/profile` | **User:** Get Profile & History |

---

## 🤝 Contributing

We welcome contributions!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Dipanshu Kumar Mishra**

* Designed with ❤️ for better cities.

---

### 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.
