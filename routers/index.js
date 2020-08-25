const router = require('express').Router()
const QueueController =  require('../controllers/queueController')

router.get('/get-ticket', QueueController.getTicket)

module.exports = router