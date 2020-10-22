
const sendText = (body, to) => {

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const from = process.env.fromNumber;
const client = require('twilio')(accountSid, authToken);


return client.messages.create({body, from, to})
.then(response => console.log(response.body))
};


const sendTextToAdmin = (order_id) => {

  const adminNumber = process.env.adminNumber;

  let msg = `
  You have received an order!
  Please check the admin side and confirm the order.
  Order ID is: ${order_id}
  `;

  return sendText(msg, adminNumber)

}


module.exports = {
  sendText,
  sendTextToAdmin
};


