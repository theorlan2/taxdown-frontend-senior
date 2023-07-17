## Taxdown Frontend Senior Challenge
![Logo Taxdown](https://github.com/TaxDownAutomation/coding-challenge/raw/master/assets/logo.png)
 
## Description


## Table of Contents

- [Structure Organization](#structure-organization)
- [Component Based Architecture](#component-based-architecture)
- [SOLID Principles](#solid-principles)
- [Abstraction for External Libraries](#abstraction-for-external-libraries)
- [Store Management](#store-management)
- [Route Management](#route-management)
- [Code Testing](#code-testing)
- [Running the Project](#running-the-project)
  - [Installation](#installation)
  - [Starting the Development Server](#starting-the-development-server)
- [Login Credentials](#login-credentials)
- [User Registration](#user-registration)
  - [Registering via App](#registering-via-app)
  - [Registering via Backend Endpoint](#registering-via-backend-endpoint)
- [Running Tests](#running-tests)
- [Fake Server for Development](#fake-server-for-development)

## Structure Organization

The project follows a well-organized structure to ensure easy localization of files. The main directories are as follows:

- **src**:

  - **components**: Contains common components used throughout the project.

  - **models**: Stores all shared models used in the project.

  - **pages**: Contains all the application's pages.
    - **tax**: Represents a specific page for handling tax-related data.
      - **models**: Contains specific models related to the tax entity.
      - **components**: Holds page-specific components related to the tax page.

  - **services**: Includes different services used in the project.
    - **sagas**: Contains sagas responsible for fetching data from the server.

  - **store**: Utilizes the Redux store for state management, adopting the **Redux Toolkit (RTK)** structure.
    - **features**: Organizes the store using RTK's features pattern.
      - [List of directories for entities]

## Component Based Architecture

The project follows a component-based architecture, resulting in the creation of reusable components. This approach promotes modularity and makes it easier to maintain and extend the application.

## SOLID Principles

The project adheres to the SOLID principles, which promote good software design practices and ensure the codebase's flexibility and maintainability.

## Abstraction for External Libraries

To achieve a high level of abstraction, the project avoids having any page depend directly on external libraries within the view. This separation of concerns enhances code readability and minimizes the impact of library changes on the application.

## Store Management

For state management, the project uses Redux, a popular library for managing application state. To simplify the Redux logic, **Redux Toolkit (RTK)** is employed, providing a more concise and efficient way to work with Redux.

## Route Management

The project uses React Router to manage routes effectively. Additionally, it leverages Redux to validate whether the user is logged in, redirecting them to the login page if the session is not active.

## Code Testing

To ensure the stability and reliability of the codebase, the project implements testing with **jest** and **react-testing-library**. These testing libraries allow for comprehensive unit and integration testing, making it easier to catch and fix issues early in the development process.



## challenge steps:
These are the requirements or steps to realize the challenge completely.


## First step 🥇

Create a login form that allows a user to access the application.

 

## Second step 🥈

Each tax will contain a button that will allow adding submissions.

Dynamic form should be rendered based on the inputs defined in the JSON response.



## Third  step 🥉

When the inputs are completed and the user clicks on submit button a POST request to **/taxes/{id}/form** with the values of the form will be made.

A list of submissions should be created in the store for that specific tax.

 
## Running the Project

To run the project, follow the steps below:

### Installation

Before proceeding, ensure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your system.

1. Clone this repository to your local machine.
2. Navigate to the project directory using the terminal/command prompt.

### Starting the Development Server

Run the following command to start the development server:

```bash
yarn run start
```

This command will launch the application in the development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Login Credentials

To access the application, use the following login credentials:

**Email**: example@gmail.com

**Password**: test

## User Registration

You can register in the app or via the backend endpoint using the **POST** method.

### Registering via Backend Endpoint

To register via the backend endpoint, send a **POST** request to [/register](http://localhost:5000/register) with the following JSON example:

```json
{
  "name": "Example User",
  "email": "example@email.com",
  "password": "passwordExample"
}
```

## Running Tests

To launch the test runner in the interactive watch mode, use the following command:

```bash
yarn run test
```

This will execute the test suite and show the test results.

## Fake Server for Development

For development purposes, you can run a fake server using the following command:

```bash
yarn run serve
```

This will start the fake server, and you can access the fake data at [http://localhost:5000/taxes](http://localhost:5000/taxes) in your browser.

---

Feel free to modify and enhance this README as per your specific project details. A clear and concise README is essential for users and potential contributors to understand your project better. Provide necessary instructions for running, testing, and accessing your application or backend services. Happy coding!


- To run the project directory, you can run:

##### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.\

**To login** use the user:

 **email**: danysantosmorel@gmail.com

 **password**: test



**You can register** in the app or using the [/register](http://localhost:5000/register) endpoint in the backend, with the **POST** method.

Register json example: 

``` 
{   
"name":"Example User",
"email": "example@email.com", 
"password": "passwordExample" 
}
```

- Launches the test runner in the interactive watch mode.

#### `yarn run test`
 