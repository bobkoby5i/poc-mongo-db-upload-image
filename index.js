require("dotenv").config();
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connection = require("./db");
const express = require("express");
//const methodOverride = require('method-override')
const app = express();

const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(methodOverride('_method'));

// const mongo = require('mongodb');
app.use(cors())

let gfs;

// const mongo_uri = process.env.MONGO_RENT_A_CAR_URI || "mongodb://localhost:27017/photoDB";
// mongoose.connect(mongo_uri, {useNewUrlParser: true}).then(() => {
//     console.log('Connected to mongodb')
// }).catch(err => console.log(err))

connection();



const conn = mongoose.connection;
conn.once("open", function () {
    console.log("Open conectison for fgs")
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});




app.use("/file", upload);

// media routes
app.get("/file/:filename", async (req, res) => {
    console.log("Fetch from mongo filename: " + req.params.filename)
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        console.log(file)
        console.log(gfs)
        const readStream = gfs.createReadStream(file.filename);
        //const readStream = gfs.createReadStream({_id:  mongoose.Types.ObjectId("617dfc7b39ed97ca4f822597") });
        readStream.on('error', function (err) {
            console.log('An error occurred!', err);
            throw err;
          });        
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
        res.send("not found");
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {
        console.log(error);
        res.send("An error occured.");
    }
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

