import { message } from 'ant-design-vue';
import axios from 'axios';

type fileType = 'image' | 'video' | 'other';

let praNosUrl = '';
// const NOS_HOST = 'https://nos.netease.co';
const NOS_HOST = 'https://ys-test.netease.com';

const AL_CDN_HOST = 'https://sh-pub-file.oss-accelerate.aliyuncs.com';

const replaceLocalesWithValue = (str, value) => {
  return str?.replace('${value}', value);
};

const nosUploader = {
  isValidFile(file, type, options, locales) {
    if (!(type && (!options?.acceptTypes || options?.acceptTypes?.includes(type)))) {
      message.error(locales?.FILE_NOT_SUPPORT || '文件格式不支持');
      return false;
    }

    const fileSize = file.size / 1024 / 1024;
    const isValidSize = type === 'image' ? fileSize < options.imageMaxSize : fileSize < options.attachmentMaxSize;
    if (!isValidSize) {
      message.error(
        `${
          type === 'image'
            ? replaceLocalesWithValue(locales?.IMAGE_MAX_SIZE_LIMIT_NUM, `${options.imageMaxSize}M`) || `图片大小不能超过${options.imageMaxSize}M`
            : replaceLocalesWithValue(locales?.ATTACHMENT_MAX_SIZE_LIMIT_NUM, `${options.attachmentMaxSize}M`) ||
              `单个附件大小不能超过${options.attachmentMaxSize}M`
        }`
      );
      return false;
    }

    return true;
  },
  judegeType(file: File): fileType {
    const filesArray = file?.name?.split('.');
    const exName = filesArray[filesArray.length - 1];
    const img = [/bmp/i, /jpg/i, /jpeg/i, /png/i, /gif/i, /exif/i, /webp/i];
    const video = [/avi/i, /mov/i, /mkv/i, /rmvb/i, /wmv/i, /3gp/i, /flv/i, /mp4/i, /mpg/i, /webm/i, /ogg/i];

    if (img.some((item) => item.test(exName))) {
      return 'image';
    }

    if (video.some((item) => item.test(exName))) {
      return 'video';
    }

    return 'other';
  },
  upload({ action, param, sgParam }, isOnlineSG, file) {
    if (isOnlineSG) {
      return window
        .fetch(action, {
          method: 'PUT',
          body: file, // FormData
          headers: sgParam,
        })
        .then(() => {
          return { data: { url: `${AL_CDN_HOST}/${file.name}` } };
        });
    }
    return window
      .fetch(action, {
        method: 'POST',
        body: param, // FormData
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
      .then((res) => {
        // return res.json();
        return res;
      });
  },
  // nos上传文件安全性优化
  getContentType(file) {
    const filesArray = file.name.split('.');
    const ext = filesArray[filesArray.length - 1];
    const imgExt = [/bmp/i, /jpg/i, /jpeg/i, /png/i, /gif/i, /exif/i, /webp/i];
    const videoExt = [/avi/i, /mov/i, /mkv/i, /rmvb/i, /wmv/i, /3gp/i, /flv/i, /mp4/i, /mpg/i, /webm/i, /ogg/i];
    const audioExt = [/mp3/i, /wma/i, /ape/i, /flac/i, /midi/i, /wav/i, /ogg/i, /aac/i];
    const textExt = [/txt/i, /html/i, /htm/i, /js/i, /css/i, /csv/i, /xml/i, /shtml/i, /xhtml/i, /md/i, /inf/i];
    const pdfExt = [/pdf/i];

    // 常见的图片、视频、音频文件格式使用默认的content-type
    if (
      imgExt.some((item) => item.test(ext)) ||
      videoExt.some((item) => item.test(ext)) ||
      audioExt.some((item) => item.test(ext)) ||
      pdfExt.some((item) => item.test(ext))
    ) {
      return;
    }

    // 文本类型的content-type设置为'text/plain'
    if (textExt.some((item) => item.test(ext))) {
      return 'text/plain';
    }

    // 其余文件类型的content-type设置为'application/octet-stream'
    return 'application/octet-stream';
  },
  beforeUpload(file, token, isOnlineSG) {
    // nos要求每次都重新获取token
    const param = new FormData();
    const sgParam = {};
    return this.getNosToken(file).then(({ data }) => {
      console.log('result', data);
      const { objectName, bucket, token, host, ossAuthorization } = data.data;
      const { url, body } = ossAuthorization || {};
      // 上传地址
      // let action = `${NOS_HOST}/${bucket}`;
      let action = `https://${bucket}.nos-jd.163yun.com`;

      if (host && !isOnlineSG) {
        action = `${host}${bucket}`;
        praNosUrl = `${host}${bucket}/${objectName}`;
      }
      if (host && isOnlineSG) {
        action = url;
        praNosUrl = `${AL_CDN_HOST}/${objectName}`;
      }

      const fileCT = this.getContentType(file);
      if (fileCT) {
        param.append('Content-Type', fileCT);
      }
      param.append('x-nos-token', token);
      param.append('Object', objectName);
      if (isOnlineSG) {
        sgParam['Content-Type'] = file.type;
        for (const key in body || {}) {
          sgParam[key] = body[key];
        }
      }
      param.append('file', file);
      return { action, param, sgParam, objectName };
    });
  },
  getImageSize(url, callback) {
    const newImage = document.createElement('img');
    newImage.onload = function () {
      // @ts-expect-error
      callback(this.width, this.height);
    };
    newImage.onerror = function () {
      // eslint-disable-next-line n/no-callback-literal
      callback(960, 540);
    };
    newImage.src = url;
  },
  getNosToken(file) {
    return axios.get('/api/deepvox/console/nos/token', {
      params: { fileName: file.name },
    });
  },
  start(
    rawFile: File | DataTransferItem,
    options: {
      acceptTypes?: fileType[] | null;
      imageMaxSize?: number;

      attachmentMaxSize?: number;
      token: string;
      isOnlineSG?: boolean;
    } = {
      acceptTypes: null, // 默认不限制上传文件的类型
      imageMaxSize: 1, // 默认单个图片最大1M
      attachmentMaxSize: 10, // 默认单个附件最大10M
      token: '', // 调接口用的csrfToken参数，必传
      isOnlineSG: false, // 默认飞海外上传
    },
    locales?: Record<string, any>
  ) {
    if (!rawFile) {
      console.error('@ysf/nos-uploader: start方法缺失file参数');
      return Promise.reject();
    }

    const file: File = (rawFile?.constructor === DataTransferItem ? rawFile?.getAsFile() : rawFile) as File;
    const type = this.judegeType(file);
    const isDownload = type !== 'image';

    if (this.isValidFile(file, type, options, locales)) {
      return this.beforeUpload(file, options.token, options.isOnlineSG).then((res) => {
        return this.upload(res, options.isOnlineSG, file)
          .then((result: any) => {
            // const data = result?.data;
            // const realUrl = praNosUrl || data.url;
            const realUrl = `${res.action}/${res.objectName}`
            if (type === 'image' || type === 'video') {
              return new Promise((resolve) => {
                this.getImageSize(type === 'video' ? `${realUrl}?vframe` : realUrl, (width, height) => {
                  resolve({
                    url: isDownload ? `${realUrl}?download=${encodeURIComponent(file.name)}` : `${realUrl}`,
                    sourceUrl: realUrl,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadType: type,
                    width,
                    height,
                    nosFileName: res.param.get('Object'),
                  });
                });
              });
            } else {
              return {
                url: isDownload ? `${realUrl}?download=${encodeURIComponent(file.name)}` : realUrl,
                sourceUrl: realUrl,
                name: file.name,
                size: file.size,
                type: file.type,
                uploadType: type,
                nosFileName: res.param.get('Object'),
              };
            }
          })
          .catch((error) => {
            return {
              error,
              errorMesg: locales?.UPLOAD_FAILED || '上传失败',
            };
          });
      });
    } else {
      console.error('@ysf/nos-uploader: 上传的文件前端校验失败');
      return Promise.reject();
    }
  },
};

export default nosUploader;
