# 📱 Social Media App

A full-stack social media application built with the Vue 3 and NestJS frameworks. This project features user authentication, post creation, a timeline feed, and the ability to follow and unfollow other users.

## ✨ Features

-   **User Authentication**: Secure sign-up and login functionality.
-   **Create & View Posts**: Users can create new posts and view posts from people they follow.
-   **Follow / Unfollow Users**: A simple social graph lets users follow and unfollow others.
-   **Interactive Timeline**: A central timeline to see all the content.
-   **Responsive UI**: A clean user interface built with PrimeVue and PrimeFlex.

## 🚀 Getting Started


### Installation & Setup

1.  **Clone the repository:**
    ```sh
    [git clone https://github.com/your-username/social-media-app.git](https://github.com/abhishek-ab7/social-media-app.git)
    cd social-media-app
    ```

2.  **Backend Setup:**
    -   Navigate to the backend directory:
        ```sh
        cd backend
        ```
    -   Install dependencies:
        ```sh
        npm install
        ```
    -   Create a `.env` file in the `backend` directory and add your MongoDB connection string.
        ```
        MONGO_URI=your_mongodb_connection_string
        ```
    -   Start the backend server:
        ```sh
        npm run start:dev
        ```
    -   The backend API will be running at `http://localhost:3000`.

3.  **Frontend Setup:**
    -   In a new terminal, navigate to the frontend directory:
        ```sh
        cd frontend
        ```
    -   Install dependencies:
        ```sh
        npm install
        ```
    -   Start the frontend development server:
        ```sh
        npm run serve
        ```
    -   The frontend will be running at `http://localhost:8080`.



Now you have both servers running:  
✅ `http://localhost:8080` → frontend  
✅ `http://localhost:3000` → backend API




