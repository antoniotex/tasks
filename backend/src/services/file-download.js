
const aws = require('aws-sdk')

aws.config.update({
  secretAccessKey: '4Dc6DMxxze00G1RZQrGrlGaJ25JzHU2PIayKUy43',
  accessKeyId: 'AKIAJWTB3TW6E6WASFEA',
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