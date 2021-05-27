#!/bin/bash
echo "Making archive"
tar --directory=code -zcf dump.tar.gz .
echo "Sending archive to host"
sshpass -p $scp_pass scp -v -o StrictHostKeyChecking=no dump.tar.gz $scp_user@$scp_dest/
curl -X POST -H 'Content-type: application/json' --data '{"text":"deploy design"}' $slackaddy