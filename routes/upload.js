const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
    console.log("upload()")
    if (req.file === undefined) res.send("you must select a file.");
    console.log(req.file)
    console.log(req.file.filename)
    const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
    //res.status(201).send(json({imgUrl:imgUrl}));
    //res.send(imgUrl)
    res.status(201).json({message: 'Image save received  saved  - SUCCESS.',imgUrl:imgUrl});
});

module.exports = router;
