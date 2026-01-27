# cw_cryptojs_library 使用说明

## 依赖库介绍
cw_cryptojs_library 是一款专为 Codewave 低代码平台设计的前端加密依赖库。它集成了多种行业标准的加密与解密算法，旨在为 Web 应用提供高效、安全的数据处理能力。该库涵盖了对称加密（AES、DES）、非对称加密（RSA、SM2）、哈希算法（MD5、SHA256）以及加盐加密和 Base64 转换等功能，满足不同场景下的安全通信与存储需求。

## 包含的逻辑列表
本依赖库包含以下核心逻辑组件：
- **base64Withsjcl**: 使用 sjcl 库完成 UTF-8 的 Base64 编码。
- **decryptByAes**: 执行 AES 算法的解密操作。
- **decryptByDes**: 执行 DES 算法的解密操作。
- **decryptDataWithSalt**: 提供加盐解密功能，提升安全性。
- **encryptByAes**: 执行 AES 算法的加密操作。
- **encryptByDes**: 执行 DES 算法的加密操作。
- **encryptContentByARS**: 使用 RSA 算法对特定内容进行加密。
- **encryptDataWithSalt**: 提供加盐加密功能，防止彩虹表攻击。
- **encryptSha256**: 使用 RSA-SHA256 方式处理加密私钥。
- **md52Hex**: 将字符串计算为 MD5 摘要并转为十六进制。
- **multiMethodEncrypt**: 支持多种加密方法对时间戳进行加密。
- **multiMethodParamsEncrypt**: 支持对多个参数执行复合加密方法。
- **sm2Decrypt**: 执行国密 SM2 算法的解密。
- **sm2Encrypt**: 执行国密 SM2 算法的加密。

## API 说明

### 逻辑 base64Withsjcl
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: base64Withsjcl
  - 类型: logic
  - 说明: 使用 sjcl 库完成 utf8 的 base64。

### 逻辑 decryptByAes
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: decryptByAes
  - 类型: logic
  - 说明: 执行 AES 解密逻辑。

### 逻辑 decryptByDes
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: decryptByDes
  - 类型: logic
  - 说明: Des 解密。

### 逻辑 decryptDataWithSalt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: decryptDataWithSalt
  - 类型: logic
  - 说明: 加盐解密算法。

### 逻辑 encryptByAes
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: encryptByAes
  - 类型: logic
  - 说明: AES 加密。

### 逻辑 encryptByDes
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: encryptByDes
  - 类型: logic
  - 说明: Des 加密。

### 逻辑 encryptContentByARS
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: encryptContentByARS
  - 类型: logic
  - 说明: RSA 加密内容。

### 逻辑 encryptDataWithSalt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: encryptDataWithSalt
  - 类型: logic
  - 说明: 加盐加密算法。

### 逻辑 encryptSha256
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: encryptSha256
  - 类型: logic
  - 说明: RSA-SHA256 加密私钥。

### 逻辑 md52Hex
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: md52Hex
  - 类型: logic
  - 说明: md52hex。

### 逻辑 multiMethodEncrypt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: multiMethodEncrypt
  - 类型: logic
  - 说明: 支持多种加密方法加密时间戳。

### 逻辑 multiMethodParamsEncrypt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: multiMethodParamsEncrypt
  - 类型: logic
  - 说明: 支持多种加密方法对参数进行加密。

### 逻辑 sm2Decrypt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: sm2Decrypt
  - 类型: logic
  - 说明: sm2 解密。

### 逻辑 sm2Encrypt
- **属性 (attrs)**: 暂无。逻辑组件不涉及界面属性配置。
- **事件 (events)**: 暂无。逻辑组件通过逻辑流调用，不触发 UI 事件。
- **方法 (methods)**:
  - 名称: sm2Encrypt
  - 类型: logic
  - 说明: sm2 加密。