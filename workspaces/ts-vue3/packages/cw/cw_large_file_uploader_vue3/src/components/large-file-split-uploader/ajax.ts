interface UploadProgressEvent extends ProgressEvent {
  percent?: number;
}

export interface AjaxOptions {
  url: string;
  withCredentials?: boolean;
  name?: string;
  data?: Record<string, unknown>;
  headers?: Record<string, string | null>;
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (error: unknown) => void;
  onSuccess?: (body: unknown) => void;
}

function getError(url: string, xhr: XMLHttpRequest) {
  let msg: string;
  if (xhr.response) {
    const response = xhr.response as { error?: string };
    msg = `${response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `Fail to post ${url} ${xhr.status}`;
  }
  return msg;
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) return text;

  try {
    return JSON.parse(text as string);
  } catch {
    return text;
  }
}

export default function upload(options: AjaxOptions) {
  if (typeof XMLHttpRequest === 'undefined') return;

  const xhr = new XMLHttpRequest();
  const url = options.url;

  if (xhr.upload) {
    xhr.upload.onprogress = function onprogress(e: UploadProgressEvent) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      options.onProgress?.(e);
    };
  }
  const formData = new FormData();

  if (options.data) {
    Object.keys(options.data).forEach((key) => {
      formData.append(key, options.data![key] as string | Blob);
    });
  }

  xhr.onerror = function onerror(e) {
    options.onError?.(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.onError?.(getError(url, xhr));
    }
    options.onSuccess?.(getBody(xhr));
  };

  xhr.open('post', url, true);

  if (options.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = options.headers || {};

  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key) && headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key] as string);
    }
  }
  xhr.send(formData);
  return xhr;
}
