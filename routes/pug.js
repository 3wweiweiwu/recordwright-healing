var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/1', function (req, res, next) {
  res.render('In cell of table where both row and column header exists', { title: 'Express' });
});
router.get('/2', function (req, res, next) {
  res.render('In cell of table where either column or row header exists', { title: 'Express' });
});
router.get('/3', function (req, res, next) {
  res.render('table with complex header', { title: 'Express' });
});
router.get('/4', function (req, res, next) {
  res.render('regional-sale', { title: 'Express' });
});

module.exports = router;
