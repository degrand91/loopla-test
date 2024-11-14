# Loopla Challenge

A Rate widget component that pulls data from a rates API
(http://api.exchangeratesapi.io/v1/)
Demo: https://loopla-test.vercel.app

## Features

This project uses [shadcn](https://github.com/shadcn)'s Next.js app structure from [shadcn/ui](https://ui.shadcn.com/).

- Next.js 14+ `/app` router
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI + Tailwind)
- Prettier (w/ auto sort imports and tailwind classes)
- Typesafe env, and config

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) – [Download Node.js](https://nodejs.org)
- **npm** (included with Node) or **Yarn** as a package manager
- **Git** for version control – [Download Git](https://git-scm.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/degrand91/loopla-test.git
   cd loopla-test
   ```

2. **Install dependencies**

```bash
npm install
```

3. **Create the env file**

Create a .env.local file in the root directory to configure environment variables. Use the provided .env.example file as a template:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
EXCHANGE_API_URL=https://api....
EXCHANGE_API_KEY=d1.....
CACHE_TTL=86400
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
2. Build your container: `docker build -t nextjs-docker .`.
3. Run your container: `docker run -p 3000:3000 nextjs-docker`.
