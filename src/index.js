const express = require("express");
const path = require("path");
const app = express();
const route = require("./routes");
const session = require("express-session");
const port = 3000;
const bodyParser = require("body-parser");
const flash = require("express-flash");
const { updateModangKy } = require("./config/schedule");

setInterval(updateModangKy, 1000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.set("view engine", "pug");
app.set("views", "src" + "/views");
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: "SECRET",
        resave: true,
        saveUninitialized: true,
    })
);

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
