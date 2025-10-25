# Backend

Backend server for Grocery App built with Node.js and Express.

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/login` - Login
- `GET /api/items` - Get all items (optional query param: category)
- `GET /api/items/:id` - Get single item
- `GET /api/categories` - Get all categories

### Admin Endpoints (require authentication)
- `POST /api/items` - Add new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Data Storage

Data is stored in `data.json` file with items and users.
