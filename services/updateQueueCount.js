const { tms_dock } = require('../models')

const updateQueueCount = (id, flag, t) => {
    let newData
    flag === 'increment' ? newData = { queueCount: +1 } : newData = { queueCount: -1 }
    return tms_dock.increment(
        newData,
        { where: { id } },
        { transaction: t }
    )
}

module.exports = updateQueueCount