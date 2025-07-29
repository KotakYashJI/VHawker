import express from "express";
import dotenv from "dotenv";
import connectdatabase from "./database/database.js";
import Hawkerroute from "./routes/hawker.route.js";
import semiwholesalerroute from "./routes/semiwhole.route.js";
import Wholesalerroute from "./routes/wholesaler.route.js";
import productroute from "./routes/product.route.js";
import Userroute from "./routes/user.route.js";
import Orderroute from "./routes/order.route.js";
import Contactroute from "./routes/contact.route.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

connectdatabase();

const allowedOrigins = [
    "http://localhost:5173",
    "https://vhawker.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use("/api/users", Userroute);
app.use("/api/hawkers", Hawkerroute);
app.use("/api/semiwholesalers", semiwholesalerroute);
app.use("/api/wholesalers", Wholesalerroute);
app.use("/api/products", productroute);
app.use("/api/orders", Orderroute);
app.use("/api/contacts", Contactroute);

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
