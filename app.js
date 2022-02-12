const path = require("path");

const express = require("express");
const expressLayout = require("express-ejs-layouts");


//* Load Config
const app = express();

//* View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", "views");

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/", require("./routes/index.js"))


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);


process.on('unhandledRejection', err => {
    console.log(err);
});