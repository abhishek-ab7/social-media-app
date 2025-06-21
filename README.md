📱 Social Media App

A simple social media web app built using **Vue 3 + PrimeVue** (frontend) and **NestJS + MongoDB** (backend).


📦 Project Structure


social_media_app/
├── frontend/   → Vue 3 + PrimeVue client app
├── backend/    → NestJS API server
└── README.md   → This file



 🚀 How to Run

 📌 Frontend Setup

1️⃣ Open terminal and navigate to the frontend folder:


cd frontend


2️⃣ Install dependencies:


npm install


3️⃣ Start the frontend development server:


npm run serve


The frontend will run at [http://localhost:8080](http://localhost:8080)



📌 Backend Setup

1️⃣ Open another terminal and navigate to the backend folder:


cd backend


2️⃣ Install dependencies:


npm install


3️⃣ Create a `.env` file in the `backend` folder and add your MongoDB connection string:

```
MONGO_URI=your_mongodb_connection_string
```

4️⃣ Start the backend development server:


npm run start:dev


The backend API will run at [http://localhost:3000](http://localhost:3000)



 Done!

Now you have both servers running:  
✅ `http://localhost:8080` → frontend  
✅ `http://localhost:3000` → backend API




