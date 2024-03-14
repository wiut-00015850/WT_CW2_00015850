# {/ExpressEvents\} - Event Planning App

## About
{/ExpresEvents\} is a web application for managing events. Users can view, create, update, and delete events. Moreover, users can sign up, log in, and filter events.

## How to Run Locally
1. Clone the repository to your local machine:

```cmd
git clone https://github.com/wiut-00015850/WT_CW2_00015850
```

2. Navigate to the project directory:

```cmd
cd WT_CW2_00015850
```

3. Install dependencies:
```cmd
npm install
```

4. Set up environment variables:
- Create a `.env` file in the root directory of the project.
- Add the necessary environment variable called `ACCESS_TOKEN_SECRET` and set it equal to any value
```.env
ACCESS_TOKEN_SECRET=super_secret_core_or_some_good_hash
```

5. Start the application:
```cmd
npm start
```
6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Dependencies
- bcrypt: ^5.1.1
- cookie-parser: ^1.4.6
- dotenv: ^16.4.5
- express: ^4.18.3
- jsonwebtoken: ^9.0.2
- pug: ^3.0.2

## Project Structure
The project files are structured as follows:
- `app.js`: Main entry point of the application.
- `routes/`: Directory containing route handlers for different endpoints.
- `controllers/`: Directory that contains the logic of endpoints.
- `views/`: Directory containing Pug templates for rendering HTML views.
- `public/`: Directory for static files (e.g., stylesheet and JavaScript files).
- `validators/`: Directory that contains the logic of entities validation.
- `.env`: Configuration file for environment variables.
- `package.json`: File containing metadata about the project and its dependencies.
- `README.md`: Document containing project information i.e. this file.

## Links
- [GitHub Repository](https://github.com/wiut-00015850/WT_CW2_00015850)
- [Hosted Application](https://00015850wtcw2.glitch.me)
