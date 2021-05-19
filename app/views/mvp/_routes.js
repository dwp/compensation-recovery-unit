const express = require('express')
const router = express.Router()
// Add your routes here - above the module.exports line
module.exports = router

var crucases = require('./data/cru-cases.json')

 
router.get('/*', function (req, res, next) {
    let findCase = {}

    for (let i = 0; i < crucases.length; i++ ) {
    if(crucases[i].reference === req.query.reference){
      findCase = crucases[i];
    }

    }

    res.locals.case = findCase
    res.locals.cases = crucases
     next()
      })