
const aws = require('aws-sdk')

aws.config.update({
  secretAccessKey: '9xGxoPXgjEEZy1tVE0o20Nrh8y1f60rBalEap44r',
  accessKeyId: 'AKIAJSWQCQHVG64RUZMQ',
  region: 'us-east-2'
})
var s3Client = new aws.S3()
const downloadParams = {
  Bucket: 'tasks-pornase',
  Key: ''
}
const downloads3 = {};
downloads3.s3Client = s3Client;
downloads3.downloadParams = downloadParams;

module.exports = downloads3;