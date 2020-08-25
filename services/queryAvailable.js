const { tms_dock } = require('../models')
const queryAvailable = (t) => {
    return tms_dock.findAll({
        where: {
            availability: 'available'
        },
        limit: 1
    }, { transaction: t })
}

module.exports = queryAvailable