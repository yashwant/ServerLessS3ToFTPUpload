'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();
const Promise = require("bluebird");
var FTPClient = require('ftp');
const ftpClient = new FTPClient();

const FTPConnectionProperties = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT
};

function main(event, context, callback)
{
    console.log(event);
    console.log('====================================>');
    console.log(event.Records);
    var srcBucket = event.Records[0].s3.bucket.name;
    var srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    console.log('Bucket is: ====================================>', srcBucket);
    console.log('Key is: ====================================>', srcKey);

    let getFilePromise = getFromS3(srcBucket, srcKey, s3);
    getFilePromise.then(function (s3_file_data) {
             console.log('Upload file Data!!!!!!');
             console.log(s3_file_data);
             if(s3_file_data && s3_file_data.filedata && s3_file_data.filedata.length!==0)
             {
              console.log('File not empty.');
              return uploadToFTPServer(s3_file_data.filedata, s3_file_data.srcKey);
             }
             else
             {
              console.log('No file found.');
              callback(null, 'Failed to get file');
             }
            }, errHandler).
    then(function (upload_data) {
                console.log('File uploaded!!!!!!!');
              /* Get API response */
              callback(null, upload_data);
            }, errHandler);
}

function getFromS3(srcBucket, srcKey, s3)
{

    return new Promise(function (resolve, reject) {

        s3.getObject({
                    Bucket: srcBucket,
                    Key: srcKey
                },
                function(err, data) {
                    if (err) {
                        console.log(err, err.stack);
                        // callback(err);
                        reject(err); 
                    } else {
                        console.log("Raw text:\n" + data.Body.toString('ascii'));
                        let resp_data = {
                            filedata: data,
                            srcKey: srcKey
                        };
                        resolve(resp_data);
                    }
                });
    });
};

function uploadToFTPServer(local_file_name, srcKey) 
{

    console.log("Uploading file data to FTP server!!!");
    return new Promise(function (resolve, reject) {

      ftpClient.on('ready', function() {
        console.log("FTP function trigger!!!");
        ftpClient.put(local_file_name.Body, process.env.FTP_FOLDER+'/'+srcKey, function(err) {
          if (err) {
                throw err;
                console.log("FTP upload error!!!");
                ftpClient.end();
                reject(err);
                context.fail(err);
            }
            else
            {
                console.log("FTP upload success!!!");
                ftpClient.end();
                resolve(true);
            };
        });
      });

      ftpClient.connect(FTPConnectionProperties);
    });
}

var errHandler = function (err) {
  console.log('Error Ocured-------> ');
  console.log(err);
};

module.exports.uploadFileToFTP = main;