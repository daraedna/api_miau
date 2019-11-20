const multer = require('multer');
const path = require('path');



module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const extensao = path.extname(file.originalname);
            const name = path.basename(file.originalname);
        
            cb(null, `${name}-${Date.now()}${extensao}`)
    
        }
    }), 
}