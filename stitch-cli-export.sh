#!/bin/sh
source .env
echo Logging into Stitch
stitch-cli --version
#stitch-cli login --username=$STITCH_USERNAME --api-key=$STITCH_API_KEY
echo $STITCH_APP_ID
echo Exporting from Stitch 
stitch-cli export --app-id=$STITCH_APP_ID --include-hosting
echo Logging out
#stitch-cli logout
echo export complete
