# Maths2Fun - Interactive Math Learning Platform

[![Next.js Version](https://img.shields.io/badge/Next.js-14.0.6-blue)](https://nextjs.org/)
[![Firebase Version](https://img.shields.io/badge/Firebase-11.3.0-orange)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Maths2Fun is an engaging educational platform designed to make mathematics learning interactive and fun through puzzles, quizzes, and challenges. Suitable for learners of all ages and skill levels.

![Maths2Fun Demo](https://maths2fun.com/) <!-- Add actual demo GIF link -->

## Features

### Core Features
- 🧩 Interactive math puzzles and brain teasers
- ⚖️ Equation balancing challenges
- 🔢 Number sequence recognition
- 🏆 Achievement system with progress tracking
- 🔐 User authentication with Firebase
- 📱 Responsive design for all devices

### Interactive Puzzles
| Puzzle | Description | Category |
|--------|-------------|----------|
| Equation Balancer | Balance chemical equations by adjusting coefficients | Science/Math |
| Prime Hunt | Identify prime numbers against the clock | Number Theory |
| Math Path Finder | Create valid equations using number paths | Algebra |
| Fibonacci Quest | Complete Fibonacci sequences | Number Patterns |
| Math Match | Match numbers with equivalent expressions | Arithmetic |

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form

**Backend Services:**
- Firebase Authentication
- Firebase Realtime Database
- Nodemailer (Contact forms)

**Libraries:**
- react-confetti
- framer-motion (Animations)
- lucide-react (Icons)
- howler.js (Sound effects)

## Getting Started

### Prerequisites
- Node.js v18+
- Firebase project
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/maths2fun.git
cd maths2fun
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Environment Setup
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
# Add other Firebase environment variables
```

### Running the App
```bash
npm run dev
# or
yarn dev
```

## Configuration

### Firebase Setup
1. Create a Firebase project
2. Enable Authentication methods (Email/Google)
3. Add web app configuration to environment variables

### Email Configuration (Optional)
For contact form functionality:
```env
EMAIL_SERVER_HOST=your_smtp_host
EMAIL_SERVER_PORT=465
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_password
```

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Create production build |
| `start` | Start production server |
| `lint` | Run ESLint checks |
| `prettier` | Format code (add to package.json) |

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Next.js team for the amazing framework
- Firebase for authentication services
- Tailwind CSS for utility-first styling
- React community for ecosystem support

---

**Happy Learning!** 🚀 [Visit Maths2Fun](https://maths2fun.com)
