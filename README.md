# Upload images to cloudinary

This is a simple example of a problem with the client receiving actionData or in fact any message from the server. I've also tested this with toast cookies session and it's the same: the cookie is read by the root loader but there is no javascript response on the client.

The relevent files are:

```
├── app
|   ├── components
|   |   ├── uploadAvatar.js
│   ├── routes
│   │   ├── cloudinary-upload.tsx // upload to cloudinary
│   │   └── local-upload.tsx // local upload using build in [createfileuploadhandler](https://remix.run/docs/en/v1/api/remix#unstable_createfileuploadhandler)
│   └── utils
│       └── utils.server.ts  // init cloudinary nodejs client on server side
|── .env // holds cloudinary credentails
```

## Related Links

- [Handle Multiple Part Forms (File Uploads)](https://remix.run/docs/en/v1/api/remix#unstable_parsemultipartformdata-node)
- [Upload Handler](https://remix.run/docs/en/v1/api/remix#uploadhandler)
- [Custom Uploader](https://remix.run/docs/en/v1/api/remix#custom-uploadhandler)
