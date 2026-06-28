# Talent-Code 🚀

Talent-Code is a full-stack coding interview and assessment platform designed to simulate real-world technical interviews. It enables candidates and interviewers to collaborate through live coding sessions, video calls, real-time chat, and automated code execution.

## Features

### 🔐 Authentication & User Management

* Secure authentication using Clerk
* User profile management
* Protected routes and session handling

### 💻 Live Coding Environment

* Real-time code editor
* Multi-language code execution
* Automated test case evaluation
* Instant execution feedback

### 🎥 Interview Experience

* One-on-one video interview rooms
* Camera and microphone controls
* Screen sharing support
* Session recording capabilities

### 💬 Real-Time Communication

* Live chat between participants
* Instant messaging during interviews
* Real-time session updates

### 📊 Dashboard & Analytics

* Active interview sessions
* Recent session history
* Performance tracking
* Interview statistics dashboard

### ⚡ Background Processing

* Inngest-powered event workflows
* Asynchronous task processing
* Scalable architecture

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* Clerk Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Clerk Express SDK
* Inngest

### Real-Time Services

* Stream Video SDK
* Stream Chat SDK

### Code Execution

* Docker-based isolated execution environment

---

## Project Structure

```bash
Talent-IQ/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── lib/
│   └── server.js
│
└── README.md
```

---

## Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

MONGO_URI=your_mongodb_uri

CLIENT_URL=http://localhost:5173

CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

VITE_STREAM_API_KEY=your_stream_api_key
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/talent-iq.git
cd talent-iq
```

### Install Dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

---

## API Endpoints

### Session Routes

```http
GET    /api/sessions/active
GET    /api/sessions/my-recent
GET    /api/sessions/:id
POST   /api/sessions
POST   /api/sessions/:id/join
POST   /api/sessions/:id/end
```

### Chat Routes

```http
GET    /api/chat/token
```

### Health Check

```http
GET    /health
```

---

## Deployment

### Frontend

* Vercel

### Backend

* Render

### Database

* MongoDB Atlas

---

## Future Enhancements

* AI-powered interview feedback
* Automated resume analysis
* Coding contest mode
* Interview scheduling system
* Performance reports and insights
* AI interviewer assistant

---

## Author

**Madhav Patel**

Final Year Information Technology Student

Bansal Institute of Science and Technology

Actively seeking opportunities in Full Stack Development (MERN Stack).

---

## License

This project is licensed under the MIT License.
