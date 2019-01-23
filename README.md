# ServerlessS3ToFTPUpload

## Setup Steps:
1) Take a git pull of code
2) Run npm install to install package dependencies
3) Rename aws_params.template file to aws_params.yml
4) Update parameter values
5) Deploy the code using $ sls deploy
6) Test by uploading files to $INPUT_S3_BUCKET S3 bucket
7) check copied file in your FTP server inside $FTP_FOLDER folder 
