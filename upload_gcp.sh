#!/bin/bash

REPORT_BASE_URI=$1

if [ -z "$REPORT_BASE_URI" ]; then
  echo "USAGE: $0 gs://otpreport-test.entur.org/otp-travelsearch-qa"
  exit 1
fi

echo "Uploading build directory content to $REPORT_BASE_URI"
gsutil -h "Cache-Control:private" -m cp -r build/* $REPORT_BASE_URI

gsutil -m acl ch -u AllUsers:R $REPORT_BASE_URI/*

# Avoid doing this for the reports directory,
gsutil -m acl ch -r -u AllUsers:R $REPORT_BASE_URI/static/*
