# Book Review API

A RESTful API for managing books, user authentication, and book reviews. Built with Node.js, Express, and MongoDB.

---

## Project Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/sbmraj03/Book-Review-API.git
   cd book-review-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory (see `.env.example` below):

   ```
   PORT=5000
   MONGO_URI=mongodb://0.0.0.0/book-review
   JWT_SECRET=yourSecretKey
   ```

4. **Start the server**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000` by default.

---

## How to Run Locally

- Ensure MongoDB is running locally or update `MONGO_URI` to point to your MongoDB Atlas/cloud instance.
- Run `npm start` to launch the API.
- Use Postman or any HTTP client to interact with the endpoints.

---

## Example API Requests (with Postman)

### 1. **User Signup**

- **POST** `/signup`
- **Body** (JSON):
  ```json
  {
    "username": "john_doe",
    "password": "yourpassword"
  }
  ```
- **Response:** `201 Created` on success

---

### 2. **User Login**

- **POST** `/login`
- **Body** (JSON):
  ```json
  {
    "username": "john_doe",
    "password": "yourpassword"
  }
  ```
- **Response:** 
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

---

### 3. **Create a Book** (Authenticated)

- **POST** `/books`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body** (JSON):
  ```json
  {
    "title": "The Old Man",
    "author": "Bankim Chattopadhyay",
    "genre": "Motivation"
  }
  ```
- **Response:** `201 Created` with book object

---

### 4. **Get All Books**

- **GET** `/books`
- **Query Params:** `page`, `limit`, `author`, `genre` (optional)
- **Response:** Array of books

---

### 5. **Search Books**

- **GET** `/books/search?query=old`
- **Response:** Array of matching books

---

### 6. **Get Book by ID (with reviews and average rating)**

- **GET** `/books/:id`
- **Response:** Book object, average rating, and reviews

---

### 7. **Add a Review to a Book** (Authenticated)

- **POST** `/reviews/:id/reviews` (`:id` = Book ID)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body** (JSON):
  ```json
  {
    "rating": 5,
    "comment": "Great book!"
  }
  ```
- **Response:** `201 Created` with review object

---

### 8. **Update a Review** (Authenticated, Owner Only)

- **PUT** `/reviews/:id` (`:id` = Review ID)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:** Any fields to update (e.g., `rating`, `comment`)
- **Response:** Updated review object

---

### 9. **Delete a Review** (Authenticated, Owner Only)

- **DELETE** `/reviews/:id` (`:id` = Review ID)
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Response:** Confirmation message

---

## Design Decisions & Assumptions

- **Authentication:** JWT-based authentication is used. All book and review creation, update, and delete operations require a valid JWT.
- **Password Storage:** Passwords are hashed using bcryptjs before storing in the database.
- **One Review per User per Book:** Each user can only review a book once.
- **Pagination:** Supported for listing books via `page` and `limit` query parameters.
- **Filtering:** Books can be filtered by `author` and `genre` (case-insensitive).
- **Search:** Books can be searched by partial title or author.
- **Review Ownership:** Only the user who created a review can update or delete it.
- **Error Handling:** Returns appropriate HTTP status codes and error messages for invalid requests or unauthorized actions.
- **Environment Variables:** Sensitive data (DB URI, JWT secret) is stored in `.env` and excluded from version control.

---

## .env Example

```
PORT=5000
MONGO_URI=mongodb://0.0.0.0/book-review
JWT_SECRET=yourSecretKey
```

---
