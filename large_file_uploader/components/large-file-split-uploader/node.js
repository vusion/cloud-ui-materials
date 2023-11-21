const fs = require('fs');

function generateTestFile(fileSizeMB, outputFileName) {
  const fileSizeBytes = fileSizeMB * 1024 * 1024;
  const chunkSize = 1024; // 1KB chunk size
  const data = Buffer.alloc(chunkSize, '0'); // Buffer filled with '0' bytes

  let bytesWritten = 0;
  const file = fs.createWriteStream(outputFileName);

  function writeChunk() {
    if (bytesWritten >= fileSizeBytes) {
      file.end();
      console.log(`Test file '${outputFileName}' generated successfully.`);
      return;
    }

    const bytesToWrite = Math.min(chunkSize, fileSizeBytes - bytesWritten);
    file.write(data.slice(0, bytesToWrite));
    bytesWritten += bytesToWrite;

    setImmediate(writeChunk); // Process next chunk asynchronously
  }

  writeChunk();
}

// 调用函数生成101MB的测试文件
generateTestFile(101, "testfile.txt");