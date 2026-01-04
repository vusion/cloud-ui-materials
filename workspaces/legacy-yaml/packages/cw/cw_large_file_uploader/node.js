const fs = require('fs');
const path = require('path');

// 生成指定大小的文件（单位：字节）
function generateFile(filename, size) {
    const filePath = path.join(__dirname, filename);
    const chunkSize = 1024 * 1024; // 每次写入1MB
    const buffer = Buffer.alloc(chunkSize, 'X'); // 用X填充内容
    
    try {
        // 创建文件描述符
        const fd = fs.openSync(filePath, 'w');
        
        // 分块写入（避免内存溢出）
        let bytesWritten = 0;
        while (bytesWritten < size) {
            const remaining = size - bytesWritten;
            const writeSize = Math.min(chunkSize, remaining);
            fs.writeSync(fd, buffer, 0, writeSize);
            bytesWritten += writeSize;
        }
        
        fs.closeSync(fd);
        console.log(`生成成功: ${filename} (${(size/1024/1024).toFixed(1)}MB)`);
    } catch (err) {
        console.error(`生成失败: ${filename}`, err);
    }
}

// 生成3个测试文件（60MB = 62914560 bytes）
const fileSize = 60 * 1024 * 1024;
generateFile('test-file-1.bin', fileSize);
generateFile('test-file-2.bin', fileSize);
generateFile('test-file-3.bin', fileSize);