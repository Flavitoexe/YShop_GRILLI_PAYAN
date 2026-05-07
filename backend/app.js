const express = require('express')
const cors = require('cors')
const router = require('./router/yshop')
const app = express()
const port = 3000

app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/img', express.static('img'))


app.use(router)

app.listen(port, () => console.log(`Server listening on port 3000`))