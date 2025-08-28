# Tritorc Product Feedback Web Application

A comprehensive, production-ready feedback collection system built with Next.js, TypeScript, Node.js/Express, and PostgreSQL.

## 🚀 Features

### Frontend
- **Multi-step Form**: Intuitive 4-step feedback collection process
- **Interactive Ratings**: Visual 1-10 rating sliders with color-coded feedback
- **Real-time Validation**: Form validation with error handling
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Professional UI**: Clean, corporate design with Tritorc branding
- **Loading States**: Smooth animations and loading indicators

### Backend
- **Node.js/Express API**: Complete REST endpoints for feedback management
- **PostgreSQL Database**: Direct PostgreSQL integration with connection pooling
- **Data Validation**: Server-side validation with Zod schemas
- **Error Handling**: Comprehensive error management
- **Security**: CORS, Helmet, and input validation
- **Logging**: Morgan HTTP request logging

### Admin Dashboard
- **Feedback Management**: View, search, and delete feedback
- **Analytics**: Average ratings and key metrics
- **Data Export**: CSV export functionality
- **Real-time Updates**: Live data synchronization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL with pg driver
- **Validation**: Joi (backend), Zod (frontend), React Hook Form
- **UI Components**: Shadcn/ui, Framer Motion
- **Styling**: Tailwind CSS with custom design system

## 📋 Form Fields

The feedback form collects the following information:

### Contact Information
- Primary Email (pre-filled: ishaan.shrivastava@tritorc.com)
- Date (auto-populated)
- Secondary Email
- Contact Name
- Company Name
- Country (dropdown selection)

### Product Ratings (1-10 scale)
- Tool Build Quality
- Packaging
- On-Time Delivery
- After Sales Support
- Product Usability
- Recommendation Likelihood

### Additional Feedback
- Suggestions and Comments (required, min 10 characters)

## 🗄️ Database Schema

```sql
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  email_id VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  tool_build_quality INTEGER CHECK (tool_build_quality >= 1 AND tool_build_quality <= 10),
  packaging INTEGER CHECK (packaging >= 1 AND packaging <= 10),
  on_time_delivery INTEGER CHECK (on_time_delivery >= 1 AND on_time_delivery <= 10),
  after_sales_support INTEGER CHECK (after_sales_support >= 1 AND after_sales_support <= 10),
  product_usability INTEGER CHECK (product_usability >= 1 AND product_usability <= 10),
  recommendation_likelihood INTEGER CHECK (recommendation_likelihood >= 1 AND recommendation_likelihood <= 10),
  suggestions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Setup Instructions

### 1. PostgreSQL Database Setup

1. Install PostgreSQL on your system
2. Create a new database:
```sql
CREATE DATABASE tritorc_feedback;
```

3. Run the migration script:
```bash
psql -d tritorc_feedback -f server/src/database/migrations.sql
```

### 2. Backend Environment Configuration
Create a `server/.env` file based on `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tritorc_feedback
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Environment Configuration
Create a `.env.local` file based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Install Dependencies

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
cd server && npm install
```

### 5. Run Development Servers

Option 1 - Run both frontend and backend together:
```bash
npm run dev:full
```

Option 2 - Run separately:

Frontend:
```bash
npm run dev
```

Backend (in another terminal):
```bash
npm run server:dev
```

## 📡 API Endpoints

### Feedback Management
- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Retrieve all feedback (admin)
- `GET /api/feedback/analytics` - Get analytics data
- `GET /api/feedback/:id` - Get specific feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback
- `GET /health` - Health check endpoint

### Example Request
```javascript
// Submit feedback
const response = await fetch('http://localhost:5000/api/feedback', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(feedbackData)
});
```

## 🎨 Design Features

### Color System
- **Primary**: Blue tones for corporate branding
- **Secondary**: Gray scale for professional look
- **Accent**: Green/Yellow/Red for rating indicators
- **Interactive**: Hover effects and smooth transitions

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Accessibility
- WCAG compliance
- Keyboard navigation
- Screen reader support
- High contrast ratios

## 🔐 Security Features

### Database Security
- PostgreSQL constraints and validations
- Input validation and sanitization
- SQL injection prevention
- Data type constraints
- Connection pooling for performance

### Form Security
- Client and server-side validation
- XSS protection
- CSRF protection via Next.js
- Helmet.js security headers
- CORS configuration

## 📊 Admin Features

### Dashboard Analytics
- Total feedback count
- Average ratings across all categories
- Overall satisfaction score
- Response trends

### Data Management
- Search and filter functionality
- Detailed feedback view
- CSV export with full data
- Bulk operations support

## 🚀 Deployment

### Frontend Build for Production
```bash
npm run build
npm run start
```

### Backend Build for Production
```bash
npm run server:build
npm run server:start
```

### Production Deployment
- **Frontend**: Deploy to Netlify, Vercel, or any static hosting provider
- **Backend**: Deploy to Heroku, DigitalOcean, AWS, or any Node.js hosting provider
- **Database**: Use managed PostgreSQL services like AWS RDS, Google Cloud SQL, or DigitalOcean Managed Databases

## 🎯 Business Impact

### Customer Insights
- Comprehensive product feedback collection
- Service quality assessment
- Customer satisfaction tracking
- Actionable improvement suggestions

### Operational Benefits
- Automated feedback processing
- Real-time analytics dashboard
- Data export for reporting
- Scalable architecture

## 🔧 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Modify logo and company information
- Customize welcome message

### Form Fields
- Add new fields to both frontend (Zod) and backend (Joi) validation schemas
- Update database schema with new columns
- Modify rating scales or categories
- Customize form flow and steps

### Analytics
- Add new metrics to admin dashboard
- Integrate with external analytics tools
- Create custom reports
- Extend the analytics endpoint in the backend

## 🏗️ Architecture

### Frontend (Next.js)
- **Components**: Reusable UI components with TypeScript
- **Pages**: Main application pages and routing
- **API Client**: Centralized API communication layer
- **Validation**: Zod schemas for form validation
- **Styling**: Tailwind CSS with custom design system

### Backend (Node.js/Express)
- **Controllers**: Request handling and business logic
- **Models**: Database interaction layer
- **Routes**: API endpoint definitions
- **Middleware**: Error handling, CORS, security
- **Validation**: Joi schemas for request validation
- **Database**: PostgreSQL with connection pooling

## 📞 Support

For technical support or customization requests, contact the development team.

---

Built with ❤️ for Tritorc - Empowering customer feedback and continuous improvement.