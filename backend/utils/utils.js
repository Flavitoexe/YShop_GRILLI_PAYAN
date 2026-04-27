const fs = require('fs')

// writeInFile est une fonction qui permet d'écrire des données (content) dans un fichier (dataFile) de amnière simple et sécurisée.
const writeInFile = (dataFile, content) => {

    // On transforme l'objet JSON en string pour pouvoir écrire dans le fichier.
    const jsonContent = JSON.stringify(content)

    // On écrit dans le fichier dataFile et on fait la gestion d'erreur.
    fs.writeFileSync(dataFile, jsonContent, 'utf-8', (error) => {
        if (error) {
            console.error('Error writing in file : ', error)
            return error
        }
        console.log('File written successfully')
    })

}

// readInFile est une fonction qui permet de lire dans un fichier (dataFile) et qui renvoie le contenu de ce dernier de manière sécurisée.
const readInFile = (dataFile) => {

    // On lit le fichier dataFile et on stocke le contenu de ce dernier dans une constante que l'on renvoie plus tard.
    const fileData = fs.readFileSync(dataFile, 'utf-8', (error, data) => {
        if (error) { 
            console.error('Error reading file (controllers.addTask)', error)
        } else {
            return data
        }
    })

    return fileData
}

// strToObject est une fonction qui lit un fichier (dataFile), et transforme son contenu en un objet JSON, ce qui permet de le manipuler facilement en JavaScript.
const strToObject = (dataFile) => {

    // On lit le fichier dataFile et on 'parse' son contenu en un objet JSON.
    const data = readInFile(dataFile)
    const productsList = JSON.parse(data)

    return productsList
}

// formatDate est une fonction qui prend une date UNIX et la convertit en une date au format 'hh:mm:ss DD/MM/YYYY'.
const formatDate = (time) => {

    const date = new Date(time)

    const pad = (n) => n.toString().padStart(2, '0')

    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())
    
    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear()

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`

}

module.exports = {writeInFile, readInFile, strToObject, formatDate}