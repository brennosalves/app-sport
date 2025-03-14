# Frontend Application for Sport's Team League Management

This document provides information about the frontend application built with React for managing teams in a league.

## Architecture Overview

The frontend is a single-page application (SPA) built using React. It provides an interface for displaying, adding, and deleting teams.

Key components:

-   **TeamList.js:** Fetches and displays a list of teams from the backend API. Allows users to delete teams.
-   **TeamForm.js:** Provides a form for users to add new teams to the list.
-   **Message.js:** Displays success or error messages to the user.
-   **App.js:** Manages the overall state of the application, including the list of teams and messages.

Key features:

-   **Data Fetching:** Fetches team data from the backend API upon component mount.
-   **CRUD Operations:** Supports Create, Read, and Delete operations for team management.
-   **User Feedback:** Provides visual feedback to the user through success and error messages.
-   **Image Fallback:** Handles missing or broken team logo images by displaying a fallback image.

## Setup and Installation

Follow these steps to set up and run the frontend application:

1.  **Prerequisites:**
    -   [Node.js (>= 18.0)](https://nodejs.org/en/download)
    -   npm or yarn

2.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd frontend
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

4.  **Run the application:**

    ```bash
    npm run start
    # or
    yarn start
    ```

    The application will be available at `http://localhost:3000`.

## Key Components

-   **TeamList Component:**
    -   Fetches team data from the backend API (`http://localhost:5010/teams`) on mount.
    -   Displays a list of teams with their logo, name, and stadium.
    -   Provides a "Delete" button for each team, which sends a DELETE request to the backend API.
    -   Handles loading state and displays a "Loading teams..." message while fetching data.
    -   Displays a "No teams available" message if the team list is empty.
    -   Handles image loading errors with a fallback image.

-   **TeamForm Component:**
    -   Provides a form with input fields for team name, badge URL, and stadium name.
    -   Submits a POST request to the backend API (`http://localhost:5010/teams`) to create a new team.
    -   Clears the input fields after successful team creation.
    -   Displays success or error messages based on the API response.

-   **Message Component:**
    -   Displays messages passed as props.
    -   Uses different styles based on the message type (success or error).

## Running Tests

To run the unit tests for the frontend:

```bash
npm run test
# or
yarn test
````

Tests results should look like this:
![Image](https://github.com/user-attachments/assets/c45dde49-e03d-4b78-9f42-6f8eb13ff302)

## Notes on Design Patterns and Reasoning

-   **Component-Based Architecture:** The application is built using React's component-based architecture, promoting reusability and maintainability.
-   **State Management:** React's `useState` hook is used for local component state management. The `setTeams` prop is used to update the parent component's state.
-   **Effects:** The `useEffect` hook is used to fetch data from the backend API when the component mounts.
-   **Event Handling:** Event handlers are used to handle form submissions and button clicks.
-   **Fetch API:** The Fetch API is used to make HTTP requests to the backend.
-   **Conditional Rendering:** Conditional rendering is used to display different content based on the loading state and the presence of teams.

## Future Improvements

-   **Environment Variables:** Move the backend API URL to an environment variable for better configuration management.
-   **Error Boundaries:** Implement error boundaries to handle runtime errors gracefully.
-   **Accessibility Improvements:** Enhance accessibility by adding ARIA attributes and improving keyboard navigation.
-   **State Management Library:** Consider using a state management library like Redux or Context API for more complex state management needs.
-   **Routing:** Implement client-side routing using React Router for navigation between different views.
-   **UI Enhancements:** Improve the user interface and user experience with better styling and interactions.
