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




      router.get('/case/task-confirm', function (req, res, next) {

        let findCase = {}

        for (let i = 0; i < crucases.length; i++ ) {
        if(crucases[i].reference === req.query.reference){
          findCase = crucases[i];
        }
    
        }
    
  
        let status = req.session.data['taskcompleted']
        if(status === 'Close case on new cru'){
          findCase.task ='completed-closed' 
          }   

          if(status === 'Issue certificate'){
            findCase.task ='completed-open' 
            }  
       
        res.locals.case = findCase
        next()
         })  
         
         
         router.get('/cru-ops-service/reset-tasks-confirm', function (req, res, next) {

          let findCase = {}
  
          for (let i = 0; i < crucases.length; i++ ) {
          if(crucases[i].task === 'completed-closed'){
            findCase = crucases[i];
          }

          if(crucases[i].task === 'completed-open'){
            findCase = crucases[i];
          }
      
          }
      
    
          let status = req.session.data['reset-task']
          if(status === 'yes'){
            findCase.task ='yes'
            }   
         
          res.locals.case = findCase
          next()
           })  



    
           // Branching
  router.post('/registration/injury-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  const injury = req.session.data['injury']
  const checkanswers = req.session.data['checkanswers']

if (injury == 'Physical injury other than whiplash') {
    res.redirect('./where-is-the-injury')
  }

 if (injury == 'Psychological') {
    res.redirect('./psychological')
  }
 if (injury == 'Neurological') {
    res.redirect('./neurological')
  }

   
  if (checkanswers == 'yes' && injury=='Whiplash'){
    res.redirect('./check-answers')
  }


  if (injury == 'Whiplash') {
    res.redirect('./task-list')
  }

  else if (injury == 'Whiplash','Physical injury other than whiplash') {
    res.redirect('./where-is-the-injury')
  }





})
         
         
  
