const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const employerRoutes = require("./routes/employerRoutes");
const userRoutes = require("./routes/userRoutes");

app.use('/api/users', userRoutes);
app.use("/api/employers", employerRoutes);

mongoose.connect("mongodb://localhost:27017/jobAppDB")


.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
})
.catch(err => console.error("❌ DB Error:", err));
