const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// ======================= Tutorial: BD1.1 =======================
// start node app: node index.js
// base GET code
app.get('/', (req, res) => {
  res.send(getHomeMessage());
});

// /shoutname?name=Himanshu
app.get('/shoutname', (req, res) => {
  let name = req.query.name;
  let nameUpperCase = name.toUpperCase();

  res.send(nameUpperCase);
});

// /shoutfullname?first=Himanshu&last=Khairajani
app.get('/shoutfullname', (req, res) => {
  let first = req.query.first;
  let last = req.query.last;
  let nameUpperCase = first + ' ' + last;

  res.send(nameUpperCase);
});

// /date?month=Sept&year=1999
app.get('/date', (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let formattedDate = month + ', ' + year;

  res.send(formattedDate);
});

// /greet?name=Himanshu
app.get('/greet', (req, res) => {
  let name = req.query.name;
  let greetingMessage = 'Namaste, ' + name + '!';

  res.send(greetingMessage);
});

// /address?street=34+Samriddhi+Vihar&city=Raipur&state=CG
app.get('/address', (req, res) => {
  let street = req.query.street;
  let city = req.query.city;
  let state = req.query.state;
  let completeAddress = street + ', ' + city + ', ' + state;

  res.send(completeAddress);
});

// /email?username=himanshukhairajani8&domain=gmail.com
app.get('/email', (req, res) => {
  let username = req.query.username;
  let domain = req.query.domain;
  let email = username + '@' + domain;

  res.send(email);
});

// ======================= Tutorial: BD1.2 =======================
// /total-distance?distance1=100&distance2=08
app.get('/total-distance', (req, res) => {
  let distance1 = parseFloat(req.query.distance1);
  let distance2 = parseFloat(req.query.distance2);
  let totalDistance = distance1 + distance2;

  res.send(totalDistance.toString());
});

// /total-time?time1=100&time2=08&time3=08
app.get('/total-time', (req, res) => {
  let time1 = parseFloat(req.query.time1);
  let time2 = parseFloat(req.query.time2);
  let time3 = parseFloat(req.query.time3);
  let totalTime = time1 + time2 + time3;

  res.send(totalTime.toString());
});

// /total-speed?distance=100&time=08
app.get('/total-speed', (req, res) => {
  let distance = parseFloat(req.query.distance);
  let time = parseFloat(req.query.time);
  let totalSpeed = distance / time;

  res.send(totalSpeed.toString());
});

// /total-cal?duration1=100&duration2=100&calPerMin=2
app.get('/total-cal', (req, res) => {
  let duration1 = parseFloat(req.query.duration1);
  let duration2 = parseFloat(req.query.duration2);
  let calPerMin = parseFloat(req.query.calPerMin);
  let totalCal = (duration1 + duration2) * calPerMin;

  res.send(totalCal.toString());
});

// /interest?principal=1000&rate=5&time=2
app.get('/interest', (req, res) => {
  let principal = parseFloat(req.query.principal);
  let rate = parseFloat(req.query.rate);
  let time = parseFloat(req.query.time);
  let interest = (principal * time * rate) / 100;

  res.send(interest.toString());
});

// ======================= Tutorial: BD1.3 =======================
// /check-number?number=2
app.get('/check-number', (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number > 0) {
    result = 'Positive';
  } else if (number == 0) {
    result = 'Zero';
  } else {
    result = 'Negative';
  }
  result = 'Number is ' + result;

  res.send(result);
});

// /check-odd-even?number=3
app.get('/check-odd-even', (req, res) => {
  let number = parseFloat(req.query.number);
  let result;
  if (number % 2 == 0) {
    result = 'Even';
  } else {
    result = 'Odd';
  }
  result = 'Number is ' + result;

  res.send(result);
});

// /check-login?isLoggedIn=true
app.get('/check-login', (req, res) => {
  let is_user_logged_in = req.query.isLoggedIn == 'true';
  let result;
  if (is_user_logged_in) {
    result = 'User is logged in';
  } else {
    result = 'User is not logged in';
  }

  res.send(result);
});

// ======================= Tutorial: BD1.4 =======================
// function for home page (round implemented in beginning)
function getHomeMessage() {
  return 'This is Home Page.';
}

function checkPassword(password) {
  if (password.length < 15) {
    return 'Weak password';
  } else {
    return 'Strong password';
  }
}

// /check-password?password=himanshu
app.get('/check-password', (req, res) => {
  res.send(checkPassword(req.query.password));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
