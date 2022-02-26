const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');

module.exports = (message) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: message.to,
        from: '패캠쇼핑몰관리자<appi1234dk@gmail.com>',
        subject: message.subject,
        html: message.mail_body,
    };

    return sgMail.send(msg);
}
