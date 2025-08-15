import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectdatabase from "./database/database.js";
import Hawkerroute from "./routes/hawker.route.js";
import semiwholesalerroute from "./routes/semiwhole.route.js";
import Wholesalerroute from "./routes/wholesaler.route.js";
import productroute from "./routes/product.route.js";
import Userroute from "./routes/user.route.js";
import Orderroute from "./routes/order.route.js";
import Contactroute from "./routes/contact.route.js";
import Adminroute from "./routes/admin.route.js";
import cors from "cors";
import cookieparse from "cookie-parser";

dotenv.config();

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
app.use(cookieparse());

app.get("/", (req, res) => {
    res.send("Vhawker backend is running");
});

app.use("/api/users", Userroute);
app.use("/api/admin", Adminroute);
app.use("/api/hawkers", Hawkerroute);
app.use("/api/semiwholesalers", semiwholesalerroute);
app.use("/api/wholesalers", Wholesalerroute);
app.use("/api/products", productroute);
app.use("/api/orders", Orderroute);
app.use("/api/contacts", Contactroute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

export default app;