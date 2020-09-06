const express = require('express');
const path = require('path');
const router = express.Router();

const randomToken = require('../helpers/randomToken');

const home = require('./home');
const runner = require('./runner');
const onlySelf = require('./onlySelf');

router.get('/test', home);
router.get('/favicon.*', ()=>{});
router.get(`/onlySelf${randomToken}.html*`, onlySelf.get);
router.get('/*', runner.get);

module.exports = router;
