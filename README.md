# BookVerse

BookVerse is a full-stack JavaScript application designed for managing and browsing a collection of books. It allows users to search for books, add them to their personal list, and remove them as needed. The application is built with a responsive design, ensuring a seamless experience across various devices. Additionally, BookVerse includes Progressive Web App (PWA) capabilities, enabling offline access and enhanced performance.

## Features

- **Search Functionality:** Easily search for books by title or author.
- **Add to List:** Add your favorite books to a personalized list.
- **Remove from List:** Remove books from your list as needed.
- **Responsive Design:** Optimized layout for desktops, tablets, and mobile devices.
- **Progressive Web App (PWA):** Installable app with offline support for enhanced user experience.
- **Admin Dashboard:** Manage the book collection with administrative privileges.

## Technologies Used

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **Axios:** Promise-based HTTP client for making API requests.
- **CSS:** Styling the application with responsive and modern designs.

### Backend

- **Node.js:** JavaScript runtime for building scalable network applications.
- **Express:** Fast, unopinionated, minimalist web framework for Node.js.
- **Render:** Hosting platform for deploying the backend server.

### Deployment

- **Netlify:** Hosting platform for deploying the frontend application.
- **Render:** Hosting platform for deploying the backend server.

## Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Git** installed on your machine

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/yourusername/bookverse.git
   cd bookverse 
2. **Navigate to the Frontend Directory**
   ```
    cd frontend
3. **Install Frontend Dependencies**
   ```
   npm install
4. **Navigate to the Backend Directory**
   ```
   cd ../backend
5. **Install Backend Dependencies**
   ```
   npm install
6. **Set Environment Variables**
   
   Create a .env file in the backend directory and add the following:
   ```
   PORT=4002
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

## Running the Application Locally
1. **Start the Backend Server Navigate to the backend directory and run:**

   ```
   npm staer

2. **Start the Frontend Development Server Navigate to the frontend directory and run:**

   ```
   npm run dev
3. **Open your browser and visit:**
   ```
   Frontend: http://localhost:5173
   Backend API: http://localhost:4002

## Deployment
The application is deployed with the following services:

Frontend: Hosted on Netlify
Backend: Hosted on Render

Deployed https://bookverse-u09.netlify.app/

## Developed by Chali Mohamedsani.









   
