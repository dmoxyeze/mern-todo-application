<h1 align="center">A simple MERN stack Todo application</h1>
<h3>Installation Instruction</h3>
    ## from your cmd line or terminal:
    
 - `git clone https://github.com/dmoxyeze/mern-todo-application.git`
 - `cd mern-todo-application`
 - Go into the backend directory to set up the Backend service (`cd backend && npm install`)
 - rename the .env.example file to .env and provide your real credentials e.g port number, mongodb uri, etc.
 - run `npm run dev`, to start the local server
 - use `npm run test` to run tests
 - use `npm run build` to build for production
 - visit http://localhost:8080
        if everything is fine at this point, you see the message "You have reached Todo api home page".
<p>
    ## For Front End:

- Enter into the frontend directory(the folder labelled frontend) of the project
- create .env file and provide the base url of your Node JS backend service in the format `REACT_APP_API_URL=http://<my-api-url>`
- run this command to start your development server `npm install && npm start`.
- run `npm run build` for production build.
- visit http://localhost:3000 to view you todo App

</p>
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
- Mocha for unit testing

    ## For Frontend:

- React
- Typescript
- Context API
- TailwindCss
- Axios
- styled-components
- twin.macro
