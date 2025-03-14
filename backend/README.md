# Backend API for Sport's Team League Management

This document provides information about the backend API built with NestJS for managing teams in a league.

## Architecture Overview

The backend is built using [NestJS](https://docs.nestjs.com/), a progressive [Node.js](https://nodejs.org/en) framework for building efficient and scalable server-side applications. The core functionality revolves around the `TeamsService`, which handles the retrieval, creation, updating, and deletion of team data.  


Key features:

-   **Data Fetching:** Upon the first request for the list of teams, the application fetches team data from the [TheSportsDB API](https://www.thesportsdb.com/api.php). This data is then stored locally in an in-memory array.
-   **CRUD Operations:** The API supports Create, Read, Update, and Delete (CRUD) operations for managing team data.
-   **Validation:** Input validation is implemented to ensure data integrity, including checks for existing teams and required fields.
-   **Error Handling:** Robust error handling is incorporated to provide informative responses for invalid requests and API fetch failures.
-   **In-Memory Data Storage:** The fetched team data is stored in an in-memory array for simplicity. For production, a persistent database should be used.

## Setup and Installation

Follow these steps to set up and run the backend API:

1.  **Prerequisites:**
    -   [Node.js (>= 18.0)]((https://nodejs.org/en/download))
    -   npm or yarn

2.  **Clone the repository:**

    ```bash
    git clone https://github.com/brennosalves/app-sport.git
    cd backend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Run the application:**

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```

    The API will be available at `http://localhost:5010`.

## API Endpoints

-   **GET /teams:** Retrieves the list of teams.
-   **POST /teams:** Creates a new team.
-   **PUT /teams/:id:** Updates an existing team.
-   **DELETE /teams/:id:** Deletes a team.

Examples were added to an Insomnia file in the root directory and also on a a requests.http file. You can import the insomnia file or use the [Rest extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) of [Visual Studio Code](https://code.visualstudio.com/) to call the API.

## Running Tests

To run the unit tests for the backend:

```bash
npm run test
# or
yarn test
````

Tests results should look like this:
![Image](https://github.com/user-attachments/assets/c7c1a38c-9db5-4916-a215-1747754c831e)

## Migration Approach from Rails to NestJS

This project represents a conceptual migration from a potential Rails backend to NestJS. The focus was on replicating the core data management logic.

-   **Rails to NestJS:** The transition involves moving from Ruby on Rails' ActiveRecord patterns to NestJS's modular service-based architecture.
-   **Data Storage:** Due to the project's requirements, a simple in-memory array will be used to store the data during development. In a production environment, a database would be utilized to persist the data.
-   **API Design:** The REST API structure is implemented using controller-based routing with NestJS.
-   **Validation and Error Handling:** NestJS's built-in validation and exception filters are used to achieve validation and error handling capabilities.

## Design Patterns and Reasoning

-   **Service Layer:** The `TeamsService` implements the service layer pattern, encapsulating business logic and data access. This promotes separation of concerns and testability.
-   **Dependency Injection:** NestJS's dependency injection system is used to manage dependencies between modules, enhancing modularity and testability.
-   **DTOs (Data Transfer Objects):** DTOs (`CreateTeamDto`, `UpdateTeamDto`) are used to define the structure of data being transferred between the client and server. This enforces data consistency and provides type safety.
-   **Exception Filters:** NestJS's exception filters are used to handle errors and provide consistent error responses to the client.
-   **In-Memory Data Storage (Temporary):** For this project's scope, an in-memory array simplifies data management. In a production environment, a database like [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/) would be used.
-   **Fetch API:** The node fetch API is used to retrieve data from the external API.

## Future Improvements

-   **Database Integration:** Replace the in-memory array with a persistent database.
-   **Enhanced Validation:** Implement more comprehensive validation rules.
-   **Authentication and Authorization:** Add security measures to protect the API.
-   **API Documentation:** Generate API documentation using Swagger or OpenAPI.
-   **Caching:** Implement caching for the external API data to improve performance.
