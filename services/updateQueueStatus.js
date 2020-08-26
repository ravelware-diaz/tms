const { tms_queue } = require('../models')

const updateQueueStatus = (id, flag, t) => {
   return tms_queue.update({ status: flag }, { where: { id } }, { transaction: t })
}

module.exports = updateQueueStatus