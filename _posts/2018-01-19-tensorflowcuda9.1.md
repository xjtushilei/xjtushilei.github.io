---
layout: post
title: 技嘉Gigabyte主板Z370HD3安装1080ti+ubuntu17.10+Cuda9.1+cudnn7+tensorflow
categories: [java,jar,idea]
description: 技嘉的z370无法安装ubuntu16.04，tensorfolw最新版不支持cuda9.1，各种坑导致的错误
keywords: Z370HD3, ubuntu, cuda, cudnn7, tensorflow
---


> 版权声明：可以任意转载，转载时请标明文章[原始出处-xjtushilei](http://www.xjtushilei.com/2018/01/19/tensorflowcuda9.1/)和作者信息：[石磊](http://www.xjtushilei.com/about/)      


# 背景

主要就是遇到的各种坑，大家不要再范了。

- 技嘉的主板Z370HD3 不支持ubuntu16.04，安装过程中会报错，有ACPI error，google各种无解，官方售后不支持linux服务，因为这是家用消费级别的主板。
- 安装centos7.3，顺利安装，但是无线网卡不能正常运作，其他的操作系统cuda支持太可怜。
- ubuntu17.10，NVIDIA官网没有相关驱动，只有17.04，安装好后无线网卡无法使用，同时Ubuntu17.10有各种bug，在简单使用的情况下就发现了好多小bug，使用影响心情
- 最新版的tensorflow不支持cuda9.1，目测3个月后才支持，但是我们又不想安装旧版本cuda

# 过程

省略掉一系列的坑，最终结论就是ubuntu17.10+cuda9.1+cudnn7+非官方tensorflow

### Ubuntu17.10

正常安装就好啦。理论没什么大问题，由于安装了双系统，又不想在一个系统坏了的时候去折腾efi，所以采用了mbr方式的引导。

分区：200Gssd给了“/”,1T的机械给了“/home”



### NVIDIA 显卡驱动

在安装cuda之前，需要安装NVIDIA的驱动。主要就是注意版本号的问题


建议通过apt install 安装，省去好多麻烦，比如关闭核显的问题

首先添加源：
```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
```
然后安装英伟达的驱动，注意版本号(和你下载的cuda版本对应上，见下方第一张图的版本号)

```
sudo apt install nvidia-387 nvidia-387-dev
```

测试安装成功没(部分机器可能需要重启)
```
nvidia-smi
```

成功的话出现框，显示的东西可能不一样

```
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 387                 Driver Version: 387                    |
|                                                                             |
|-------------------------------+----------------------+----------------------+
|   0  1080ti        Off  | 00000000:06:00.0 Off |                  N/A |
| N/A   48C    P0    N/A /  N/A |    943MiB /  11002MiB |     26%      Default |
+-------------------------------+----------------------+----------------------+
```

### cuda9.1

下载网站: https://developer.nvidia.com/cuda-downloads

![mobaxterm设置](/images/blog/tensorflowcuda9.1/1.png)

然后需要安装c++等依赖包，确保gcc -v的版本在v6以上，当然，ubuntu17默认很高。

```
sudo apt-get install g++ freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libglu1-mesa libglu1-mesa-dev
```

```
gcc -v
```
版本不对的话，自行升级

下载好安装包后

```
chmod +x cuda_9.1.85_387.26_linux.run 
sudo ./cuda_9.1.85_387.26_linux.run  --override
```

这里有个坑，注意这几个选项，一定不要选错。y 和 **n** 要看准了哦。

```
You are attempting to install on an unsupported configuration. Do you wish to continue?
y
Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 387?
n
Install the CUDA 9.1 Toolkit?
y
Enter Toolkit Location
[default location]
Do you want to install a symbolic link at /usr/local/cuda?
y
Install the CUDA 9.0 Samples?
y
Enter CUDA Samples Location
[default location]
```

然后设置环境变量，注意位置，如果安装在`/etc/profile`中的话，会在好多情况下（比如python的virtualenv虚拟环境下），加载不到这个文件而报错，这里推荐配置到这里

在`/etc/ld.so.conf`中添加
```
include /etc/ld.so.conf.d/*.conf 
```

随意一个文件名：`nvidia.conf `在文件夹 `/etc/ld.so.conf.d/`

添加CUDA 9库文件到LD_LIBRARY_PATH:

```
/usr/local/cuda/lib64
/usr/local/cuda/lib
```
然后执行 `sudo ldconfig`



当然了，如果你碰巧以上的方法不生效，没关系，你可以在你用户目录的'.bashrc'中或者`/etc/profile`添加 
```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda/lib64
```

### cudnn

下载前需要注册，然后直接用官方文档里写的安装方法就好啦。

```
sudo cp cuda/include/cudnn.h /usr/local/cuda/include
sudo cp cuda/lib64/libcudnn* /usr/local/cuda/lib64
sudo chmod a+r /usr/local/cuda/include/cudnn.h /usr/local/cuda/lib64/libcudnn*
```
### tensorflow

下载这个人的，https://github.com/mind/wheels/releases，这个哥们长期解决cuda版本问题，值得信赖。

然后pip install *.whl就好啦。

###　测试安装成功没

使用tensorflow官方推荐的程序 
```
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print(sess.run(hello))
```

# 参考链接
- https://askubuntu.com/questions/967332/how-can-i-install-cuda-9-on-ubuntu-17-10
- https://gist.github.com/wangruohui/df039f0dc434d6486f5d4d098aa52d07#creat-blacklist-for-nouveau-driver