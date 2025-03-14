# Sports Team Management Application

This application is a full-stack project built with [NestJS](https://docs.nestjs.com/) (backend) and [React](https://react.dev/) (frontend) for managing teams in a league. It allows users to view, add, and delete teams.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Architecture](#architecture)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Running Tests](#running-tests)
-   [Design Patterns and Reasoning](#design-patterns-and-reasoning)
-   [Future Improvements](#future-improvements)

## Project Overview

This project aims to provide a simple yet functional application for managing teams in a league. It consists of a backend API built with NestJS and a frontend user interface built with React. The backend fetches initial team data from an external API (TheSportsDB API) and stores it locally. Users can then add new teams and delete existing teams through the frontend interface.

## Features

-   **View Teams:** Displays a list of teams with their logos, names, and stadiums.
-   **Add Teams:** Allows users to add new teams with a form.
-   **Delete Teams:** Enables users to delete existing teams.
-   **Real-time Updates:** The frontend updates dynamically when teams are added or deleted.
-   **Error Handling:** Provides informative error messages for API failures and invalid inputs.

## Architecture

The application follows a modular architecture with a clear separation between the frontend and backend:

-   **Backend (NestJS):**
    -   Handles API requests for fetching, creating, and deleting teams.
    -   Fetches initial team data from TheSportsDB API.
    -   Stores team data in an in-memory array (for simplicity).
-   **Frontend (React):**
    -   Provides a user interface for interacting with the backend API.
    -   Displays a list of teams and a form for adding new teams.
    -   Manages application state using React hooks.

## Getting Started

### Prerequisites

-   [Node.js (>= 18.0)](https://nodejs.org/en/download)
-   npm or yarn
-   Git

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/brennosalves/app-sport.git
    cd app-sport
    ```

2.  Install dependencies for both the backend and frontend:

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install 
    cd ..
    ```

### Running the Application

1.  Start the backend:

    ```bash
    cd backend
    npm run start
    ```

2.  Start the frontend:

    ```bash
    cd ../frontend
    npm run build
    npm run start
    ```

    The application will be available at `http://localhost:3000`.

## Backend Setup

For detailed information about the backend setup, API endpoints, and architecture, please refer to the [backend README](./backend/README.md).

## Frontend Setup

For detailed information about the frontend setup, components, and architecture, please refer to the [frontend README](./frontend/README.md).

## Running Tests

To run tests for both the backend and frontend:

-   **Backend Tests:**

    ```bash
    cd backend
    npm run test
    ```

-   **Frontend Tests:**

    ```bash
    cd ../frontend
    npm run test
    ```


## Design Patterns and Reasoning

-   **Service Layer (Backend):** The `TeamsService` implements the service layer pattern, encapsulating business logic and data access.
-   **Component-Based Architecture (Frontend):** The frontend uses React's component-based architecture for reusability and maintainability.
-   **Dependency Injection (Backend):** NestJS's dependency injection system manages dependencies between modules.
-   **State Management (Frontend):** React's `useState` hook is used for local component state management.
-   **DTOs (Backend):** Data Transfer Objects are used for data validation and consistency.
-   **Exception Filters (Backend):** Used to handle errors and provide consistent error responses.
-   **Fetch API (Both):** Used for making HTTP requests.

## Future Improvements

-   **Database Integration:** Replace the in-memory array with a persistent database.
-   **Authentication and Authorization:** Add security measures to protect the API.
-   **API Documentation:** Generate API documentation using Swagger or OpenAPI.
-   **Enhanced Validation:** Implement more comprehensive validation rules.
-   **Environment Variables:** Move configuration settings to environment variables.
-   **State Management Library (Frontend):** Consider using Redux or Context API for more complex state management.
-   **Routing (Frontend):** Implement client-side routing with React Router.
-   **UI/UX Enhancements:** Improve the user interface and user experience.
