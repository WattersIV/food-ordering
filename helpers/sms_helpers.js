require('dotenv').config({path: "../twilio.env"});
const sendMessage = (body, to) => {

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const from = process.env.fromNumber;

const client = require('twilio')(accountSid, authToken);
return client.messages.create({body, from, to})};


sendMessage("hello world", "4388664160").then(response => console.log(response.body));



