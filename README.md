This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/) (recommended version 16.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/deshmukhpurushothaman/kgk-cms.git
   cd kgk-cms
   ```

2. **Install dependencies:**

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory and add the following environment variables. Update the values as necessary for your local setup.

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database configuration
DATABASE_URL=your_database_url
DATABASE_HOST=your_database_host
DATABASE_PORT=your_database_port
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
```

## Running the Development Server

Start the development server with the following command:

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000. Open this URL in your browser to view the project.
