# Contactly — Full Stack Contact Form

## Overview
Contactly is a full-stack contact form application built with **React.js** (frontend) and **Node.js + Express** (backend).  
It allows users to submit contact requests that are sent via email. The form includes inline validation, honeypot spam protection, and loading states for a smooth user experience.

---

## Features

- Single-page contact form with fields: **Name, Email, Phone, Message**  
- Client-side validation:
  - Name, Email, Phone, and Message are required
  - Email must be in valid format
  - Phone must be 10–15 digits
- Honeypot spam trap to prevent bots  
- Loading indicator and disabled submit button during submission  
- Friendly success message upon successful submission  
- Backend email delivery using Nodemailer with Gmail SMTP  
- Fully responsive UI

---

## Folder Structure

contactly/
│
├── backend/                   # Node.js + Express backend
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variable template
│   └── ...                    # Other backend files if any
│
└── frontend/                  # React frontend
    ├── package.json           # Frontend dependencies
    ├── public/                # Public files (index.html, favicon, etc.)
    ├── src/                   # React source code
    │   ├── App.js
    │   ├── index.js
    │   ├── components/
    │   │   └── ContactForm.js
    │   └── utils/
    │       └── validators.js
    └── README.md              # Frontend-specific README (optional)

## Backend Setup Instructions

1. Navigate to the backend folder: cd backend
2. Install dependencies: npm install
3. Create a .env file based on .env.example and fill in your credentials:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@example.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@example.com
TO_EMAIL=your_email@example.com


4. Run the backend server: npm run dev

Backend server runs on http://localhost:4000 by default.

## Frontend Setup Instructions

1. Navigate to the frontend folder: cd frontend
2. Install dependencies: npm install
3. Start the frontend React app: npm start
Frontend runs on http://localhost:3000 by default.
Ensure the backend server is running for the form to submit correctly.

4. (Optional) Configure backend API URL in frontend .env:
REACT_APP_BACKEND_URL=http://localhost:4000


## How Contact Form and Email Work

- When the user submits the form, the frontend sends a POST request to the backend /api/contact endpoint.

- The backend validates the request, including checking the honeypot field for spam.

- If valid, the backend sends an email using Nodemailer via Gmail SMTP with the following information:

Name
Email
Phone
Message

- If submission succeeds, the frontend displays a friendly success message.

- The honeypot field is invisible to human users but helps detect bots.

## Validation Rules

- Field	    Validation
  Name	    Required, cannot be empty
  Email	    Required, must be a valid email format
  Phone	    Required, must be 10–15 digits
  Message	Required, cannot be empty
  Honeypot	Must be empty (used to detect bots)