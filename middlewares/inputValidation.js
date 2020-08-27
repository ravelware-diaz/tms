const { tms_dock, tms_queue } = require('../models')
const { Op } = require("sequelize")

class InputValidation {
    static baseValidation(req, res, next, status, opt) {
        const id = req.body.id
        const dockId = req.params.id
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
                if (opt !== 'Cancel') {
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
                    req.result = result
                    return next()
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
    static async cancelValidation(req, res, next) {
        InputValidation.baseValidation(req, res, next, 'Pending', 'Cancel')        
    }

    static async startLoadingValidation(req, res, next) {
        InputValidation.baseValidation(req, res, next, 'Pending', 'Start Loading')        
    }

    static async checkOutValidation(req, res, next) {
        InputValidation.baseValidation(req, res, next, 'On Progress', 'Checkout')        
    }
}

module.exports = InputValidation