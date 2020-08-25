const { tms_dock } = require('../models')

const updateQueueCount = (data, flag, t) => {
    let newData
    flag === 'check_in' ? newData = { queueCount: +1 } : newData = { queueCount: -1 }
    return tms_dock.update(
        newData,
        {
            where: {
                id: data[0].id
            }
        },
        { transaction: t }
    )
}

module.exports = updateQueueCount