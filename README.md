# Hirely Consultants - Employee Management System

[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://material.angular.io/)
[![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=white)](https://github.com/typicode/json-server)

A modern, feature-rich employee management system built with Angular 17+, Material UI, and TypeScript. This application demonstrates advanced Angular concepts, state management, HTTP interceptors, custom components, and modern UI/UX practices.

## 🚀 Live Demo

The application provides a complete CRUD interface for managing employees with real-time API integration and modern toast notifications.

## ✨ Key Features

### 🏢 Employee Management

- **Complete CRUD Operations**: Create, Read, Update, and Delete employees
- **Advanced Data Table**: Sortable columns, pagination, and real-time search
- **Form Validation**: Comprehensive client-side validation with error handling
- **Modal Interface**: Beautiful, responsive modals for adding/editing employees
- **Confirmation Dialogs**: User-friendly delete confirmation with modern design

### 🎨 Modern UI/UX

- **Material Design 3**: Latest Material UI components and theming
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Custom Toast Notifications**: Modern toast system with animated progress bars
- **Loading Indicators**: Global loading state management with smooth animations
- **Glassmorphism Effects**: Modern backdrop blur and transparency effects
- **Color-coded Status**: Visual indicators for employee status and actions

### 🔧 Technical Excellence

- **HTTP Interceptors**: Global request/response handling with logging and error management
- **State Management**: Efficient data flow and state synchronization
- **TypeScript**: Full type safety with custom interfaces and models
- **Reactive Forms**: Angular reactive forms with custom validation
- **Standalone Components**: Modern Angular architecture without NgModules
- **Custom Services**: Modular service architecture for scalability

### 📊 Data Features

- **Real-time Search**: Instant filtering across all employee fields
- **Dynamic Sorting**: Click column headers to sort data
- **Pagination**: Efficient data pagination with customizable page sizes
- **Data Persistence**: Full CRUD operations with JSON Server backend
- **Optimistic Updates**: UI updates immediately with API synchronization

### 🛠 Developer Features

- **HTTP Request Logging**: Comprehensive request/response logging in console
- **Error Handling**: Global error handling with user-friendly messages
- **Loading States**: Request-level loading indicators
- **API Integration**: RESTful API communication with proper error handling
- **Component Demo**: Built-in interceptor demo page for testing features

## 🏗 Project Architecture

```
src/
├── app/
│   ├── components/
│   │   ├── common/
│   │   │   ├── header/                     # Navigation header
│   │   │   ├── loading-indicator/          # Global loading spinner
│   │   │   └── custom-toast/               # Modern toast notifications
│   │   ├── user-table/                     # Main employee data table
│   │   ├── add-employee-modal/             # Employee create/edit modal
│   │   ├── delete-confirmation-dialog/     # Delete confirmation dialog
│   │   └── interceptor-demo/               # Feature demonstration page
│   ├── services/
│   │   ├── user.service.ts                 # Employee data operations
│   │   ├── api-call.service.ts             # HTTP API communication
│   │   ├── notification.service.ts         # Toast notification management
│   │   └── loading.service.ts              # Global loading state
│   ├── interceptors/
│   │   └── http-request.interceptor.ts     # Global HTTP request handling
│   ├── models/
│   │   └── user.model.ts                   # TypeScript interfaces
│   └── app.config.ts                       # Application configuration
├── db.json                                 # JSON Server database
└── styles.scss                             # Global styles and themes
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v8+ recommended)
- **Angular CLI** (v17+)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abdul03829/Hirely-Consultants.git
   cd Hirely-Consultants
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install JSON Server globally (if not already installed)**
   ```bash
   npm install -g json-server
   ```

### 🏃‍♂️ Running the Application

You need to run both the Angular application and the JSON Server simultaneously:

#### Terminal 1: Start JSON Server (Backend API)

```bash
npx json-server --watch db.json --port 3000
```

This will start the API server at `http://localhost:3000`

#### Terminal 2: Start Angular Application (Frontend)

```bash
npm start
```

This will start the Angular app at `http://localhost:4200`

### 📋 Available Scripts

| Command                                       | Description                          |
| --------------------------------------------- | ------------------------------------ |
| `npm start`                                   | Start the Angular development server |
| `npm run build`                               | Build the project for production     |
| `npm test`                                    | Run unit tests                       |
| `npm run lint`                                | Run ESLint for code quality          |
| `npx json-server --watch db.json --port 3000` | Start the JSON Server API            |

## 🎯 Core Functionalities

### 1. Employee Table View

- **Dynamic Data Loading**: Fetches employee data from JSON Server API
- **Real-time Search**: Filter employees by name, email, position, or department
- **Column Sorting**: Click any column header to sort data ascending/descending
- **Pagination**: Navigate through large datasets efficiently
- **Action Buttons**: Quick access to edit and delete operations

### 2. Add New Employee

- **Modal Form Interface**: Clean, accessible form in a modal dialog
- **Field Validation**: Real-time validation for all required fields
- **Custom Input Styling**: Modern form inputs with focus states
- **API Integration**: Saves data to JSON Server and updates UI immediately
- **Success Notifications**: Beautiful toast notification on successful creation

### 3. Edit Employee

- **Pre-filled Forms**: Modal opens with existing employee data
- **Real-time Updates**: Changes reflect immediately in the table
- **Validation**: Same validation rules as create form
- **API Synchronization**: Updates backend data and UI state

### 4. Delete Employee

- **Confirmation Dialog**: Beautiful confirmation dialog with employee details
- **Safe Deletion**: Prevents accidental deletions
- **Immediate UI Update**: Removes employee from table instantly
- **Success Feedback**: Toast notification confirms successful deletion

### 5. HTTP Interceptor System

- **Request Logging**: Logs all outgoing HTTP requests with details
- **Response Logging**: Logs all API responses with timing information
- **Error Handling**: Global error handling with user-friendly messages
- **Loading Management**: Automatic loading indicators for all API calls
- **Header Management**: Adds common headers to all requests

### 6. Toast Notification System

- **Multiple Types**: Success, Error, Warning, and Info notifications
- **Modern Design**: Glassmorphism effects with smooth animations
- **Progress Indicators**: Animated progress bars showing duration
- **Customizable Icons**: Context-appropriate icons for each notification type
- **Auto-dismiss**: Notifications automatically disappear after set duration
- **Manual Dismiss**: Users can close notifications manually

## 🎨 UI/UX Features

### Design System

- **Material Design 3**: Latest Material UI components and guidelines
- **Custom Color Palette**: Purple and blue gradient themes
- **Typography**: Roboto font family with proper hierarchy
- **Spacing**: Consistent spacing using Material Design principles

### Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Adapts beautifully to tablet screens
- **Desktop Experience**: Full-featured desktop interface
- **Flexible Layouts**: CSS Grid and Flexbox for responsive layouts

### Animations & Interactions

- **Smooth Transitions**: All state changes include smooth animations
- **Hover Effects**: Interactive hover states on buttons and rows
- **Loading States**: Skeleton loading and spinner animations
- **Micro-interactions**: Subtle animations for better user feedback

## 🧪 Testing the Features

### Interceptor Demo Page

Navigate to `/demo` to test:

- **Success Requests**: Test successful API calls with notifications
- **Error Handling**: Simulate API errors and see error handling
- **Loading States**: Observe loading indicators during requests
- **Toast Notifications**: Test all notification types and styles

### Employee Operations

1. **Create Employee**: Use the "Add New Employee" button
2. **Search**: Use the search bar to filter employees
3. **Sort**: Click column headers to sort data
4. **Edit**: Click the edit icon on any employee row
5. **Delete**: Click the delete icon and confirm deletion

## 🔧 Technical Implementation Details

### HTTP Interceptor

```typescript
// Automatic request/response logging
// Global error handling
// Loading state management
// Header injection
// Request timing analysis
```

### State Management

```typescript
// Service-based state management
// Reactive data flow with RxJS
// Optimistic UI updates
// Error state handling
```

### Form Validation

```typescript
// Angular Reactive Forms
// Custom validators
// Real-time validation feedback
// Error message customization
```

### API Integration

```typescript
// RESTful API design
// CRUD operations
// Error handling
// Data transformation
```

## 📱 Browser Support

- **Chrome** (Latest)
- **Firefox** (Latest)
- **Safari** (Latest)
- **Edge** (Latest)

## 🏆 Key Technical Achievements

1. **Modern Angular Architecture**: Uses Angular 17+ standalone components
2. **Type Safety**: Comprehensive TypeScript implementation
3. **Performance**: Optimized bundle size and runtime performance
4. **Accessibility**: ARIA labels and keyboard navigation support
5. **Error Handling**: Comprehensive error handling at all levels
6. **Code Quality**: ESLint configuration for consistent code style
7. **Responsive Design**: Mobile-first responsive implementation
8. **User Experience**: Smooth animations and feedback mechanisms

## 📚 Learning Outcomes

This project demonstrates proficiency in:

- **Angular Framework**: Advanced Angular concepts and best practices
- **TypeScript**: Strong typing and interface design
- **HTTP Communication**: RESTful API integration and error handling
- **State Management**: Service-based state management with RxJS
- **UI/UX Design**: Modern interface design with Material UI
- **Form Handling**: Complex form validation and user input management
- **Testing**: Component and service testing strategies
- **Project Structure**: Scalable Angular application architecture

## 🤝 Contributing

This project was built as a demonstration of Angular development skills for interview purposes. The code showcases modern development practices and could serve as a foundation for larger applications.

## 📄 License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

---

**Built with ❤️ using Angular 17+, Material UI, and TypeScript**

_This project demonstrates advanced Angular development skills including HTTP interceptors, custom components, reactive forms, state management, and modern UI/UX design patterns._

````

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
````

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
