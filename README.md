# Express TypeScript Starter

A comprehensive template for building robust and scalable REST APIs with Node.js (Express), TypeScript, and a suite of well-integrated tools and best practices.

## Features

- **TypeScript:** Leverage TypeScript for type-safe coding in Node.js.
- **Express:** Build RESTful APIs with the Express framework.
- **PostgreSQL & Objection:** Use PostgreSQL for your database needs and Objection as an ORM.
- **Middleware:**
  - **CORS:** for handling cross-origin requests.
  - **Morgan:** for logging HTTP requests.
  - **Winston:** for logging application events.
- **Bcrypt:** For securely hashing passwords.
- **JSON Web Tokens (JWT):** For authentication and authorization.
- **Dotenv:** For managing environment variables.
- **Moment.js:** For working with dates and times.
- **Code quality tools:**
  - **ESLint:** with Airbnb configurations for linting and enforcing code style.
  - **Prettier:** for code formatting.
  - **Markdownlint:** for linting Markdown files.
  - **Cspell:** for spell checking.
  - **Husky:** for Git hooks automation.
  - **Lint staged:** for running linters against staged git files.

## Environment Variables

This project employs a structured approach to manage environment variables, ensuring type safety, validation, and ensuring different environments (development, production, staging) are managed efficiently.

### Key Files

- **Interface: `src/interfaces/app.interface.ts`**
  - Defines the `EnvVariables` interface, outlining the expected structure of environment variables.
- **Configuration File: `src/config/env.ts`**
  - Loads and validates environment variables.
  - Exports a default object containing validated variables for use throughout the application.

### Environment-Specific Files

- **Base File: `.env`**
  - Contains a single variable: `NODE_ENV`
  - Specifies the current environment (development, production, staging).
- **Environment-Specific Files:**
  - `.env.development`
  - `.env.staging`
  - `.env.production`
  - Hold environment variables specific to their respective environments.

### Loading and Validation

- The `dotenv` package is used to load environment variables from the appropriate `.env` file based on the NODE_ENV value.
- The `Joi` validation library ensures that loaded variables adhere to the defined schema in the `EnvVariables` interface.
- If validation fails, an error is thrown, preventing application startup.

### Accessing Variables

Imported variables from `src/config/env.ts` are accessed throughout the application using `dot` notation

```typescript
import { env } from '@src/config'; // Improt env in any file

console.log(env.port); // Usage using dot notation
```

## Installation

- Clone the repository

```bash
git clone https://github.com/mfaizshahid/express-typescript-starter.git
```

- Install dependencies

```bash
cd express-typescript-starter
npm install
```

- Start project in development mode

```bash
npm run dev
```

- Start project in production mode

```bash
npm run start
```

## Scripts

- `npm run dev`: Starts the development server with hot reloading using nodemon.
- `npm run start`: Builds the application and starts the server.
- `npm run build`: Builds the application for production.
- `npm run clean`: Cleans the build output.
- `npm run check:format`: Checks code formatting with Prettier.
- `npm run check:lint`: Check code lint with ESLint.
- `npm run check:packagejson`: Check package.json linting
- `npm run check:markdown`: Check markdown files linting
- `npm run check:spelling`: Check code spelling
- `npm run check:staged`: Check staged files
- `npm run fix:format`: Automatically fixes code formatting issues.
- `npm run fix:lint`: Automatically fixes linting issues.
