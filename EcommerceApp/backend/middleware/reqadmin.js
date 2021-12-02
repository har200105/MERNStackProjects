const reqLogin = require('../middleware/reqlogin');

const isAdmin = (req, res, next) => {
    reqLogin(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not allowed to do that !!");
      }
    });
}

module.exports = {isAdmin};

