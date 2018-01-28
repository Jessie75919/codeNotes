
## Export Variable 

`dom-loader.js`
```js
export var secretButton = document.querySelector('#secret-button');
export var secretParagraph = document.querySelector('#secret-paragraph');

```
## import Variable

`app.js`
```js
import {secretButton, secretParagraph} from './dom-loader';
```

## Setup in Package.json

`package.json`

```js
"build:p" : "webpack src/js/app.js dist/bundle.js -p"
//                   source file    dist file     production=minify
```


## Webpack-dev-serve
```js
"build": "webpack-dev-server --entry ./src/js/app.js --output-filename ./dist/bundle.js",
          //                   入口                         出口
```

# Webpack Config Core 

## * Entry 
> where it starts and looks for dependacies

## * Output
> store the bundles

## * Module Loaders
> * Transform or treat by rules with extension(.vue) to js' file
> * the .css will use the same css-loader

## * Plugins
> process the one file (bundle) before to output file


# Webpack.config.js
> webpack --config 'config-name' => Can not use default config name.

```js
var path = require('path');

module.exports = {
    entry  : "./src/js/app.js",
    output : {
        path : path.resolve(__dirname , 'dist'), // 需要絕對路徑所以使用 path.resolve
        filename : "bundle.js",
		publicPath : "/dist"  // 對外路徑 => 會去尋找 http://localhost/dist/bundle.js
    },
	module : {
        // 要如何處置這些loader
        rules : [
            {
                // 用正規表達式測試結尾是否為.css的檔案，＄代表最後結尾一定要是這個字元
                test: /\.css$/,
                // 如果為真，則使用css-loader
                // loader : "css-loader"
				
				// 使用多個loader , 讀取順序是 「由後往前」 => 先讀css-loader 再讀 style-loader
                use : [ 
                    'style-loader', // 把CSS style加入DOM的head中,
                    'css-loader'
                ]
            }
        ]
    },
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
        })
    ]
};
```

# import SCSS
FILENAME : `_color.scss` ( __ + filename )

`main.scss`

```css
@import "colors"; // 直接寫檔名即可
```

## import main.scss to app.js
```js
import '../css/main.scss';
```







