#!/bin/sh
export PASSPHRASE=$3
export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
 
# Delete any older than 1 month
#duplicity remove-older-than 1M --encrypt-key=E5E44D9E --sign-key=E5E44D9E s3+http://BauschLomb
 
duplicity --encrypt-key=E5E44D9E --sign-key=E5E44D9E $5 s3+http://$4
 
export PASSPHRASE=$3
export AWS_ACCESS_KEY_ID=$1
export AWS_SECRET_ACCESS_KEY=$2
