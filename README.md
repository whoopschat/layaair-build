# layaair-build
> build LayaAir project to `H5 game` or `WeChat game` or `Facebook game` or `QQ Game` project.

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
    --platform         [Optional] h5 || wechat || qq || facebook def: h5
    --env              [Optional] development || production(prod)
    --index            [Optional] index.html file def: index.html
    --version          [Optional] version code def: read package.json
    --buildnum         [Optional] version build num def: 0
    --jsfile           [Optional] jsfile def: code.js
    --appid            [Optional] app id
    --projectname      [Optional] project name
    --orientation      [Optional] orientation
    --minpng           [Optional] [bool] use pngquant
    --pngquality       [Optional] png quality def: 65-80
    --min              [Optional] [bool] uglify js
    --publish          [Optional] [bool] publish project
    --force            [Optional] [bool] ignore 'platform'-game.lock
    --x                [Optional] show this help
```