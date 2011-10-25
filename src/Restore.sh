#!/bin/sh
export PASSPHRASE=himym143
export AWS_ACCESS_KEY_ID=AKIAJYA5EAVUJ2ESSYZQ
export AWS_SECRET_ACCESS_KEY=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
 
## (to restore everything, just take out the --file-to-restore command and filename)
 
# Restore a single file
# NOTE - REMEMBER to name the file in both the --file-to-restore and in the location you will restore it to!

duplicity --file-to-restore lol s3+http://BauschLomb /home/neeleshbafna/pulsematics/lol --encrypt-key=E5E44D9E --sign-key=E5E44D9E -vinfo
 
# Restore a file from a specified day
# NOTE - Remember to name the file in both locations again!
#duplicity -t4D --file-to-restore FILENAME s3+http://BUCKETNAME /FILE/TO/RESTORE/TO --encrypt-key=YOUR_GPG_KEY --sign-key=YOUR_GPG_KEY
 
export PASSPHRASE=himym143
export AWS_ACCESS_KEY_ID=AKIAJYA5EAVUJ2ESSYZQ
export AWS_SECRET_ACCESS_KEY=YK6oekbfeBWcScYafYNHHgcAej2XetoGWz3WTUAH
