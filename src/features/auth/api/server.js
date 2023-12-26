import express from 'express'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import axios from 'axios';
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/signup', [
    check("email", "Please provide a valid email!").isEmail(),
    check("password", "Please provide a password greater than 5 characters!").isLength({ min: 4 })
], async (req, res) => {
    // Authentication User
    console.log(req.body)
    const { email, password } = req.body;
    const errors = validationResult(req);
    console.log(email, password)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    // Validate if the user doesn't exist by making a request to the external API
    try {
        const response = await axios.get('https://coding-fairy.com/api/mock-api-resources/ols/user');
        // Assuming the API responds with an array of user objects
        const users = response.data;
        console.log(users)
        // Check if any user with the given email exists
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            return res.status(400).json({
                errors: [{ msg: 'User with this email already exists' }]
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = [
            {
                email: email,
                password: hashedPassword
            }
        ]
        // Continue with signup logic if the user doesn't exist
        const signupResponse = await axios.post('https://coding-fairy.com/api/mock-api-resources/ols/user', user[0])

        // Handle the response from the signup endpoint as needed
        const responseData = signupResponse.data;

        const webToken = await jwt.sign({
            email
        },
            "sfwefwfwbsfwsgsfg22345t",
            {
                expiresIn: '7d'
            })

        // Respond to the client
        res.json({ webToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const response = await axios.get('https://coding-fairy.com/api/mock-api-resources/ols/user');
    // Assuming the API responds with an array of user objects
    const users = response.data;
    // Check if any user with the given email exists
    let hashedPass;
    console.log(users)
    for (const user in users){
        if (user.email === email){
            hashedPass = user.password;
            break;
        }
    }

    if (!hashedPass) {
        return res.status(400).json({
            errors: [{ msg: 'Invalid Credential' }]
        });
    }
    let isMatch = await bcrypt.compare(password, hashedPass);

    if (!isMatch) {
        return res.status(400).json({
            errors: [{ msg: 'Inccorrect credentials' }]
        });
    }

    const webToken = await jwt.sign({
        email
    },
        "sfwefwfwbsfwsgsfg22345t",
        {
            expiresIn: '7d'
        })

    // Respond to the client
    res.json({ webToken });
})


app.listen(3000)
