#!/bin/bash

##########################################################################
# deploy-local.sh
#
# Usage:
#   ./script/deploy-local.sh [version]
#
##########################################################################

set -e

aws ecr get-login-password | docker login --username AWS --password-stdin 101624687637.dkr.ecr.us-west-2.amazonaws.com

echo "Building local docker image"
docker build --tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/atp:local .
docker tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/atp:local 101624687637.dkr.ecr.us-west-2.amazonaws.com/atp:latest

echo "Pushing local/latest docker image"
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/atp:local
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/atp:latest

echo "Updating app-web"
./script/deploy-ecs.sh atp-app-web "local"