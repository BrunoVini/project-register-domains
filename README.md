
# Rigester of Domains and subdomains Project

This is a CRUD make with Reat and Node. In this repository are the frontend and the backend


## Stack utilizada

**Front-end:** React 

**Back-end:** Node, Express, MySql


## Functionalities

The frontend has five pages.  
 - A page os SignUp
 - SignIn
 - Home, to view all the domains e subdmains of the user
 - Register os domains
 - A page do list all Subdomains of a Main Domain

The API has the routes get User, for the Authentication. POST user, POST domain (the API make a fetch to other api that search the subdmains)


## Environment Variable

To run this project, you will need to add the following environment variables to your .env in the backend

`PORT`

`MYSQL_HOST`

`MYSQL_USER`

`MYSQL_PASSWORD`

`MYSQL_DB`

`SUBDOMAINS_API_KEY`

Turn on your MySql server and create a database.
Add connection data to .env.example file
If your server are with the default data. You HOST will be "localhost", user "root" and password "root".
Add the database's name in the MYSQL_DB.

![.env Screenshot](https://i.ibb.co/SPK3k7G/image.png)

Go to the website https://subdomains.whoisxmlapi.com/
Creat an account and go to API Docs.
Copy the link of the API. E put only your apiKey in the environment variable SUBDOMAINS_API_KEY 

![External Api](https://i.ibb.co/w44Gvgc/image.png)

## Running locally

**Front-end:**

Clone the project

```bash
  git clone https://github.com/BrunoVini/project-register-domains.git
```

Enter the project directory

```bash
  cd my-project
```

Enter the Frontend directory 

```bash
  cd frontend
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

**Back-end:**


Enter the Backend directory

```bash
  cd backend
```

Install the dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## API documentation

#### Validate the user

```http
  GET /users
```

| Parameter   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Mandatory**. The registered email |
| `password` | `string` | **Mandatory**. The registered password |

Return:
 - Status 404 if the user doesnot exist
 - Status 400 if the user's doesnot mach
 - Status 200 if all is correct

#### Register a User

```http
  POST /users
```

| Parameter   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Mandatory**. The user's Name |
| `email`      | `string` | **Mandatory**. The user's  |
| `password`      | `string` | **Mandatory**. The user's password |

Return:
- Status 201 and the Id of the user registered



