# layaair-build
> build LayaAir project to `H5 game` or `WeChat game` or `Facebook game` project.

### Install
``` 
> npm install layaair-build
```

### Usage
```
> layaair-build
  Usage: layaair-build [options]
  --input            input dir
  --output           output dir
  --platform         [Optional] h5 || wechat || facebook def: h5
  --version          [Optional] app version def: read package.json
  --index            [Optional] index.html file def: index.html
  --env              [Optional] development || production
  --jsfile           [Optional] jsfile def: code.js
  --pngquality       [Optional] png quality def: 65-80
  --appid            [Optional] app id
  --projectname      [Optional] project name
  --orientation      [Optional] orientation
  --force            [Optional] [bool] force replace template
  --min              [Optional] [bool] uglify js
  --minpng           [Optional] [bool] use pngquant
  --publish          [Optional] [bool] publish project
  --x                [Optional] show this help

```