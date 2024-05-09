


//admin function 
const adminUser = (permissions) => {
    
    return (req, res, next) => {
        const userRole = req.user.role
        if (permissions.includes(userRole)) {
            next()
        } else {
            res.status(403).json({
                message: 'Sorry you do not have permission to perform this action.'
            })
        }
    }
}

module.exports = {adminUser};