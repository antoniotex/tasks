
const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')
const path = require('path')
require('dotenv/config')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_ID,
  region: process.env.AWS_REGION
})

var s3 = new aws.S3()

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    fileFilter: this.fileFilter,
    metadata: function (res, res, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' })
    },
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    },
  }),
})


const fileFilter = function (req, file, cb) {
  console.log('mimytype', file.mimetype)
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    // Rejeita o armazenamento
    cb(null, false)
  }
}

module.exports = uploadS3