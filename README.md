# Blog Form Application

A React application that demonstrates secure form submission with CSRF protection and Basic Authentication.

## API Endpoints

The application interacts with two main endpoints:

### 1. CSRF Token Endpoint
```
GET https://java-mongo.onrender.com/api/csrf
```

**Headers Required:**
- Accept: */*
- User-Agent: Custom Client
- Authorization: Basic Authentication

**Authentication:**
- Type: Basic Authentication
- Username: user
- Password: password

### 2. Blog Form Submission Endpoint
```
POST https://java-mongo.onrender.com/api/blog-forms
```

**Headers Required:**
- Accept: */*
- User-Agent: Custom Client
- X-XSRF-TOKEN: [token from CSRF endpoint]
- Content-Type: application/json
- Authorization: Basic Authentication

**Authentication:**
- Type: Basic Authentication
- Username: user
- Password: password

**Request Body Schema:**
```json
{
    "email": "string",
    "fullName": "string",
    "description": "string",
    "country": "string"
}
```

## Technical Implementation

### Security Features
- CSRF Protection using tokens
- Basic Authentication
- Secure form submission
- Error handling and validation

### Technologies Used
- React 18.3.1
- TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

### Key Components
- Form validation and handling
- Error state management
- Loading states
- Responsive design
- API integration with CSRF protection

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Form Fields

The form collects the following information:
- Email (required)
- Full Name (required)
- Description (required)
- Country (required)

## Error Handling

The application includes comprehensive error handling:
- CSRF token fetch failures
- Form submission errors
- Network errors
- API response validation
- User feedback through UI messages

## UI Features
- Responsive design
- Loading states
- Success/Error messages
- Clean and modern interface
- Gradient background
- Card-based layout
- Icon integration

## Development Notes

### API Communication Flow
1. Fetch CSRF token
2. Validate token presence
3. Submit form data with token
4. Handle response/errors

### Security Considerations
- All requests include Basic Authentication
- CSRF token validation
- Secure headers implementation
- Cross-Origin Resource Sharing (CORS) handling

## Project Structure
```
src/
  ├── App.tsx         # Main application component
  ├── main.tsx        # Application entry point
  ├── index.css       # Global styles
  └── vite-env.d.ts   # TypeScript declarations
```

## Configuration Files
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration