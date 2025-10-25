# Grocery App - React & Node.js

A full-stack grocery shopping application built with React (frontend) and Node.js/Express (backend).

## Features

- 🛒 Browse grocery items by category (Fruits, Vegetables, Meats, Snacks, Beverages)
- 🛍️ Add items to shopping cart
- 📊 View total cost before checkout
- 🔐 Admin panel with authentication
- ➕ Add, edit, and delete items (Admin only)
- 📱 Responsive design for mobile and desktop
- 💾 Local JSON file data storage

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Context API for state management
- Modern CSS with responsive design

### Backend
- Node.js
- Express
- JWT for authentication
- bcrypt for password hashing
- JSON file storage

## Project Structure

```
Grocery-App-React-Node/
├── backend/           # Node.js backend
│   ├── server.js      # Express server
│   ├── data.json      # Data storage
│   └── package.json
├── frontend/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   └── utils/       # API utilities
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Shopping
1. Open the app in your browser at `http://localhost:3000`
2. Browse items by clicking on category cards
3. Click "Add to Cart" on items you want to purchase
4. View your cart by clicking the cart icon
5. Adjust quantities or remove items as needed
6. Click "Checkout" to complete your order

### Admin Panel
1. Click "Login" in the navigation
2. Use the default credentials:
   - Username: `admin`
   - Password: `admin123`
3. Navigate to the Admin panel
4. Add new items, edit existing items, or delete items

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/login` - User login
- `GET /api/items` - Get all items (optional query param: category)
- `GET /api/items/:id` - Get single item
- `GET /api/categories` - Get all categories

### Admin Endpoints (Authentication Required)
- `POST /api/items` - Add new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Default Credentials

- **Admin Username:** admin
- **Admin Password:** admin123

⚠️ **Note:** The default admin password is hashed in the `data.json` file. If you need to create a new admin user, use bcrypt to hash the password.

## Features in Detail

### Category Browsing
- Filter items by category with a single click
- View all items or items from a specific category
- Visual category cards with icons

### Shopping Cart
- Add items with automatic quantity tracking
- Adjust quantities with +/- buttons
- Remove items from cart
- Real-time total price calculation
- Persistent cart (saved in localStorage)

### Admin Panel
- Secure authentication with JWT
- Add new grocery items
- Edit existing items (name, price, category, description, image)
- Delete items
- Real-time updates

### Responsive Design
- Mobile-first approach
- Works seamlessly on desktop, tablet, and mobile devices
- Touch-friendly interface

## Data Storage

The application uses a simple JSON file (`backend/data.json`) for data storage, which includes:
- Grocery items with details (name, price, category, description, image)
- User accounts (admin credentials)

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected admin routes
- Token-based API authentication

## Future Enhancements

- User registration and profiles
- Order history
- Payment integration
- Product search functionality
- Image uploads for items
- Database integration (PostgreSQL/MongoDB)
- Email notifications
- Multiple admin users

## License

MIT