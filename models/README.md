## FileUpload

```
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
```

### Create Parent Path
- Create the upload directory if it doesn't exist. [More...](https://www.npmjs.com/package/express-fileupload#available-options)