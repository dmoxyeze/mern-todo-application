<h1 align="center">A simple MERN stack Todo application</h1>
<h3>Demo</h3>
    ## <a href="https://dmoxyeze.github.io/todo-app-demo/">https://dmoxyeze.github.io/todo-app-demo/</a>
<h3>Installation Instruction</h3>
    ## from your cmd line or terminal:
    
 - `git clone https://github.com/dmoxyeze/mern-todo-application.git`
 - `cd mern-todo-application`
 - Run `yarn install`
 - Go into the backend directory
 - rename the .env.example file to .env and provide your real credentials e.g port number, mongodb uri, etc.
 - Enter into the frontend directory(the folder labelled frontend) of the project
- create .env file and provide the base url of your Node JS backend service in the format `REACT_APP_API_URL=http://<my-api-url>`
- add your API URL to `src/constants.ts`
 
 <h4>This project uses namespace and npm-run-all, so you do not need to start the backend and frontend
 services separately.</h4>
    To start both services, go back to the root directory in your terminal, and:
    
 - run `yarn dev`, to start the local server
 - use `yarn test` to run tests
 - use `yarn build` to build for production
 - visit http://localhost:8080 to check if the backend service is running
        if everything is fine at this point, you see the message "You have reached Todo api home page".
- visit http://localhost:3000 to see the frontend service

<p align="">
    <h3>Features:</h3>

- Add todo (creates a todo on the front end and saves to the database via a call to the backend service)
- Update todo
- Delete todos
- Load the todos from the database
- Mark todo as completed
- Unit Tests
</p>

<h3>Tech Stack</h3>
    ## For Backend:
  
- NodeJS
- Express JS
- MongoDB
- Typescript
- NPM namespaces
- Docker and docker-compose
- Mocha for unit testing
- Google App Engine for Hosting

    ## For Frontend:

- React
- Typescript
- Context API
- TailwindCss
- Axios
- styled-components
- twin.macro
