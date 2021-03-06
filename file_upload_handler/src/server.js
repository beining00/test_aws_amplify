import express from "express";
import multer from "multer";

const PORT = process.env.PORT || 8000
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquepreffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquepreffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  const acceptFileType = ["video/mp4", "image/png", "image/jpeg", "image/gif"];
  if (acceptFileType.includes(file.mimetype)) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    cb(new Error("invalid File type\nonly accept" + acceptFileType));
  }

  //cb(null, false)

  // You can always pass an error if something goes wrong:
  //cb(new Error('I don\'t have a clue!'))
}

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
});

// TODO REMOVE : test GET 
app.get("/test_get", (req, res)=>{
    res.send("test_get");
})

// TODO REMOVE : test POST 
app.post("/test_post", (req, res)=>{
  console.log(req)
  res.send("test_post");
})



app.post("/fileReceiver", upload.single("userFile"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send(req.file);
});

app.post("/multiFileReceiver", upload.array("userFile", 10), (req, res) => {
  res.send("Multiple File received");
  console.log(req);
});

app.listen(PORT, () => {
  console.log("listening on port 8000");
});
