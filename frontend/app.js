const express = require('express')
const cors = require('cors')
const router = require('./router/yshop')
const app = express()
const path = require('path')
const port = 8000

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.static(__dirname))

// On dit à ejs que toutes les pages 'views' seront dans le dossier views/
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(router)

app.listen(port, () => console.log(`Server listening on port 8000`))