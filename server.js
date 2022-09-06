const app = require("./app");
const port = process.env.PORT;
app.listen(3030, () => {
  console.log(`App running on port 3030`);
});
