#!/bin/bash 

cd cft
aws cloudformation  validate-template --template-body file://remote-brilliance.yaml
