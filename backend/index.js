require("dotenv").config()

const { createApp } = require("./app")


const Anim = require("./database/anim.model");
const connect = require("./database/connect");

async function start() {
  try {
    await connect();

    const app = createApp(Anim);

    app.listen(8000, () => {
      console.log("Server listening on port 8000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();