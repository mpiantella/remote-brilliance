#!/bin/bash 

stackName='Remote-Brilliance-Tiffin'
# will start from ~/cloud
cd cft
echo $stackName
aws cloudformation deploy --stack-name $stackName --template-file remote-brilliance.yaml --capabilities CAPABILITY_NAMED_IAM 