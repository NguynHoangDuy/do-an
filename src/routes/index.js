const guestRouter = require("./guest");
const adminRouter = require("./admin");

function route(app) {

  
  app.use("/admin", adminRouter);
  app.use("/", guestRouter);
  app.use(function(req, res, next) {
    res.status(404).send("Sorry, we couldn't find that resource!");
  });
 
}

module.exports = route;
