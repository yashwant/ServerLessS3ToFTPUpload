# ServerlessS3ToFTPUpload

## Setup Steps:
1) Take a git pull of code
2) Run npm install to install package dependencies
3) Rename aws_params.template file to aws_params.yml
4) Update parameter values
5) Deploy the code using $ sls deploy
6) on terminal you will get one deployed endpoint like
	https://{lambda stage id}.execute-api.{aws region}.amazonaws.com/{deployment stage}/gateway_ip/show
	call this GET endpoint to get public Elastic IP
7) Whitelist thi IP in your FTP server
8) Test by uploading files to $INPUT_S3_BUCKET S3 bucket
9) check copied file in your FTP server inside $FTP_FOLDER folder 
