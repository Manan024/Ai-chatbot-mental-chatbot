import connectionToDb from "./Database/db.js";
import "dotenv/config";
import app from "./app.js";

connectionToDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`server started at localhost:${process.env.PORT} !`);
    });
  })
  .catch((err) => {
    console.log("Server Connection Failed !", err);
  });
