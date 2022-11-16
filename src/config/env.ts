const dotenv = require("dotenv")
dotenv.config();

export default {
    FILE_HOST:
    process.env.NODE_ENV ==="development"
         ? "http://localhost:3200"
         : "https://my-node-ecommerce.herokuapp.com"
}