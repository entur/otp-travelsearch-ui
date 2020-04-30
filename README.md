# TravelSearchUI

Report viewer for reports generated by https://github.com/entur/otp-travelsearch-qa

## Run in development
```
yarn start
```

## Build
```
yarn build
```

## Build for specific environment for reports.
```
BUILD_ENV=neon yarn build
```

## Upload to gcp after build command above is executed

### Test/carbon
```
./upload_gcp.sh gs://otpreport-test.entur.org/otp-travelsearch-qa
```

### Production/stage
```
./upload_gcp.sh gs://otpreport-stage.entur.org/otp-travelsearch-qa
```

### Production/neon
```
./upload_gcp.sh gs://otpreport.entur.org/otp-travelsearch-qa
```


## How to build and deploy for otp2

OTP2 reports exist at otp-travelsearch-qa-otp2. To build and deploy for it add the following env:

    SERVICE_VERSION=v2

and append `-otp2`, to upload bucket folder argument. For example, to

To build and deploy for otp2 i carbon:

    BUILD_ENV=carbon SERVICE_VERSION=v2 yarn build
    ./upload_gcp.sh gs://otpreport-test.entur.org/otp-travelsearch-qa-otp2
