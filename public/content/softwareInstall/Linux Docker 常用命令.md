# Linux Docker 常用命令

## **一、Docker基础命令**

### 1、启动Docker

``````
systemctl star docker
``````



### 2、关闭Docker

``````
systemctl stop docker
``````

### 3、重启Docker

``````
systemctl restart docker
``````

### 4、Docker设置随服务启动而启动

``````
systemctl enable docker
``````

### 5、查看Docker运行状态

``````
systemctl status docker
``````

### 6、查看Docker版本号

``````
docker version
``````
``````
docker info
``````

### 7、Docker帮助命令

``````
docker --help
``````

## **二、Docker镜像命令**

### 1、查看自己服务器中Docker镜像列表

``````
docker images
``````

### 2、搜索镜像

``````
docker search 镜像名
``````

### 3、拉取镜像

``````
docker pull 镜像名
``````
``````
docker pull 镜像名：tag
``````

### 4、运行镜像

``````
docker run 镜像名
``````
``````
docker run 镜像名：tag
``````

### 5、删除无用的容器和镜像

#### 删除异常停止的容器
``````
docker rm  `docker ps -a | grep Exited |awk '{print $1}'`
``````
#### 进入镜像文件位置
``````
docker load -i 镜像文件名字
``````



### 6、强制删除镜像

``````
docker image rm 镜像名/镜像ID
``````

### 7、保存镜像

``````
docker save 镜像名/镜像ID -o 镜像保存在那个位置与保存名字
``````

### 8、加载镜像
#### 进入镜像文件位置
``````
docker load -i 镜像文件名字
``````

### 9、镜像标签

``````
docker tag 源镜像名：tag 生成新的镜像名：新的tag
``````

## **三、Docker容器命令**

### 1、查看正在运行容器列表

``````
docker ps
``````

### 2、运行一个容器

``````
docker run -it -d  --name 要取的别名 镜像名：tag /bin/bash
``````

### 3、停止容器

``````
docker stop 容器名/容器ID
``````

### 4、删除容器

``````
docker rm -f 容器名/容器ID
``````
``````
docker rm -f 容器名/容器ID 容器名/容器ID 容器名/容器ID
``````
``````
docker rm -f $(docker ps -aq)
``````

### 5、容器端口与服务器端口映射

``````
-p 宿主机端口：容器端口
``````

### 6、进入容器

``````
docker exec -it 容器名/容器ID /bin/bash
``````
``````
docker attach 容器名/容器ID
``````
### 7、从容器中退出到自己服务器中

``````
exit
``````
``````
Ctrl+p+q
``````

### 8、停止容器

``````
docker stop 容器名/容器ID
``````

### 9、重启容器

``````
docker restart 容器名/容器ID
``````

### 10、启动容器

``````
docker start 容器名/容器ID
``````

### 11、kill容器

``````
docker kill 容器名/容器ID
``````

### 12、容器文件拷贝
#### 从容器内拷出
``````
docker cp 容器ID/名称：容器内路径  容器外路径
``````
#### 从外部拷到容器
``````
docker cp 容器外路径  容器ID/名称：容器内路径
``````

### 13、 查看容器日志

``````
docker logs -f --tail=要查看默认多少行 默认all 容器ID
``````

### 14、运行容器时进行数据挂载（开机自启）

``````
-v 宿主机文件存储位置：容器内文件位置
``````
``````
例子：  
运行一个docker redis 容器 进行 端口映射 两个数据卷挂载 设置开机自启动  
docker run -d -p 6379:6379 --name redis505 --restart=always  -v /var/lib/redis/data/:/data -v /var/lib/redis/conf/:/usr/local/etc/redis/redis.conf  redis:5.0.5 --requirepass "password"
``````
### 15、不删容器更新开机自启

``````
docker update --restart=always 容器ID/容器名
``````
``````
docker container update --restart=always 容器ID/容器名
``````

### 16、更换容器名

``````
docker rename 容器名/容器ID 新容器名
``````

## **四、Docker运维命令**

### 1、查看Docker工作目录

``````
sudo docker indo | grep "Docker Root Dir"
``````

### 2、查看Docker磁盘占用总体情况

``````
du -hs  /var/lib/docker/
``````

### 3、更改Docker工作目录
#### 停止docker

``````
systemctl stop docker 
``````
#### 创建新工作目录文件夹
``````
mkdir -p /docker-data
``````

#### 原docker数据迁移
``````
cp -r /var/lib/docker
``````

### 4、查看Docker的磁盘使用情况

``````
docker system df
``````

### 5、删除无用的容器和镜像
#### 删除异常停止的容器
``````
docker rm  `docker ps -a | grep Exited |awk '{print $1}'`
``````
#### 删除名称或标签为none 的镜像
``````
docker rmi -f `docker images | grep '<none>' | awk '{print $3}'`
``````

### 6、清除所有无容器使用的镜像

``````
docker system prune -a
``````



### 7、查找大文件

``````
find / -type f -size +100M -print0  |  xargs -0 du -h | sort -nr
``````

### 8、查找指定Docker使用目录下大于指定大小文件

``````
find / -type f -size +100M -print0 | xargs -0 du -h | sort -nr |grep '/var/lib/docker/overlay2/*'
``````
