const express = require('express');
const { resolve } = require('path');
const cors = require("cors");
const { DefaultSerializer } = require('v8');

const app = express();
app.use(cors())
const port = 3000;


// ======================= Endpoints Below =======================
// start node app: node index.js

function getHomeMessage() {
  return 'This is Home Page of FlipDeal.';
}

app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

function getCartTotalPrice(cartTotal,newItemPrice=0,discount=0,isMember='false'){
  let membership = isMember=='true';
  let newCartTotal = cartTotal + newItemPrice;
  let discountednewCartPrice;

  if (membership){
    discountednewCartPrice = newCartTotal - (newCartTotal*(discount/100));
  } else {
    discountednewCartPrice = newCartTotal 
  }
  return discountednewCartPrice;
}

// /cart-total?cartTotal=1000&newItemPrice=0
app.get('/cart-total', (req, res) => {

  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let totalCartPrice = getCartTotalPrice(cartTotal, newItemPrice, 0, "false").toString()

  res.send(totalCartPrice);
});

// /membership-discount?cartTotal=1000&isMember=true
app.get('/membership-discount', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let totalCartPrice = getCartTotalPrice(cartTotal, 0, 10, isMember).toString()

  res.send(totalCartPrice);
});

function getcartTotalTax(cartTotal, tax=5){
  let cartTotalTax = (cartTotal*(tax/100));
  return cartTotalTax;
}
// /calculate-tax?cartTotal=1000
app.get('/calculate-tax', (req, res) => {

  let cartTotal = parseFloat(req.query.cartTotal);
  let cartTotalTax = getcartTotalTax(cartTotal).toString()

  res.send(cartTotalTax);
});

function getDeliveryTime(distance,shippingMethod){

  let deliveryTime;

  if (shippingMethod.toLowerCase()=="standard"){
    deliveryTime = Math.round(distance/50);
  } else {
    deliveryTime = Math.round(distance/100);
  }
  return deliveryTime;
}

// /estimate-delivery?shippingMethod=express&distance=600
app.get('/estimate-delivery', (req, res) => {

  let distance = parseFloat(req.query.distance);
  let shippingMethod = req.query.shippingMethod;
  let deliveryTime = getDeliveryTime(distance, shippingMethod).toString()

  res.send(deliveryTime);
});

function getShippingCose(distance,weight){
  return weight * distance * 0.1;
}

// /shipping-cost?weight=20&distance=600
app.get('/shipping-cost', (req, res) => {

  let distance = parseFloat(req.query.distance);
  let weight = parseFloat(req.query.weight);
  let shippingCose = getShippingCose(distance, weight).toString()

  res.send(shippingCose);
});

function getLoyaltyPoints(purchaseAmount){
  return purchaseAmount*2;
}

// /loyalty-points?purchaseAmount=3600
app.get('/loyalty-points', (req, res) => {

  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = getLoyaltyPoints(purchaseAmount).toString()

  res.send(loyaltyPoints);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
