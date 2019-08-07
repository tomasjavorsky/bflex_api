var nodemailer = require('nodemailer');

var transport = {
  service: 'gmail',
  auth: {
    user: "bflex.orderInfo@gmail.com",
    pass: "0rder1nfo"
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

const sendMail = (req, res) => {
  // const {
  //   name,
  //   email,
  //   message,
  // } = req.body;

  var mail = {
    from: "bflex.orderInfo@gmail.com",
    to: "dano.javorsky@gmail.com",
    subject: "AYYY",
    text: "AYY LMAO"
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log("fail");
      res.json({
        msg: "fail"
      })
    } else {
      console.log("success");
      res.json({
        msg: "success"
      })
    }
  })
};

module.exports={
  sendMail: sendMail,
};