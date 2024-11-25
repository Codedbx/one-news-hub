# One News Hub: Full-Stack News Aggregator

## Project Overview
One News Hub is a comprehensive news aggregation platform built with Laravel (Backend) and React.js (Frontend), allowing users to discover, search, and personalize news content from multiple sources.

## 🚀 Features
- User Authentication & Registration
- Article Search and Advanced Filtering
- Personalized News Feed
- Mobile-Responsive Design
- Multi-Source News Aggregation

## 🛠️ Technologies
- **Backend:** Laravel
- **Frontend:** React.js
- **Containerization:** Docker
- **Caching:** Redis

## 📋 Prerequisites
- Docker
- Docker Compose (v3.8+)
- Git
- Node.js (v18+)
- PHP (v8.2+)

## 🔧 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/codedbx/one-news-hub.git
cd one-news-hub
```

### 2. Environment Configuration
#### Backend (.env)
```bash
cd news-backend
cp .env.example .env
# Edit .env and configure:
# - Database settings
# - API keys for news sources
# - Redis configuration
```

#### Frontend (.env)
```bash
cd ../news-frontend
cp .env.example .env
# Configure frontend environment variables
```

### 3. Docker Setup
```bash
# Return to project root
cd ..

# Build and start containers
docker-compose up --build -d

# View running containers
docker-compose ps
```

### 4. Backend Setup
```bash
# Enter backend container
docker-compose exec backend bash

# Inside container, run migrations
php artisan migrate

# Generate application key
php artisan key:generate


# Exit container
exit
```

### 5. Access Applications
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:9000


## 🔍 Debugging
```bash
# View container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs redis
```

## 🛑 Stopping the Application
```bash
# Stop all containers
docker-compose down

# Remove volumes (optional)
docker-compose down -v
```

## 📦 Project Structure
```
one-news-hub/
│
├── news-backend/       # Laravel Backend
│   ├── app/
│   ├── config/
│   └── routes/
│
├── news-frontend/      # React Frontend
│   ├── src/
│   ├── public/
│   └── components/
│
├── docker-compose.yml
├── backend.Dockerfile
└── frontend.Dockerfile
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact
Your Name - emmanuel.gita@gmail.com

Project Link: [https://github.com/codedbx/one-news-hub](https://github.com/codedbx/one-news-hub)
