
import express from "express";
import routes , {setSocketServer} from "./routes/index.js";
import handlebars from "express-handlebars";


const app = express();

app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));


app.use("/api", routes);



export default { app, setSocketServer };