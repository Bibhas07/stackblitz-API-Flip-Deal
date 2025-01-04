const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(cors());
//app.use(express.static('static'));
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

//Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  console.log('Cart Total');
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});

// Apply a discount based on membership status
app.get('/membership-discount', (req, res) => {
  console.log('membership-discount');
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  console.log('cartTotal:', cartTotal);
  console.log('discountPercentage:', discountPercentage);
  if (isMember)
    res.send((cartTotal - (cartTotal * discountPercentage) / 100).toString());
  else res.send(cartTotal.toString());
});

//Calculate tax on the cart total
app.get('/calculate-tax', (req, res) => {
  console.log('calculate-tax');
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(((cartTotal * taxRate) / 100).toString());
});

// Estimate delivery time based on shipping method
app.get('/estimate-delivery', (req, res) => {
  console.log('/estimate-delivery');
  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  if (shippingMethod === 'standard') res.send((distance / 50).toString());
  else res.send((distance / 100).toString());
});

//Calculate the shipping cost based on weight and distance
app.get('/shipping-cost', (req, res) => {
  console.log('/shipping-cost');
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send((weight * distance * 0.1).toString());
});

// Calculate loyalty points earned from
app.get('/loyalty-points', (req, res) => {
  console.log('loyalty-points');
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send((purchaseAmount * 2).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
