function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.redirect('/login');
    }
    if (req.user.id.toString() !== req.params.userId) {
        return res.status(403).send('Unauthorized');
    }
    next();
}