const handleError = (error, req, res, next) => {

    if (error) {
        console.log("ERR_HANDLER", error.message)
        try {
            const {message, status} = JSON.parse(error.message)
            return res.status(status).json({
                message
            })
        } catch (e) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = { handleError }