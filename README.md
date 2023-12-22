# Welcome to Magic App

Welcome to Magic App, a comprehensive application thoughtfully built with a powerful tech stack: NestJS, React, TypeScript, and SQL. This project was developed as a personal journey to deepen my understanding and proficiency in TypeScript while also exploring and learning the ins and outs of NestJS.

<img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo" /> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="100" alt="React Logo" /> <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="100" alt="TypeScript Logo" /> <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png" width="100" alt="SQL Logo" />


## Features

- **Explore Magic Cards**: Dive into a vast collection of Magic cards, with basic informations (for now).
- **Manage Your Collection**: Keep track of your Magic cards and manage your collection with ease.
- **Interactive UI**: Experience a user-friendly interface built with React.
- **Robust Backend**: Powered by NestJS, ensuring a reliable and efficient backend service.
- **Type-Safe**: Leverage the power of TypeScript for a more robust and error-free coding experience.

## Getting Started

Here are the instructions to get the Magic App up and running on your local machine for development purpose.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [React](https://reactjs.org/)
- A MySQL database

### Installation

Setting up Magic App on your local machine for development purpose involves a few key steps. Here's how to get started:

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/) installed on your machine.
- [Node.js](https://nodejs.org/en/) should be installed for running the application.

### Cloning the Repository

First, clone the repository to your local machine and set up the DB:

```bash
git clone https://github.com/skiimcdogg/Nest-project.git
docker pull mysql:latest
docker run -d --name Nest_app -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=magic_extensions -p 3307:3306 mysql:latest
```

After setting up the database, install the necessary Node.js dependencies for both the frontend and backend:

```bash
cd Nest-app
npm install
```

To properly configure the application, you need to set up environment variables. Create a `.env` file in the root of the /App-nest folder and include the following settings if you didn't touch the docker run command:

```plaintext
DB_HOST="localhost"
DB_NAME="magic_extensions"
DB_USER="root"
DB_PASSWORD="root"
DB_PORT="3307"
```

and then, you'll have to generate, run the migrations and run the script for filling the DB:

```bash
npm run migration:generate
npm run migration:run
npm run compile-and-run-script
```

Now, you can start the Nest part:

```bash
npm start
```

Go to the react-app and:

create an .env file for setting the url of the back-end:

```plaintext
BACKEND_URL="http://localhost:3000"
```

and, finally:

```bash
npm install
npm start
```

You can test the app :)

## Connect With Me

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=LinkedIn&logoColor=white&link=https://www.linkedin.com/in/your-linkedin-username/)](https://www.linkedin.com/in/antoine-stouff/)
