const { tms_queue } = require('../models')

const assignDock = ({ dataVehicle, resultQueryAvailable }, t) => {
    const data = {
        vehicle_id: dataVehicle,
        dock_id: resultQueryAvailable.id
    }
    return tms_queue.create(data, { transaction: t })
}

module.exports = assignDock