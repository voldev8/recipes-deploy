# Flavorites App

This is a simple CRUD application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.
It uses the [Vite](https://vitejs.dev/) Build tool

## Features

- Model animation using react-three
- User authentication (sign up, login, logout with JWT auth)
- Protected routes and endpoints
- Custom middlewares for token and error
- Favorite, add, edit, and delete recipes
- Search recipes by name or tags

## Live Demo

[Flavorites App](https://flavorites.herokuapp.com/)

## Screenshot

![Flavorites Screenshot](https://github.com/voldev8/recipes-deploy/blob/master/client/src/assets/flavorites_screenshot.png)

## Updates

- from v1 to v2

-- Switched from create react app to Vite
-- updated react v16 to v18
-- updated react-router-dom v5 to v6
-- added 3d model on main page
-- new folder structure
-- visual improvements and styling

# Folder Structure

- `client`: Contains the React.js frontend code.
- `server`: Contains the Node.js backend code.

## Env Variables

in ./server folder

MONGO_URI="mongodb+srv://{username}:{password}@cluster0-lksnb.mongodb.net/{database}?retryWrites=true&w=majority"
JWT_COOKIE_EXPIRE="30000"
JWT_EXPIRE="30d"
JWT_SECRET="secret"
FROM_EMAIL="noreply@email.com"
FROM_NAME="name"
SENDGRID_API_KEY="api_key"
SENDGRID_PASSWORD="password"
SENDGRID_PORT="port_number"
SENDGRID_USERNAME="apikey"

## Install Dependencies

```bash
npm install

cd ./server
npm install

cd ./client
npm install
```

## Run

```bash
npm run dev
```

## Older versions

[Front End](https://github.com/voldev8/recipes-api)
[Back End](https://github.com/voldev8/recipes-client)
