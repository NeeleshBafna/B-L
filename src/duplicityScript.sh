#!/bin/sh
#export PASSPHRASE=
export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
 
duplicity --no-encryption --include $4 --exclude '**' / s3+http://$3/$5

#export PASSPHRASE=
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
