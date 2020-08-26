const { tms_dock, tms_queue } = require('../models')
const { Op } = require("sequelize")

class InputValidation {
    static baseValidation(req, res, next, status) {
        const id = req.body.id
        const dockId = req.params.id
        console.log(dockId)
        tms_dock.findOne({
            include: [
                {
                    model: tms_queue,
                    attributes: ['id'],
                    required: true,
                    where: { 
                        [ Op.and ]: [ { id }, { status } ]
                    }
                }
            ]
        })
        .then(result => {
            if (result) { //check if id is exist or not in database
                if (dockId == result.tms_queues[0].id) { // check if queues will be placed or removed from correctt dock
                    req.result = result
                    return next()
                } else {
                    return next({
                        name: 'BadRequest',
                        errors: [{ message: 'wrong dock!' }]
                    })
                }                
            } else {
                return next({
                    name: 'NotFound',
                    errors: [{ message: 'Your id is not found in queue list' }]
                })
            }
        })
        .catch(err => {
            return next(err)
        })
    }
    static async startLoadingValidation(req, res, next) {
        InputValidation.baseValidation(req, res, next, 'Pending')        
    }

    static async checkOutValidation(req, res, next) {
        InputValidation.baseValidation(req, res, next, 'On Progress')        
    }
}

module.exports = InputValidation