const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;