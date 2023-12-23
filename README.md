# Ed-Tech-Platform 
This is a starter pack for creating React projects with Tailwind CSS configured. It uses React version **18.2** and Tailwind CSS version **3.2**.
## Features

### Authentication

- User registration and login functionality.
- Secure password storage using bcrypt.
- JSON Web Token (JWT) based authentication for secure communication between client and server.

### Authorization

- Role-based access control (RBAC) for distinguishing between students and instructors.
- Protected routes and actions based on user roles.

### Email Verification

- Email verification for new user accounts.
- Secure confirmation process to ensure valid and active user accounts.

### Form Handling

- Form validation for user input.
- User-friendly error messages for form submissions.

### File Handling

- File upload functionality for course content (videos, documents, etc.).
- Secure file storage and retrieval.

### Upload Course

- Instructors can easily upload new courses.
- Provide relevant details such as course title, description, and content files.

### Edit Course

- Instructors can edit existing course details.
- Update course information, add new content, or modify existing content.

### Watch Progress

- Track and display the user's progress in watching a course.
- Resume functionality for users to continue from where they left off.

### Razorpay Integration

- Seamless integration with Razorpay for course payments.
- Secure and reliable payment processing.

### Interactive Tracker

- Visual representation of course progress for students.
- Intuitive tracker to show completed sections, quizzes, or assignments.

### Modal Handling

- Modal components for interactive and responsive user interfaces.
- Use modals for actions like course purchase confirmation or editing course details.

## Tech Stack

- **MERN Stack:**
  - MongoDB: Database for storing course and user data
  - Express.js: Backend framework for handling server-side logic
  - React.js: Frontend library for building user interfaces
  - Node.js: JavaScript runtime for server-side execution

- **Nodemailer:**
  - Email sending functionality for user registration and verification.
  - Notification emails for various user actions.

- **bcrypt:**
  - Password hashing for secure storage of user credentials.
  - Enhanced security for user authentication.

- **Cloudinary:**
  - Cloud-based file storage for handling uploaded course content.
  - Seamless integration for secure and scalable file handling.

- **JWT Token:**
  - JSON Web Token-based authentication for secure communication between client and server.
  - Efficient and secure way to handle user authentication.

- **React Redux Toolkit:**
  - State management for React applications.
  - Efficient handling of complex application state, including user authentication, course data, and UI state.



Usage
For Students
Register or log in to your account.
Browse available courses.
Purchase a course.
Access purchased courses in your dashboard.
Start watching courses.
For Instructors
Register or log in to your instructor account.
Navigate to the instructor dashboard.
Add a new course with relevant details.
Update or delete existing courses as needed.
Tech Stack
MongoDB: Database for storing course and user data
Express.js: Backend framework for handling server-side logic
React.js: Frontend library for building user interfaces
Node.js: JavaScript runtime for server-side execution
Contributing
We welcome contributions! If you'd like to contribute, please follow our contribution guidelines.

License
This project is licensed under the MIT License - see the LICENSE file for details.




