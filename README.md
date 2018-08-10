# Bamazon

##Description
This application implements a command line storefront using the npm inquirer package and MySQL database. The application presents two interfaces: customer and manager.


##Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, "insufficient quantity" will be displayed.

##Manager Interace
The manager interface presents a list of four options, as below.

? Please select an option: (Use arrow keys)
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product

The View Products for Sale option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

The View Low Inventory option shows the user the items which currently have fewer than 5 units available.

The Add to Inventory option allows the user to select a given item ID and add additional inventory to that item.

The Add New Product option allows the user to enter details about a new product which will be entered into the database.



[Bamazon Demo](https://youtu.be/ynMsoxrqNn0)