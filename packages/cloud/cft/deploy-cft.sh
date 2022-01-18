#!/bin/bash 

stackName='Remote-Brilliance-Tiffin'
# will start from ~/cloud
cd cft
# aws cloudformation create-stack --stack-name $stackName --template-body remote-brilliance.yaml \
# --capabilities CAPABILITY_NAMED_IAM 
#--parameters ParameterKey=APIName,ParameterValue=ProdNotesAPI
echo $stackName
aws cloudformation deploy --stack-name $stackName --template-file remote-brilliance.yaml --capabilities CAPABILITY_NAMED_IAM 