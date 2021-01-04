const express = require("express");
const { connect } = require("mongoose");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/article"));
app.use("/api", require("./routes/speciality"));
app.use("/api", require("./routes/topic"));
app.use("/api", require("./routes/user"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT} `));
