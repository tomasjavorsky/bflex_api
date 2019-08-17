const userLogin = (req, res, db) => {
  const {
    user_login,
    user_hash
  } = req.body;

  return db.select('*').from('user_info')
    .where({user_login: user_login, user_hash: user_hash})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get user info from database\n' + err));
};

module.exports={
  userLogin: userLogin,
};