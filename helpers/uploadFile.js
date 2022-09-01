const path = require('path');
const { v4: uuidv4 } = require('uuid');

const helperUploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const cutName = file.name.split('.');
    const extension = cutName[cutName.length - 1];

    // Validate the extension
    if (!validExtensions.includes(extension)) {
      return reject(
        `The extension .${extension} is not allowed - Valid extensions: ${validExtensions.join(', ')}`
      );
    }

    const newFileName = uuidv4() + '.' + extension; // j3kl-1s34-e12j.jpg
    const uploadPath = path.join(__dirname, '../uploads/', folder, newFileName);

    file.mv(uploadPath, err => {
      if (err) {
        reject(err);
      }
      resolve(newFileName);
    });
  });
};

module.exports = {
  helperUploadFile,
};
