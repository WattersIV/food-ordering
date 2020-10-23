# Food-Ordering WebPage 
This app was created to be a food ordering page for a single restraunt.  

This app first takes the users choice of take-out or deliery. The user then fills out a form which gets stored in the database and is redirected to the menu with their cart. 
The user is able to add items into their cart which is shown on the irght third of the screen along with the total. The user can then choose the quanitity they desire with 
the plus and minus buttons beside the name of the product. Once the user is done scrolling through the menu they can click the confirmation button which processes the order. 
The user is then redirected to a confirmation page where they see their order number, recipt and order total. From there admin gets a text message through the twilo api of 
the order number and details. The admin can then sign into the admin login on the app and see the outstanding orders. On this page the admin can enter an order number and
send a time estimate to the users phone number.

## Getting started 

### Dependencies
- Node 10.x or above
- NPM 5.x or above
- bcrypt 5.0.0
- body-parser 1.19.0
- chalk 2.4.2
- cookie-session 1.4.0
- dotenv 2.0.0
- ejs 2.6.2
- express 4.17.1
- morgan 1.9.1
- node-sass-middleware 0.11.0
- pg 6.4.2
- pg-native 3.0.0
- twilio 3.50.0
 
### Installing and running 
In the root directory:
    npm install
And to start the server: 
    npm run local 


## Built With 
- Nodejs - Javascript runtime 
- Express - Framework used for API in Node 
- PostgreSQL - Object-relational databse 
- Boostrap - Front-end framework  
- JQuery - Node framework

## Contributors 
[Bill Watters](https://github.com/WattersIV) 
[Subin Moon](https://github.com/jesssubin) 
[Daniel Schaefer](https://github.com/danny0817)
