const express = require('express')
const router = express.Router()
const path = require('path')

// La route '/' affiche le fichier index.ejs, qui est la page principale d'accueil du site
router.get('/', (req, res) => res.render('index'))
router.get('/getAllProducts', (req, res) => res.render('catalogue'))
router.get('/getDetailsProduct/:id', (req, res) => res.render('details'))
router.get('/favoris', (req, res) => res.render('favoris'))
router.get('/basket', (req, res) => res.render('basket'))
router.get('/category/strings', (req, res) => res.render())
router.get('/category/brasses', (req, res) => res.render())
router.get('/category/percussions', (req, res) => res.render())
router.get('/:id', (req, res) => res.render('instrument-details'))

router.get('/test', (req, res) => res.render('test'))

// On utilise router.use(...) sans spécifier de chemin pour intercepter tous les chemins. On renvoie donc tous les chemins inconnus sur une erreur 404.
router.use((req, res) => res.render('test'))


module.exports = router