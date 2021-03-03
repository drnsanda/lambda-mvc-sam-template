# Setup

# Follow AWS SAM Instructions for further information

# You can create your own environment, use webpack or any other approach. But I recommend using webpack.


> **Important** make sure to update the template.yml before running your code locally or trying to deploy to the test environment.
> You don't need to deploy your code, the pipeline does it for you (If CI/CD is configured properly)


> **Important** Please make sure CDN_keys folder should be in /src folder before deploy else it will cause issue with those apis whihc uses cloudfront to signed s3 media files.

Build & Deploy your lambda in the testing env:

```bash
npm run deployAWS
```

Build & Deploy your lambda in the production env:

```bash
npm run deployAWSProduction
```
