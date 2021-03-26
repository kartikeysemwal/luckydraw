const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
