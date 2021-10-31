const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        console.log("inside GridFsStorage")

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            console.log(filename);
            return filename;
        }
        console.log('HERE');
        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

// const temp_folder = '/tmp';  

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         console.log("destination  : " + temp_folder);
//         cb(null, temp_folder);
//     },
//     filename: function (req, file, cb){
//         console.log("filename tmp : " + "xxx");
//         console.log("filename     : " + file.originalname);
//         cb(null, file.originalname)
//     }
// })


// const storage = new GridFsStorage({
//     url: mongoURI, 
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   })

module.exports = multer({ storage });





