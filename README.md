# Absinthe Backend

## Overview

Absinthe Backend is a TypeScript REST API built with Express.js that interacts with a PostgreSQL database. It provides functionality for managing API keys, creating and retrieving projects, distributing points, and querying point data.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

## Features

- API Key Management
- Project Creation and Retrieval
- Point Distribution
- Querying Point Data
- Database Interactions via SQL queries

## Installation

1. Clone the repository:

```
git clone https://github.com/venkateshSV/absinthe-backend.git
```

2. Navigate to the project directory:

```
cd absinthe-backend
```

3. Install dependencies:

```
npm install
```

4. Configuration
   Environment variables should be set in a `.env` file. The following variables are used:

| Variable                 | Description                                |
| ------------------------ | ------------------------------------------ |
| PORT                     | Server port number                         |
| POSTGRES_URL             | URL for standard database connection       |
| POSTGRES_PRISMA_URL      | URL for Prisma to connect to the database  |
| POSTGRES_URL_NO_SSL      | URL without SSL for non-secure connections |
| POSTGRES_URL_NON_POOLING | URL for non-pooling connections            |
| POSTGRES_USER            | Database username                          |
| POSTGRES_HOST            | Database host                              |
| POSTGRES_PASSWORD        | Database password                          |
| POSTGRES_DATABASE        | Database name                              |

5. Start the server

```
npm run build && npm start
```

The server should start at the assigned `PORT`

## Endpoints

### API Keys

- `/api/api-key/create`: Create a new API key
- `/api/api-key/valid`: Validate an existing API key
- `/api/api-key/get-all-projects/:apiKey`: Retrieve all projects associated with an API key

### Projects

- `/api/api-key/project/create`: Associate an API key with a project

### Points

- `/api/points/distribute`: Distribute points to a specific wallet address
- `/api/points/get-points-data`: Retrieve point data based on various criteria

[Postman Collection](https://drive.google.com/file/d/1IIWQy47xpY_BTW24yagwNCOqMDlHYIdd/view?usp=sharing) for the above endpoints.

## Database Schema

The database schema includes two tables:

1. `api_keys`:

   - `id`: Unique identifier
   - `api_key`: Generated unique API key
   - `project_id`: Associated project ID (if applicable)

2. `pointsdata`:
   - `id`: Unique identifier
   - `project_id`: Foreign key referencing `api_keys`
   - `event_name`: Event name for point distribution
   - `wallet_address`: Wallet address receiving points
   - `points`: Number of points distributed
