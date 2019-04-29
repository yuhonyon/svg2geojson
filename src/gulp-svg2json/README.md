# svg 转 geojson(gulp 插件)

---

[TOC]

## 使用方法

### 1.下载

    git clone https://github.com/yuhonyon/svg2geojson.git

### 2.安装

```bash
cd geojson
cnpm i
```

### 3.使用

- 将 svg 文件直接放在 ** svg/ ** 目录下
- 输入命令

```
gulp
```

- 在 ** dist/ ** 目录下将生产对应的目录,目录下有转换后的 geojson 文件以及行政中心的坐标文件和 svg 原文件

## 制作地图 geojson 数据的所有步骤

- 设计地图草稿
- 根据设计稿使用 ai 画矢量地图
- 导出 svg
- 使用 gulp 将 svg 转换为 geojson
- 使用图表库制作地图

### 设计地图草稿

设计师设计地图草稿(只需明确行政划分区域即可),如下图
![](http://ww1.sinaimg.cn/large/82eaf5a8gw1fb5hdct8ucj20br0e5abw.jpg)

### 使用 AI 描出矢量图

- 将设计草稿导入 AI
- 新建图层,在图层内跟据设计稿使用钢笔工具描出一个行政区的行政(使用多边形描边)
- 将该图层取名为行政区名字
- 重复第 2 步,描出所有行政区

![](http://ww2.sinaimg.cn/large/82eaf5a8gw1fb5he2yb4kj20jo0dbjto.jpg)

- 选择所有描点,转换尖角,去除不小心画出的曲线(导出的 svg 不是由 polygon 组成的而是 path 的时候使用这个方法,建议描完后就使用一次)
  ![](http://ww2.sinaimg.cn/large/82eaf5a8gw1fb5hevxtdrj20ht0fpjty.jpg)
- 在每个图层中心处再画一个圆形或者椭圆
  ![](http://ww4.sinaimg.cn/large/82eaf5a8gw1fb5hf9spu6j20k70c7q5d.jpg)
- 删除设计草稿的图层导出 svg，没有出错的话格式应该如下
  ![](http://ww3.sinaimg.cn/large/82eaf5a8gw1fb5hfo9pytj20hp0ao794.jpg)

- 如果发现 poluygon 标签变成了 path,请注意第 4 步骤

** 注意:导出的 svg 转换出的 geojson 制作的地图将会是垂直颠倒的(可能是坐标轴不一样,
一个左上角一个右下角),所以我们要把我们制作的 AI 图垂直翻转后再导出 svg **

![](http://ww2.sinaimg.cn/large/82eaf5a8gw1fb5hgx82ouj20bw0dgmyg.jpg)

### 将 svg 转换为 geojson

### 实例

#### [echarts (echarts 会将地图横向压扁,需要设置宽高,不能自适应)](http://jsrun.net/iNpKp/embedded/all/light/)

<iframe width="100%" height="300" src="http://jsrun.net/iNpKp/embedded/all/light/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### [highcharts](http://jsrun.cn/ZNpKp/result/light/)

<iframe width="100%" height="300" src="http://jsrun.cn/ZNpKp/result/light/" frameborder="0" ></iframe>
