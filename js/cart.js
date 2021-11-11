/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
// table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cartItems);
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  //  let cart = 
  loadCart();
  clearCart();
  showCart(cart);
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.getElementsByTagName('tbody');
  tbody[0].innerHTML = '';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart(cart) {
  // TODO: Find the table body
  let tbody = document.getElementsByTagName('tbody');
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  for (let i = 0; i < cart.items.length; i++) {
    let tr = document.createElement('tr');
    let deleteTd = document.createElement('td');
    let numberTd = document.createElement('td');
    let nameTd = document.createElement('td');
    deleteTd.textContent = 'X';
    numberTd.textContent = cart.items[i].quantity;
    nameTd.textContent = cart.items[i].product;
    deleteTd.className = 'deleteButton';
    deleteTd.id = i;
    tr.appendChild(deleteTd);
    tr.appendChild(numberTd);
    tr.appendChild(nameTd);
    tbody[0].appendChild(tr);
  }
  console.log(tbody);
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  addDeleteButtons();
}

function addDeleteButtons() {
  console.log('delete buttons were added')
  for (let i = 0; i < cart.items.length; i++) {
    let button = document.getElementsByClassName('deleteButton');
    button[i].addEventListener('click', removeItemFromCart);
  }
}


function removeItemFromCart(event) {
  console.log('removeitemfromcart was hit');
  cart.removeItem(event.target.id);
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  clearCart();
  showCart(cart);
  cart.saveToLocalStorage(cart.items);
}



// This will initialize the page and draw the cart on screen
renderCart();