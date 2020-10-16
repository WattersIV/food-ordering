#### BARE BONES 

### GLOBAL header & footer
 - Header:
  - restaurant name 

- Footer: 
  - restaurant contact information (name, email, phone number, address, postal code) 

### Route Descriptions and Features

HOMEPAGE ("/")
- Takeout 
  - POST ("/") Registration (name, email, phone number) 
  - Send to order page 

- Delivery 
  - POST ("/") Registration (name, email, phone number, address, postal code) 
  - Send to order page 

MENU 
- Menu 
  - ("/order")
  - header contains login id 
- Order List Container fixed to right 3rd of page with order total
  - Checkout button POST ("/order") 
  - Go to ("/order/:id")

CONFIRMATION/PAYMENT 
- ("/order/:id") 
- Show estimated wait time right side fixed 
- Payment options fixed on right 
- Left side shows order details & notes on order 
- Send order to emtimate wait function to update wait time

# Use ejs to display personalized info on refresh 
# Use jQuery to update things on the page without a page refresh

# Route List 
- GET("/") 
- POST("/") 
- GET("/order") 
- POST("/order") 
- GET("/order/:id")
- POST("/order/:id")

## Header & Footer 
[] Build header template 
[] Build footer template 

## Home Page 
[] Route to homepage 
[] HTML skeleton -- Add templates 
[] Create Delivery and Takeout buttons 
[] Create forms for each of the above 
[] Create sliding form to appear upon click of the button 
[] Disable selected button after click 
[] POST route for form submission 
[] GET/redirect to /order page 

## Order Page 
[] HTML skeleton -- add templates
[] GET route
[] Add login id to the header
[] Display all foods
[] Create drop down selector to choose food type 
[] Display food types after selection 
[] Foods has display a picture title and price with an add to cart button 
[] Order cart has be fixed to the right 3rd of the page showing all chosen foods 
[] Order cart has checkout button which is a POST and GET to the order/:id page 
[] Price will accumulate as items are added to the cart 

## Orders/:id Page 
[] HTML skeleton -- add templates
[] Implement SMS API
[] GET route
[] Show order summary 
[] Show total price 
[] Comments and special instructions under the items summary 
[] Fixed payment option details to the right side of the view 
[] Display estimated wait time under the payment details 

