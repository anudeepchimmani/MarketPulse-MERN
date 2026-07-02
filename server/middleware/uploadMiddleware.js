const multer = require("multer");
const path = require("path");

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes =
    /jpeg|jpg|png|webp/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedTypes.test(
    file.mimetype
  );

  if (extname && mimetype) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, JPEG, PNG and WEBP images are allowed."
    )
  );
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;