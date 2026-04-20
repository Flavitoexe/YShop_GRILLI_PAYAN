const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({origin: '*'}))

const router = require('./router/yshop')
app.use(router)

app.listen(port, () => console.log(`Server listening on port 3000`))

