const express = require('express')
const router = express.Router()
const path = require('path')

// La route '/' affiche le fichier index.ejs, qui est la page principale d'accueil du site
router.get('/', (req, res) => res.render('index'));
router.get('/getAllProducts', (req, res) => res.render('catalogue'))
router.get('/favoris', (req, res) => res.render('favoris'))
router.get('/basket', (req, res) => res.render('basket'))

// Les catégories
router.get('/category/strings', (req, res) => res.render('catalogue'))
router.get('/category/brasses', (req, res) => res.render('catalogue'))
router.get('/category/percussions', (req, res) => res.render('catalogue'))

// Les routes dynamiques avec paramètres 
router.get('/:id', (req, res) => res.render('instrument-details'))

module.exports = router