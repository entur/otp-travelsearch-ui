#!/bin/bash

BASE_URI=$1

if [ -z "$BASE_URI" ]; then
  echo "USAGE: $0 gs://otpreport-test.entur.org/otp-travelsearch-qa"
  exit 1
fi

echo "Uploading build directory content to $BASE_URI"
gsutil -h "Cache-Control:no-cache" -m cp -r build/* $BASE_URI

# AVoid doing this for reports directory,

gsutil -m acl ch -u AllUsers:R $BASE_URI/*
gsutil -m acl ch -r -u AllUsers:R $BASE_URI/static/
