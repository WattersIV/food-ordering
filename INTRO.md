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


# Route List 
- GET("/") 
- POST("/") 
- GET("/order") 
- POST("/order") 
- GET("/order/:id")
- POST("/order/:id")

