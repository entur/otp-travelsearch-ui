#!/bin/bash

REPORT_BASE_URI=$1

if [ -z "$REPORT_BASE_URI" ]; then
  echo "USAGE: $0 gs://otpreport.dev.entur.org/otp-travelsearch-qa"
  exit 1
fi

echo "Uploading build directory content to $REPORT_BASE_URI"
gsutil -o "GSUtil:parallel_process_count=1" -h "Cache-Control:private" -m cp -r build/* $REPORT_BASE_URI

gsutil -o "GSUtil:parallel_process_count=1" -m acl ch -u AllUsers:R $REPORT_BASE_URI/*

# Avoid doing this for the reports directory,
gsutil -o "GSUtil:parallel_process_count=1" -m acl ch -r -u AllUsers:R $REPORT_BASE_URI/js/*
gsutil -o "GSUtil:parallel_process_count=1" -m acl ch -r -u AllUsers:R $REPORT_BASE_URI/css/*
