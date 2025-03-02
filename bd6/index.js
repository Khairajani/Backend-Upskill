// import express from "express";
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let { getStocks} = require("./stocks.js");
let {getTrades, addTrade} = require("./trades.js");

app.get("/", (req, res) => {
  res.send("=== BD6 Assignemnt ===");
});

// ======================= Assignment: BD6.6 =======================
app.get("/stocks",async (req, res)=>{
  try{
    let stocks = await getStocks()
    if(!stocks) return res.status(404).json({"message":"No stocks found"})
    else return res.status(200).json({"stocks":stocks})
  } catch(error){
    res.status(500).json({"message":`something went wrong ${error}`})
  }
})

app.get("/stocks/:ticker",async (req, res)=>{
  try{
    let ticker = req.params.ticker
    let stock = await getStocks(ticker)
    if(!stock) return res.status(404).json({"message":`No stock found with TICKER ${ticker}`})
    else return res.status(200).json({"stock":stock})
  } catch(error){
    res.status(500).json({"message":`something went wrong ${error}`})
  }
})

async function validateTrade(trade){
  if(!trade.stockId || typeof trade.stockId !=="integer"){
    return "'stockId' field is required in 'integer' format"
  }
  if(!trade.quantity || typeof trade.quantity !=="integer"){
    return "'quantity' field is required in 'integer' format"
  }
  if (!trade.tradeType || typeof user.tradeType !=="string"){
    return "'tradeType' field is required in 'string' format"
  }
  if (!trade.tradeDate || typeof user.tradeDate !=="string"){
    return "'tradeDate' field is required in 'string' format"
  }
  return null
}

app.post("/trades/new", async (req, res) => {
  let error = await validateTrade(req.body)
  if(error) return res.status(400).json({message: error})
  const addedTrade = await addTrade(req.body);
  res.status(201).json(addedTrade);
});

module.exports = { app, validateTrade };
