import { FileModel } from './FileModel';

export interface IUploadModel {
  name?: string;
  fileName?: string;
  shortName?: string;
  content?: string;
  size?: number;
  type?: string;
  extension?: string;
  controller?: string;
  key?: any;
  file?: File;
  files?: Array<FileModel>;
  entity?: any;
  base64paraFile(): File;
}
export class UploadModel implements IUploadModel {
  name?: string = null;
  fileName?: string = null;
  shortName?: string = null;
  content?: string = null;
  size?: number = null;
  type?: string = null;
  extension?: string = null;
  controller?: string = null;
  key?: any = null;
  file?: File = null;
  files?: Array<FileModel>;
  entity?: any;
  constructor() {
    if (this.content && this.fileName) {
      this.file = this.base64paraFile();
    }
  }

  base64paraFile = () => {

    if (!this.content) {
      const file = new File([], this.fileName);
      return file;
    }

    const arr = this.content.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    this.file = new File([u8arr], this.fileName, { type: mime });
    return this.file;
  }
}
