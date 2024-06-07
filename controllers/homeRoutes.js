const router = require('express').Router();

router.post('/upload', function(req, res) {
  let uploadedFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json('No files were uploaded.');
  }

  // TODO: Get actual name from HTML
  uploadedFile = req.files.profilePicture;
  uploadPath = __dirname + '/public/storage/' + uploadedFile.name;

  uploadedFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json('File Uploaded!');
  })
});