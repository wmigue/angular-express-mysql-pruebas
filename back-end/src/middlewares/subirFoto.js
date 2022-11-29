const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/temp'),
    filename: (req, file, cb) => {
        const nombretoreq = Date.now() + "-" + file.originalname
        cb(null, nombretoreq);
        req.nombretoreq = nombretoreq //inyecto al req para que guarde en bd con el mismo nombre del archivo
    }
})

const uploadFotoMiddleware = multer(
    {
        //le digo donde quiero que suba el archivo.
        //dest: path.join(__dirname, '../public/temp'),
        storage: storage
    }
).single('foto')



module.exports = uploadFotoMiddleware 