
const aws = require('aws-sdk')
require('dotenv/config')

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_ID,
  region: process.env.AWS_REGION
})

var s3Client = new aws.S3()
const downloadParams = {
  bucket: process.env.AWS_BUCKET || 'tasks-pornase',
  Key: ''
}
const downloads3 = {};
downloads3.s3Client = s3Client;
downloads3.downloadParams = downloadParams;

module.exports = downloads3;