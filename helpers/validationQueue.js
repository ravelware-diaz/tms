class ValidationQueue {
    static validationFetchAvailable(data) {
        if (data[0]) {
            return { flag: true }
        } else {
            return { flag: false }
        }
    }
}

module.exports = ValidationQueue