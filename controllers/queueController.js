const { sequelize } = require('../models')
const queryAvailable = require('../services/queryAvailable')
const assignDock = require('../services/assignDock');
const updateQueueCount = require('../services/updateQueueCount');

class QueueController {
    static async getTicket(req, res, next) {
        const t = await sequelize.transaction();
        const dataVehicle = req.body.id
        try {
            const resultQueryAvailable = await queryAvailable(t)
            const resultAssignDock = await assignDock({ dataVehicle, resultQueryAvailable }, t)
            const resultUpdateQueueCount = await updateQueueCount(resultQueryAvailable, 'check_in', t)
            t.commit()
            return res.status(200).json({ 
                status: 'success',
                message: `your vehicle will be load on ${resultQueryAvailable[0].dock_code}`
             })
        } catch (err) {
            console.log(err)
            t.rollback()
        }
    }
}

module.exports = QueueController