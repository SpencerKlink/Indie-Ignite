function preventDuplicateSession(req, res, next) {
    if (req.session.userId) {
      res.status(400).json({ message: 'A session is already in progress' });
    } else {
      next();
    }
  }
  
  module.exports = preventDuplicateSession;