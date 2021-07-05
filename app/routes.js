const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)






// GET SPRINT NAME - useful for relative templates
router.use('/', (req, res, next) => {
    res.locals.currentURL = req.originalUrl; //current screen
    res.locals.prevURL = req.get('Referrer'); // previous screen
    req.folder = req.originalUrl.split('/')[1]; //folder, e.g. 'current'
    req.subfolder = req.originalUrl.split('/')[2]; //sub-folder e.g. 'service'
    res.locals.folder = req.folder; // what folder the url is
    res.locals.subfolder = req.subfolder; // what subfolder the URL is in
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
    console.log('previous page is: ' + res.locals.prevURL + " and current page is " + req.url + " " + res.locals.currentURL );
    next();
  });



  router.use('/current', require('./views/current/_routes'));
  router.use('/v1-staff', require('./views/v1-staff/_routes'));
  router.use('/mvp', require('./views/mvp/_routes'));
  router.use('/mvp-01', require('./views/mvp-01/_routes'));


module.exports = router
