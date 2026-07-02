# 🚀 MarketPulse – Daily Price Watch for Local Markets

MarketPulse is a Full Stack MERN Web Application that helps users track daily prices of vegetables, fruits, grains, and other essential commodities across multiple local markets.

It provides an easy-to-use dashboard for managing products, markets, and prices while allowing users to compare prices between different markets.

---

## 📌 Features

### Authentication
- User Registration
- Secure Login
- JWT Authentication
- Forgot Password (OTP)
- Reset Password
- User Profile

### Dashboard
- Total Products
- Total Markets
- Total Price Records
- Featured Products

### Products
- Add Product
- Edit Product
- Delete Product
- Upload Product Image
- Search Products
- Export PDF
- Export Excel

### Markets
- Add Market
- Edit Market
- Delete Market
- Search Markets
- Export PDF
- Export Excel

### Prices
- Add Daily Price
- Edit Price
- Delete Price
- Search Prices
- Export PDF
- Export Excel

### Compare Prices
- Compare product prices across multiple markets
- Lowest price highlighting

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router
- Bootstrap 5
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### Database
- MongoDB

---

## 📂 Project Structure

```
MarketPulse
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/MarketPulse-MERN.git
```

### Install Client

```bash
cd client
npm install
npm run dev
```

### Install Server

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

### Client (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Server (.env)

```
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=YOUR_APP_PASSWORD
```

---

## 📸 Screenshots

- Login Page
- Dashboard
- Products
- Markets
- Prices
- Compare Prices

(Add screenshots after deployment.)

---

## 👨‍💻 Author

**Anudeep Chimmani**

B.Tech (Computer Science & Engineering)

---

## ⭐ Future Improvements

- Charts & Analytics
- Price Trends
- Notifications
- Mobile Responsive UI Enhancements
- AI-based Price Prediction

---

## 📄 License

This project is developed for educational and portfolio purposes.