#!/bin/bash 

# send the graphql schemas out first
# aws s3 sync . s3://my-bucket-name/cloudformation
# PROMPT> aws cloudformation deploy --template /path_to_template/my-template.json --stack-name my-new-stack --parameter-overrides Key1=Value1 Key2=Value2
cd cft
aws cloudformation  validate-template --template-body file://remote-brilliance.yaml
