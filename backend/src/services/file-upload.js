
const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')
const path = require('path')

aws.config.update({
  secretAccessKey: '9xGxoPXgjEEZy1tVE0o20Nrh8y1f60rBalEap44r',
  accessKeyId: 'AKIAJSWQCQHVG64RUZMQ',
  region: 'us-east-2'
})

var s3 = new aws.S3()

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    bucket: 'tasks-pornase',
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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    // Rejeita o armazenamento
    cb(null, false)
  }
}

module.exports = uploadS3