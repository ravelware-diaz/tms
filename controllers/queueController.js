const { sequelize } = require('../models')
const queryAvailable = require('../services/queryAvailable')
const assignDock = require('../services/assignDock')
const updateQueueCount = require('../services/updateQueueCount')
const updateQueueStatus = require('../services/updateQueueStatus')
const calculateWaitingTime = require('../services/calculateWaitingTime')

class QueueController {
    static async getTicket(req, res, next) {
        const t = await sequelize.transaction()
        const dataVehicle = req.body.id
        try {
            const resultQueryAvailable = await queryAvailable(t) //yields dock data and we only need dock id for next process
            const resultAssignDock = await assignDock({ dataVehicle, resultQueryAvailable }, t) //create queue
            const resultUpdateQueueCount = await updateQueueCount(resultQueryAvailable.id, 'increment', t)
            const resultCalcWaitingTime = calculateWaitingTime(resultQueryAvailable.queueCount)
            t.commit()
            return res.status(200).json({ 
                status: 'success',
                message: `your vehicle will be load on ${resultQueryAvailable.dock_code} with waiting estimation time ${resultCalcWaitingTime} minutes`
            })
        } catch (err) {
            t.rollback()
            return next(err)
        }
    }

    static async startLoading(req, res, next) {
        const t = await sequelize.transaction()
        const queueId = req.body.id
        const dockId = req.params.id
        try {
            const resultUpdateQueueStatus = await updateQueueStatus(queueId, 'On Progress', t)
            const resultUpdateQueueCount = await updateQueueCount(dockId, 'decrement', t)
            t.commit()
            return res.status(200).json({
                status: 'success',
                message: 'Successfully update queue status to On Progress'
            })
        } catch (err) {
            t.rollback()
            return next(err)
        }
    }

    static async checkOut(req, res, next) {
        const t = await sequelize.transaction()
        const queueId = req.body.id
        try {
            const resultUnassignDock = await updateQueueStatus(queueId, 'Finished', t)
            t.commit()
            return res.status(200).json({
                status: 'success',
                message: 'Successfully update queue status to Finished'
            })
        } catch (err) {
            t.rollback()
            return next(err)
        }
    }

    static async cancel(req, res, next) {
        const t = await sequelize.transaction()
        const queueId = req.body.id
        const dockId = req.result.id
        console.log(queueId, dockId)
        try {
            const resultUnassignDock = await updateQueueStatus(queueId, 'Canceled', t)
            const resultUpdateQueueCount = await updateQueueCount(dockId, 'decrement', t)
            t.commit()
            return res.status(200).json({
                status: 'success',
                message: `queue with id ${queueId} has been canceled from queue list`
            })
        } catch (err) {
            t.rollback()
            return next(err)
        }
    }
}

module.exports = QueueController