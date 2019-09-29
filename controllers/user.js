const checkLogin = (req, res) => {
  const {
    user_login,
    user_password
  } = req.body;
  if(user_login === process.env.USER_LOGIN && user_password === process.env.USER_PASSWORD){
    res.send({ loginStatus: 'ok' });
  }else{
    res.send({ loginStatus: 'wrong login' });
  }
};

module.exports={
  checkLogin: checkLogin,
};