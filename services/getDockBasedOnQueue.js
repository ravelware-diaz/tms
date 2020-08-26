const { tms_dock, tms_queue } = require('../models')


const getDockBasedOnQueue = (id, t) => {
    return tms_dock.findAll({
        include: [
            {
                model: tms_queue,
                attributes: ['id'],
                where: {
                    id
                }
            }
        ]
    }, { transaction: t })
}

module.exports = getDockBasedOnQueue