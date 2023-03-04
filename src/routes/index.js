const guestRouter = require("./guest");
const adminRouter = require("./admin");
const giaoVienRouter = require("./giaovien");
const hocVienRouter = require("./hocvien");

function route(app) {
  app.use("/admin", adminRouter);
  app.use("/giaovien", giaoVienRouter);
  app.use("/hocvien", hocVienRouter);
  app.use("/", guestRouter);
  app.use(function (req, res, next) {
    res.status(404).send("Sorry, we couldn't find that resource!");
  });
}

module.exports = route;
