
import express from "express";
import routes , {setSocketServer} from "./routes/index.js";
import handlebars from "express-handlebars";
import viewRouter from "./routes/views.router.js";

const app = express();

app.engine("hbs", handlebars.engine({ extname: ".hbs", defaultLayout: "main.hbs" ,layoutsDir: "./src/views/layouts",
    helpers: {
      ifEquals: (a, b, options) => (a == b ? options.fn(this) : options.inverse(this)),
      paginationPages: (totalPages, currentPage) => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
    }  

}));
app.set("view engine", "hbs");
app.set("views", "./src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("src/public"));

app.use("/", viewRouter);
app.use("/api", routes);



export { setSocketServer };
export default app;