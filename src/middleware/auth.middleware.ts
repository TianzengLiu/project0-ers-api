export function authorization(authRoles:string[]) {
    return (req, res, next) => {
        let isAuth = false

        if (!req.session.user) {
            res.sendStatus(401)
        }

        for (let userRole of req.session.user.role) {
            if(authRoles.includes(userRole)) {
                isAuth = true
            }
        }

        if(isAuth) {
            next()
        } else {
            res.sendStatus(403)
        }
    }
}