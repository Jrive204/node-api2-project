const express = require("express");
const server = express();
const postsRouter = require("./Routes/posts-router");
const cors = require("cors");

server.use(express.json());

server.use(cors());

server.use("/api/posts", postsRouter);

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on: ${port} ***\n`);
});
