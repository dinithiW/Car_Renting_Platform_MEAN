require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.TOKEN;
const client = require('twilio')(accountSid, authToken);


exports.sendSMS = (bodytext, number) => {
  client.messages
      .create({
        body: bodytext,
        from: '+16623378513',
        to: number,
      })
      .then((message) => console.log(message.sid))
      .done();
};
