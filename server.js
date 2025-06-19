const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/calculate", (req, res) => {
  let { num1, num2, operation } = req.body;

  // Parse numbers
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.json({ result: "Iltimos, son kiriting!" });
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      result = num2 !== 0 ? num1 / num2 : "0 ga bo‘lish mumkin emas!";
      break;
    default:
      result = "Noto‘g‘ri amal!";
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`✅ Server ishlayapti: http://localhost:${PORT}`);
});
