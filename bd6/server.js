let { app } = require("./index.js");
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`${port}`);
});
