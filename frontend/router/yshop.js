const express = require('express')
const router = express.Router()
const path = require('path')

// La route '/' affiche le fichier index.ejs, qui est la page principale d'accueil du site
router.get('/', (req, res) => res.render('index'));
router.get('/getAllProducts', (req, res) => res.render('catalogue'))
router.get('/favoris', (req, res) => res.render('favoris'))
router.get('/basket', (req, res) => res.render('basket'))

// Les catégories
router.get('/cordes', (req, res) => res.render('category'))
router.get('/vent', (req, res) => res.render('category'))
router.get('/percussions', (req, res) => res.render('category'))

router.get('/search-results', (req, res) => res.render('search'));
router.get('/filter-results', (req, res) => res.render('filtre_result'));
router.get('/tri-results', (req, res) => res.render('tri_result'));

// Les routes dynamiques avec paramètres 
router.get('/:id', (req, res) => res.render('instrument-details'))

module.exports = router