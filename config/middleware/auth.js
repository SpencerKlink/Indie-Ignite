// Middleware to restrict route access
const withAuth = (req, res, next) => {
// If the user is not logged in, redirect the request to the login route
if (!req.session.logged_In) {
    res.redirect('/login');
    } else {
    console.log(`User is logged in:${req.session.logged_In}`);
    next();
    }
};

module.exports = withAuth;
