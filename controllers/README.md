# Regular expression
- Comes natively in Javascript for string searching. So we can use the RegExp constructor to create a regular expression. No need to import RegExp module

Example:
```
  const regex = new RegExp(term, 'i');
```
With mongoose:
```
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
```

## Cloudinary

- Upload picture to Cloudinary:
In the "req.files.file" comes this object:
```
{
  name: 'pictureName.jpg',
  data: <Buffer >,
  size: 384907,
  encoding: '7bit',
  tempFilePath: '\\tmp\\tmp-1-1657157652495',
  truncated: false,
  mimetype: 'image/jpeg',
  md5: '165578b7c4645a7877725126663a4ed7',
  mv: [Function: mv]
}
```

 We destructure the "tempFilePath" property to use the path of the picture that will serve as an argument to the "upload()" method of Cloudinary:

 ```
 const { tempFilePath } = req.files.file;
 cloudinary.uploader.upload(tempFilePath);
 ```

 - Delete picture before update new picture:

```
// Clean the previous picture
  if (model.picture) {
    const nameArray = model.picture.split('/');
    const name = nameArray[nameArray.length - 1];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }
```