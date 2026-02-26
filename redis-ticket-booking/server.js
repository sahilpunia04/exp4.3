require("dotenv").config();
const app = require("./src/app");
const { connectRedis } = require("./src/config/redis");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectRedis(); // connect redis first

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();