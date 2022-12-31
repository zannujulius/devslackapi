function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You are not logged in",
    });
  }
  next();
}

module.exports = {
  checkLoggedIn,
};
