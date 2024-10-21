const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send-mail', (req, res) => {
  const { subject, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: email,
    to: 'alekseypaslenov@gmail.com',
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Ошибка при отправке письма: ' + error.message);
    }
    res.send('Письмо успешно отправлено!');
  });
});

app.listen(80, () => {
  console.log('Сервер запущен на http://localhost:8000');
});
