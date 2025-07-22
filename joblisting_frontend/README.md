# Job Portal Frontend

A modern, responsive job portal application built with React, Vite, and Tailwind CSS. This application provides a complete job search and recruitment platform with role-based access control for candidates, recruiters, and administrators.

## 🚀 Features

### For Candidates
- Browse and search job listings with advanced filters
- Apply for jobs with cover letters
- Track application status in real-time
- Manage personal profile and skills
- Responsive dashboard with application analytics

### For Recruiters
- Post and manage job listings
- Review and manage job applications
- Update application status (pending, interview, accepted, rejected)
- Company profile management
- Analytics dashboard for job postings

### For Administrators
- User management with enable/disable functionality
- System-wide analytics and statistics
- Monitor platform health and activity
- Role-based access control

### General Features
- **Authentication**: JWT-based secure authentication
- **Role-based Access**: Different interfaces for candidates, recruiters, and admins
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Voice Commands**: Navigate using voice commands (experimental)
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Toast notifications for user feedback
- **Search & Filters**: Advanced filtering for jobs and applications

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Authentication**: JWT with automatic token management
- **Icons**: FontAwesome
- **UI Components**: Radix UI
- **Notifications**: React Toastify

## 📁 Project Structure

\`\`\`
src/
├── components/          # Reusable UI components
│   ├── ApplicationCard.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── JobCard.jsx
│   ├── LoadingSpinner.jsx
│   ├── ProtectedRoute.jsx
│   ├── RoleBasedRoute.jsx
│   └── Sidebar.jsx
├── layouts/            # Layout components
│   ├── DashboardLayout.jsx
│   └── PublicLayout.jsx
├── pages/              # Page components
│   ├── candidate/      # Candidate-specific pages
│   ├── recruiter/      # Recruiter-specific pages
│   ├── admin/          # Admin-specific pages
│   ├── JobDetails.jsx
│   ├── JobListings.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Page404.jsx
│   └── Register.jsx
├── services/           # API service functions
│   ├── adminService.js
│   ├── api.js
│   ├── applicationService.js
│   ├── authService.js
│   ├── jobService.js
│   └── profileService.js
├── store/              # Zustand state management
│   ├── applicationStore.js
│   ├── authStore.js
│   ├── jobStore.js
│   └── themeStore.js
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
\`\`\`

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd job-portal-frontend
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Create a `.env` file in the root directory:
   \`\`\`env
   REACT_APP_API_URL=http://localhost:8080
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` directory.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:8080` |

### API Integration

The frontend expects the backend API to be running with the following endpoints:

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Jobs
- `GET /api/jobs/public` - Get all jobs (public)
- `GET /api/jobs/public/{id}` - Get job details
- `GET /api/jobs/public/search` - Search jobs
- `POST /api/jobs/recruiter` - Create job (recruiter)
- `GET /api/jobs/recruiter` - Get recruiter jobs
- `PUT /api/jobs/recruiter/{id}` - Update job
- `DELETE /api/jobs/recruiter/{id}` - Delete job

#### Applications
- `POST /api/applications/candidate/apply` - Apply for job
- `GET /api/applications/candidate` - Get candidate applications
- `GET /api/applications/recruiter/job/{jobId}` - Get job applications
- `PUT /api/applications/recruiter/{id}/status` - Update application status

#### Profiles
- `GET /api/profile/candidate` - Get candidate profile
- `PUT /api/profile/candidate` - Update candidate profile
- `GET /api/profile/recruiter` - Get recruiter profile
- `PUT /api/profile/recruiter` - Update recruiter profile

#### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/dashboard` - Get dashboard stats
- `PUT /api/admin/users/{userId}/toggle-status` - Toggle user status

## 🎨 Theming

The application supports both light and dark themes. The theme preference is stored in localStorage and persists across sessions.

### Customizing Themes

Modify the theme colors in `tailwind.config.js`:

\`\`\`javascript
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      }
    }
  }
}
\`\`\`

## 🔐 Authentication Flow

1. **Login**: User provides credentials, receives JWT token
2. **Token Storage**: JWT stored in Zustand store with localStorage persistence
3. **Auto-refresh**: Token expiration checked on each request
4. **Route Protection**: Protected routes redirect to login if token invalid
5. **Role-based Access**: Different UI components based on user role

## 🧪 Testing the Application

### Manual Testing Checklist

#### Authentication
- [ ] Register new users (candidate, recruiter, admin)
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Logout functionality
- [ ] Token expiration handling

#### Candidate Flow
- [ ] Browse job listings
- [ ] Search and filter jobs
- [ ] View job details
- [ ] Apply for jobs
- [ ] View application status
- [ ] Update profile

#### Recruiter Flow
- [ ] Create job postings
- [ ] Edit job postings
- [ ] Delete job postings
- [ ] View job applications
- [ ] Update application status
- [ ] Update company profile

#### Admin Flow
- [ ] View dashboard statistics
- [ ] Manage users
- [ ] Enable/disable user accounts
- [ ] View system analytics

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Netlify

1. **Build the project**: `npm run build`
2. **Deploy the `dist` folder to Netlify**
3. **Configure environment variables**

### Docker

\`\`\`dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include steps to reproduce the problem
4. Provide browser and system information

## 🔮 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] File upload for resumes and company logos
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Advanced search with Elasticsearch
- [ ] Video interview integration
- [ ] Salary insights and trends

---

**Happy Coding! 🎉**
