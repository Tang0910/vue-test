const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 注意要解构赋值！！！
module.exports = {
    // 模式: 生产环境
    mode: 'production',
    // 入口
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    // 出口(打包生成js)
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // 模块加载器
    module: {
        rules: [
            {
                test: /\.js$/, //只检测js文件
                exclude: /node_modules/,  //排除
                use: {
                  loader: "babel-loader",  //使用babel-loader解析
                  options: {        //配置
                    presets: [
                      ['@babel/preset-env']
                    ],
                    cacheDirectory: true, // 开启babel缓存，提高加载速度   
                  }
                }
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
              },
              {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',    //对比file-loader，它可以识别图片的大小
                    options: {
                      limit: 8192,//// 8kb --> 8kb以下的图片会base64处理
                      publicPath: 'images/',   // 决定浏览器读取图片的位置，默认在outputPath值的文件夹中
                      outputPath: 'images',    // 决定图片打包到dist文件夹中的哪个位置
                      name: '[hash:5].[ext]',  // 修改文件名称 [hash:8] hash值取8位  [ext] 保留原本文件扩展名
                      esModule:false   //禁用webpack5资源模块
                    },
                  },
                ],
                type:'javascript/auto'  
                //因为webpack5内置了资源模块，无需利用url引入，会冲突，所以要先将模块禁用再使用旧的loader
              },
  
  
    


        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin() // 自动清除output.path目录下的文件
    ],
    devServer: {
        open: true, // 自动打开浏览器
    },
    devtool: 'cheap-module-source-map'
}
