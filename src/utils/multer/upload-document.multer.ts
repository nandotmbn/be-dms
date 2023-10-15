import multer from 'multer';
import documentStorage from './disk-storage/document.storage';

const uploadDocument = multer({
  storage: documentStorage,
  limits: {
    fileSize: 10000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error('Please upload a pdf document'));
    }
    cb(null, true);
  }
});

export { uploadDocument };
