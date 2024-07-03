

const emptyCheck = function (req, res, next) {
    if(!req.body) {
        return res.status(400).json({message: 'body found empty'})
    } else {
        next()
    }
}

export {
    emptyCheck
}