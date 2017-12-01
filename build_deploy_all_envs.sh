#!/bin/bash

for env in carbon radon neon; do
  echo "-------- $env ---------"
  REPORT_BASE_URI=`jq -r ".$env.REPORT_BASE_URI" config/config.json | sed -s 's/http/gs/g'`;
  echo "gs URL: $REPORT_BASE_URI";

  gcp_context.sh $env &&
  BUILD_ENV=$env yarn build &&
  ./upload_gcp.sh $REPORT_BASE_URI

  echo "------ $env done ------"
  echo

done
