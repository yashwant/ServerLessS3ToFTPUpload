# Resrource Creation and Configuration

1) Initiate stack creation: 
	$ aws cloudformation create-stack --stack-name static-lambda-nat-vpc-stack --template-body file://resources.yml --capabilities CAPABILITY_AUTO_EXPAND

2) Check resources
$ aws cloudformation describe-stack-resource --stack-name "static-lambda-nat-vpc-stack"

3) Look for Resources with following logical Ids & get their PhysicalResourceId:

"LogicalResourceId": "ServerlessSecurityGroup"
"LogicalResourceId": "ServerlessPrivateSubnetA"
"LogicalResourceId": "ElasticIpLambda"

4) update security group value and subnet values in config file

5) Deploy serverless functions