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
  const {
    name,
    email,
    message,
    htmlToBflex,
    htmlToCustomer
  } = req.body;

  var mailToBflex = {
    from: "bflex.orderInfo@gmail.com",
    to: "info@bflex.sk",
    subject: "Bflex - nová objednávka od: " + name,
    html: htmlToBflex
  };

  var mailToCustommer = {
    from: "bflex.orderInfo@gmail.com",
    to: email,
    subject: "Bflex - Ďakujeme za objednávku",
    html: htmlToCustomer
  };

  transporter.sendMail(mailToBflex, (err, data) => {
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
  });
  transporter.sendMail(mailToCustommer, (err, data) => {
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
  });
};

module.exports={
  sendMail: sendMail,
};