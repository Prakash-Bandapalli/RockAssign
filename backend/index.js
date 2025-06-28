require("dotenv").config();
const express = require("express");
const { startKeepAlive } = require("./src/utils/keepAlive");
const cors = require("cors");
const canvasRoutes = require("./src/api/routes/canvasRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/canvas", canvasRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is alive!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  startKeepAlive();
});
