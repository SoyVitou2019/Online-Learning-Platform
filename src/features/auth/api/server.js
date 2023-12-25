import express from 'express'
import jwt from 'jsonwebtoken'
// import env
const app = express()

app.use(express.json())

const posts = [
    {
        "user_info": {
            "email": "str",
            "user_id": "str"
        }
    }
]
const users = [
    {
        "username":"Vitou",
        "email": "vitou@gmail.com"
    }
]

app.get('/posts', (req, res) => {
    res.json(posts)
})
app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/login', (req, res) => {
    // Authentication User
    const username = req.body.username;
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})


app.listen(3000)