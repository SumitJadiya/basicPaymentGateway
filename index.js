const express = require("express");
const Razorpay = require("razorpay");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.send("Welcome");
// });

app.post("/order", async (req, res) => {
  var instance = new Razorpay({
    key_id: "rzp_test_zVb5dUJyxIaCsi",
    key_secret: "2jkrRyfhfqods2DnBcB3w6A0",
  });

  const amount = req.body.amount;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  /*
  instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });
*/

  const myOrder = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    amount,
    order: myOrder,
  });
});

app.listen(4000, () => console.log(`Server is running at 4000`));
