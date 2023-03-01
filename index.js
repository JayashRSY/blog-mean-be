const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const CORS = require('cors')
const postsRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("./uploads/images")))

app.use(CORS({ origin: 'http://localhost:4200' }))
app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization"
    )
    next();
})

app.use("", postsRoutes)
app.use("/user", authRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('listening on port ' + port))
