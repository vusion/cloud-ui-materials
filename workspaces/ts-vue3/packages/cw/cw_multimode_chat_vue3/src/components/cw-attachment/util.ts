// Follow code is copy from `antd/components/upload/utils.ts`:

export const isImageFileType = (type: string): boolean => type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;

export function previewImage(file: File | Blob): Promise<string> {
  return new Promise<string>((resolve) => {
    if (!file || !file.type || !isImageFileType(file.type)) {
      resolve('');
      return;
    }

    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      const ratio = width / height;
      const MEASURE_SIZE_WIDTH = ratio > 1 ? MEASURE_SIZE : MEASURE_SIZE * ratio;
      const MEASURE_SIZE_HEIGHT = ratio > 1 ? MEASURE_SIZE / ratio : MEASURE_SIZE;

      const canvas = document.createElement('canvas');
      canvas.width = MEASURE_SIZE_WIDTH;
      canvas.height = MEASURE_SIZE_HEIGHT;
      canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE_WIDTH}px; height: ${MEASURE_SIZE_HEIGHT}px; z-index: 9999; display: none;`;
      document.body.appendChild<HTMLCanvasElement>(canvas);
      const ctx = canvas.getContext('2d');

      ctx!.drawImage(img, 0, 0, MEASURE_SIZE_WIDTH, MEASURE_SIZE_HEIGHT);
      const dataURL = canvas.toDataURL();
      document.body.removeChild(canvas);
      window.URL.revokeObjectURL(img.src);
      resolve(dataURL);
    };
    img.crossOrigin = 'anonymous';
    if (file.type.startsWith('image/svg+xml')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('image/gif')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      img.src = window.URL.createObjectURL(file);
    }
  });
}

export type SizeUnitArray = ['KB', 'MB', 'GB', 'TB', 'B'];
export type SizeUnit = SizeUnitArray[number];
export interface SizeLimitObj {
  size: number;
  unit: SizeUnit;
  message?: string;
}
const SIZE_UNITS = ['KB', 'MB', 'GB', 'TB', 'B'];
export function getSizeLimit(val: string | number) {
  if (!val) {
    return undefined;
  }
  val = `${val}`;

  const index = SIZE_UNITS.findIndex((unit) => val.toUpperCase().endsWith(unit));
  if (index === -1 && Number.isNaN(Number(val))) {
    return undefined;
  }

  if (index === -1) {
    return {
      size: Number(val),
      unit: 'MB',
    } as SizeLimitObj;
  }

  const size = Number(val.substring(0, val.length - SIZE_UNITS[index].length));
  if (Number.isNaN(size)) {
    return undefined;
  }

  return {
    size,
    unit: SIZE_UNITS[index],
  } as SizeLimitObj;
}

export function getSizeLimitText(maxSize: string | number) {
  if (!maxSize || maxSize === Infinity) return '';
  const data = getSizeLimit(maxSize) as SizeLimitObj;
  return data.size + data.unit;
}

export function getSizeForFile(maxSize) {
  const SIZE_UNITS = {
    KB: 1024, // 兼容KB单位
    MB: Math.pow(1024, 2),
    GB: Math.pow(1024, 3),
    TB: Math.pow(1024, 4),
    B: 1,
  };
  const data = getSizeLimit(maxSize) as SizeLimitObj;
  if (!data) return undefined;
  return data.size * SIZE_UNITS[data.unit];
}

export function getAcceptText(accept: string, limit = 5) {
  if (!accept) return `任意格式文件`;
  const ext: Array<String> = accept.split(',');
  if (ext.length > limit) {
    let extText = ext
      .slice(0, 5)
      .map((item) => item.slice(1))
      .join('、');
    extText = `${ext}等`;
    return extText;
  }
  return ext.map((item) => item.slice(1)).join('、');
}

export function isAcceptValid(accept: string, file: File) {
  if (!accept) return true;
  const extension = (file.name.indexOf('.') > -1 ? `.${file.name.split('.').pop()}` : '').toLowerCase();
  const type = file.type.toLowerCase();
  const baseType = type.replace(/\/.*$/, '').toLowerCase();
  const acceptValid = accept
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type)
    .some((acceptedType) => {
      acceptedType = acceptedType.toLowerCase();
      if (/^\..+$/.test(acceptedType)) {
        return extension.toLowerCase() === acceptedType;
      }
      if (/\/\*$/.test(acceptedType)) {
        return baseType === acceptedType.replace(/\/\*$/, '');
      }
      if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
        return type === acceptedType;
      }
      return false;
    });
  return acceptValid;
}
