# 依赖库管理介绍
## 文件结构
```
cloud-ui-materials
├─ packages					        # 存放通用依赖库
	├─ cust		                # 客户定制化依赖库
	├─ cw					            # 平台依赖库
  ├─ demo					          # 典型的依赖库案例
  ├─ lcap					          # 原有扩展组件
├─ README.md			            # 说明文档
```

## 依赖库开发文档 
开发必备，详细讲述开发的细节
https://docs.popo.netease.com/lingxi/06477b87702045c4af0b0b71d29debb3?appVersion=3.84.0&deviceType=4&popo_hidenativebar=1&popo_noindicator=1&disposable_login_token=1

## 依赖库记录文档
开发完，请记录相关信息
https://docs.popo.netease.com/lingxi/27557b64abc644f7b513573708c8de84?appVersion=3.84.0&deviceType=4&popo_hidenativebar=1&popo_noindicator=1&disposable_login_token=1&xyz=1702260199851&tab=0

## 依赖库下载中心
开发完，将压缩包上传上去
https://docs.popo.netease.com/drive/folder/5965d06c680a448f843951d4992cd8b6

## 依赖库升级可下载
package.json
- 第一步
```  
+ "lcapVersion": "0.3.0",
```
- 第二步

替换 scripts
```
 "scripts": {
    "dev": "vue-cli-service doc --port 9090",
    "build:theme": "vue-cli-service library-build --dest dist-theme",
    "build:doc": "vue-cli-service doc-build",
    "build": "npm run build:theme",
    "usage": "lcap usage",
    "deploy": "lcap deploy dist-theme",
    "prepublishOnly": "lcap publish",
    "release": "lcap publish"
  },
```
- 第三步
使用lcap@0.3.1-beta.3


