const express = require('express')
const router = express.Router()
const path = require('path')

// pathJoin permet de relier le chemin absolu (__dirname) et le chemin relatif (filePath) pour faciliter l'écriture des chemins pour les routes.
function pathJoin(filePath) {
    return path.join(__dirname, filePath)
}

router.get('/', (req, res) => {
    res.sendFile(pathJoin('../index.html'))
})

// On utilise router.use(...) sans spécifier de chemin pour intercepter tous les chemins. On renvoie donc tous les chemins inconnus sur une erreur 404.
router.use((req, res) => {
    res.sendFile(pathJoin('../test.html'))
})

module.exports = router