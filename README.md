# Job-Portal

A modern, secure fullstack job portal application built with React (Vite) frontend and Spring Boot backend, featuring role-based authentication, comprehensive job management capabilities, and interactive API documentation through Swagger UI.

## 🌐Live URLs
- **Frontend**: [https://job-p0rtal.netlify.app](https://job-p0rtal.netlify.app)
- **Backend API**: [https://job-portal-xchv.onrender.com/swagger-ui/index.html](https://job-portal-xchv.onrender.com/swagger-ui/index.html)

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐
│                 │ ←─────────────────→ │                 │
│  React Frontend │                     │ Spring Boot API │
│   (Vite Build)  │                     │    Backend      │
│                 │                     │                 │
└─────────────────┘                     └─────────────────┘
                                                │
                                                ▼
                                        ┌─────────────────┐
                                        │  MySQL Database │
                                        └─────────────────┘
```

## 🚀 Features

### 🎨 Frontend Features
- **Modern React UI**: Built with React 18+ and Vite for fast development
- **Responsive Design**: Mobile-first approach with modern CSS/styling
- **Role-based Navigation**: Dynamic UI based on user roles (Admin, Recruiter, Candidate)
- **Interactive Job Search**: Real-time filtering and search capabilities
- **Application Management**: Seamless job application process
- **Protected Routes**: Client-side route protection based on authentication
- **Toast Notifications**: User-friendly feedback system
- **Modern State Management**: Efficient state handling with React hooks

### 🔐 Backend Features
- **JWT-based Authentication**: Secure user authentication using JSON Web Tokens
- **Role-based Access Control**: Granular permissions for Admin, Recruiter, and Candidate roles
- **Protected API Endpoints**: Ensures only authorized users can access specific resources
- **RESTful API Design**: Clean, standardized API endpoints
- **Swagger Documentation**: Interactive API documentation

### 👥 User Roles & Capabilities
- **Candidates**: Job search, application submission, and profile management
- **Recruiters**: Job posting, applicant management, and company profile management
- **Admins**: User management (view/block), system analytics, and job moderation

### 🔍 Job Management System
- **Advanced Job Search**: Frontend and backend support filtering by title, location, company, salary range
- **Job Listings with Pagination**: Efficient retrieval and display of job data
- **Real-time Application Tracking**: Full-stack application status management
- **Interactive Job Details**: Comprehensive job information display

## 🛠️ Tech Stack

### Frontend
- **React 18+**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing for SPA navigation
- **Axios**: HTTP client for API communication
- **CSS Modules/Styled Components**: Modern styling approach
- **ESLint & Prettier**: Code quality and formatting tools

### Backend
- **Spring Boot 3.2+**: Framework for building robust, production-ready applications
- **Java 17+**: Core programming language with modern features
- **Spring Security 6**: For authentication and authorization
- **Spring Data JPA**: For database operations and ORM
- **JWT (JSON Web Tokens)**: For secure, stateless authentication
- **Swagger/OpenAPI 3**: For interactive API documentation
- **MySQL**: Primary database (configurable for other databases)
- **Maven**: Dependency management and build tool

## 📋 Prerequisites

Before running the application, ensure you have:

1. **Node.js 16+** and **npm/yarn** (for frontend)
2. **Java Development Kit (JDK) 17 or higher** (for backend)
3. **Maven 3.6+** (or use the included Maven Wrapper)
4. **MySQL 8.0+** (or your chosen relational database)
5. **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd joblisting
```

### 2. Backend Setup

#### Database Configuration
Create a MySQL database:

```sql
CREATE DATABASE joblisting;
CREATE USER 'joblisting_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON joblisting.* TO 'joblisting_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Configure Backend Properties
Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
spring.application.name=joblisting_backend

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/joblisting
spring.datasource.username=joblisting_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# JWT Configuration
jwt.secret=YourSuperSecretKeyThatIsAtLeast256BitsLongAndShouldBeStoredSecurelyInProduction
jwt.expiration=86400000

# CORS Configuration for Frontend
cors.allowed.origins=http://localhost:5173

# Swagger Configuration
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.enabled=true
```

#### Install Backend Dependencies & Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3. Frontend Setup

#### Configure Environment Variables
Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=JobListing Portal
```

#### Install Frontend Dependencies & Run

```bash
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

### Swagger UI Access
Once the backend is running, access the interactive API documentation at:
**🌐 Swagger UI**: http://localhost:8080/swagger-ui/index.html

### Key API Endpoints

#### Authentication Endpoints
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
```

#### Job Management Endpoints
```
GET    /api/jobs/public            - Get all jobs (public access)
GET    /api/jobs/public/{id}       - Get job details (public access)
GET    /api/jobs/public/search     - Search jobs with filters
POST   /api/jobs/recruiter         - Create job (recruiter only)
PUT    /api/jobs/recruiter/{id}    - Update job (recruiter only)
DELETE /api/jobs/recruiter/{id}    - Delete job (recruiter only)
```

#### Application Management Endpoints
```
POST   /api/applications/candidate/apply       - Apply for job
GET    /api/applications/candidate             - Get candidate applications
GET    /api/applications/recruiter/job/{jobId} - Get job applications
PUT    /api/applications/recruiter/{id}/status - Update application status
```

## 🔧 Development Workflow

### Running in Development Mode

1. **Start Backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Applications**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui/index.html

### Testing Demo Accounts

#### Admin Account
```json
{
  "email": "admin@gmail.com",
  "password": "admin123",
  "role": "ADMIN"
}
```

#### Recruiter Account
```json
{
  "email": "recruiter1@company.com",
  "password": "recruiter123",
  "role": "RECRUITER"  
}
```

#### Candidate Account
```json
{
  "email": "candidate1@email.com",
  "password": "candidate123",
  "role": "CANDIDATE"
}
```

## 📝 API Testing

### Using curl
```bash
# Login to get JWT token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Use token to access protected endpoints
curl -X GET http://localhost:8080/api/jobs/recruiter \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```


## 👥 Authors

### Frontend Developer
- **Iffat Patel**: [https://github.com/iffat1404](https://github.com/iffat1404)
   - React Frontend Development
   - UI/UX Implementation
   - State Management & Routing

### Backend Developer
- **Riddhi Patil**: [https://github.com/riddhipatil19](https://github.com/riddhipatil19)
   - Spring Boot API Development
   - Database Design & Implementation
   - Authentication & Security

---