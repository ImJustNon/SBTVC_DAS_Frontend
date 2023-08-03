module.exports = {
    check_login: (req, res, next) => {
        if (req.session.is_login) {
            next(); // User is logged in, proceed to the next middleware/route
        } else {
            res.redirect("/p/login");
        }
    }
}