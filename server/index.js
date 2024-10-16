import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;

// Get directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
console.log(`__filename = ${__filename}`);


const __dirname = dirname(__filename)
console.log(`__dirname = ${__dirname}`);


// Serve static files from the react app
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use(express.json())
app.use(cors());

// API endpoint
app.get('/api/hello', (req, res) => {
    res.json({message: "Hello from the server!"})
})

// Serve the React app for any other route
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, '..', 'dist', 'index.html');
    // console.log(`filePath = ${filePath}`);
    res.sendFile(filePath);
});

app.post('/login', (req, res) =>{
    const {username, password} = req.body
    console.log(username, password);
    res.json({message: "Login reached."})
})

app.post('/signup', (req, res) =>{
    const {
        'first-name': firstName,
        'last-name': lastName,
        username,
        password,
        'confirm-password':confirmPassword
    } = req.body

    console.log(`User sign up: ${firstName} ${lastName} | U: ${username} P:${password}, CP:${confirmPassword}`);
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});