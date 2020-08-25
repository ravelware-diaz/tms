const { tms_dock, tms_queue } = require('../models')

const queryEarliestOnProgress = (t) => {
    return tms_dock.findAll({
        include: [
            {
                model: tms_queue,
                attributes: [ 'check_in' ]
            }
        ],
        order: [ ['queueCount', 'asc'], [tms_queue, 'check_in', 'asc'] ],
        // limit: 1
     }, { transaction: t })
}

module.exports = queryEarliestOnProgress