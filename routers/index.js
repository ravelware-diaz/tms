const router = require('express').Router()
const QueueController =  require('../controllers/queueController')
const InputValidation = require('../middlewares/inputValidation')

router.post('/get-ticket', QueueController.getTicket)
router.post('/start-loading/:id', InputValidation.startLoadingValidation, QueueController.startLoading)
router.post('/check-out/:id', InputValidation.checkOutValidation, QueueController.checkOut)

module.exports = router