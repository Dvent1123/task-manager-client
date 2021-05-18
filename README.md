
![Logo](https://github.com/Dvent1123/task-manager-client/blob/main/public/logo512.png?raw=true)

# Stint (client)

This is the client side for a MERN stack web app deployed on 
Digital Ocean. I wanted to make this as a version of a simple to-do
list but with my own twist. A user can register and that automatically 
makes them the admin for their project. They can also add users by making
an account for them and each user can be assigned a task which they will see
on their dashboard. The app uses SocketIO to receive real time data so all users
can update the information in real time. 

## Authors

- [@danielventura](https://github.com/Dvent1123)
- [@brentynhanna](https://github.com/Brehtyn)
  
## Demo

   - [Todo Simply](todo-simply.com)

## Screenshots

![Website Screenshot](https://github.com/Dvent1123/task-manager-client/blob/main/public/screenshot_landing.jpg?raw=true)

![Website Screenshot](http://github.com/Dvent1123/task-manager-client/blob/main/public/screenshot_mainmenu.jpg?raw=true)

## Special Thanks 

- https://unsplash.com/@airfocus on Unplash for the awesome landing photo!
- https://readme.so/ for the coolest readme generator!

## Tech Stack

**Client:** React, SCSS, Axios, SocketIO-Client, JWT-Decode

**Server:** Node, Express, MongoDB, JWT, SocketIO

  
## API Reference

<details>
  <summary>Click for more information.</summary>
  
#### Get all users information

```http
  GET /api/users/user
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `object` | **Required**. JWT token |

#### Get individual user information

```http
  GET /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `object` | **Required**. JWT token |

#### Get all tasks

```http
  GET /api/tasks
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `object` | **Required**. JWT token |

#### Register User

```http
  POST /api/login/signup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | **Required**. Object with user information |

#### Login User

```http
  POST /api/login/signin
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | **Required**. Object with user information |

#### Subscribe to Sockets

```socket
  socket.emit('subscribe', room, username)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `room` | `string` | **Required**. Room to subscribe to |
| `username` | `string` | **Required**. Username of user |

#### Unsubscribe to Sockets

```socket
  socket.emit('unsubscribe', room, username)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `room` | `string` | **Required**. Room to subscribe to |
| `username` | `string` | **Required**. Username of user |

#### Update User Settings

```socket
  socket.emit('updateUserSettings', user)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | **Required**. User object with updated information |

#### Add User

```socket
  socket.emit('addUser', user)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | **Required**. User object with updated information |

#### Delete User

```socket
  socket.emit('deleteUser', data)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `data` | `object` | **Required**. Data object with user ID and username |

#### Update User

```socket
  socket.emit('updateUser', user)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `user` | `object` | **Required**. User object with updated information |

#### Create Task

```socket
  socket.emit('addTask', task)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | **Required**. Object with task information|

#### Update Task

```socket
  socket.emit('updateTask', task)
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `task` | `object` | **Required**. Object with updated task information|


#### userToken()
Gets the token item from sessionStorage and returns setToken
from a React useState as saveToken and the token itself as token

#### getSocket()
Gets the token item from sessionStorage and returns a socket
with a connection to the server or an open connection.

#### handleLogout()
Removes the items in sessionStorage and redirects to '/'

#### registerNewUser(user)
Invokes the registerUser API call.

#### loginNewUser(user)
Invokes the loginUser API call

#### encodeStatus(status)
Takes in the status of a task as a number and returns
a string describing the status.


</details>

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API`

`REACT_APP_API_SOCKETS`


  
## Deployment
Deployment was done on Digital Ocean through
and Ubuntu droplet. The server deployment is similar
to the Client

To deploy this project:

SSH into your Digital Ocean Droplet using
```bash
ssh admin@DropletIP
```
Use sudo to clone the respository
```bash
sudo git clone @RepositoryLink
```
```bash
sudo npm install
```

You must still configure NGINX and PM2 for this project to
work on your server.
  
## Run Locally

Make a directory for the project or cd into the project
directory that was made while cloning the client.

```bash
mkdir my-project
```

AND/OR

Go to the project directory

```bash
  cd my-project
```

Make a directory for the client and server

```bash
mkdir client
mkdir server
```

Go into the client directory

```bash
cd client
```

Clone the project into the project directory

```bash
  git clone https://github.com/Dvent1123/task-manager-client.git
```

Install dependencies

```bash
  npm install
```

Start the project

```bash
  npm start
```

  
