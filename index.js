require("dotenv").config();

const express = require("express");
const server = express();
const postsRouter = require("./Routes/posts-router");
const cors = require("cors");

server.use(express.json());

server.use(cors());

server.use("/", (req, res) => {
  res.status(200).json({ Welcome: "DEPLOYED" });
});

server.use("/api/posts", postsRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on: ${port} ***\n`);
});
