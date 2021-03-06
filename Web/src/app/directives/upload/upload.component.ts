import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { IUploadModel, UploadModel } from 'src/app/models/common/UploadModel';


import { FileModel } from '../../models/common/FileModel';

declare var $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {
  uploadComponent: UploadComponent;
  src: string;

  reader: FileReader;

  file: FileModel = new FileModel();
  item: FileItem = {} as FileItem;
  msgError: string;
  @Input() id: string;
  @Input() name: string;
  @Input() path: string;
  @Input() width = 320;
  @Input() height = 240;
  @Input() cssClass = 'btn btn-primary btn-file';
  @Input() cssIcon: string;
  @Input() label: string;
  @Input() model: any;

  @Output() fileclicked: any = new EventEmitter();
  @Output() modelChange: any = new EventEmitter();
  @Output() fileChangeEvent: any = new EventEmitter();
  @Output() changeEvent: any = new EventEmitter();
  @Output() completeEvent: any = new EventEmitter();
  @Output() serverDelete: any = new EventEmitter();

  @ViewChild('input') element: ElementRef;
  @ViewChild('video') video: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('doc') doc: ElementRef;

  videoFilterExt = '|avi|mpeg|mp4|ogg|';
  imgFilterExt = '|jpg|png|jpeg|bmp|gif|';

  public uploader: FileUploader = new FileUploader({});
  config: any;
  constructor() {

    this.uploadComponent = this;
    this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
  }

  ngOnInit(): void {
    if (this.path) {
      this.loadFileFromPath();
    }
    if (!this.label) {
      this.label = 'Selecione um arquivo';
    }
  }

  ngAfterViewInit(): void { }

  updateData() {
    this.model = this.file.fileName;
    this.modelChange.emit(this.file.fileName);
  }

  loadFileFromPath(): any {
    const ext = this.path.slice(this.path.lastIndexOf('.') + 1);
    this.file = {
      fileName: this.path,
      name: this.name,
      id: this.id,
      size: 0,
      formattedSize: '',
      type: `application/${ext}`,
      extension: ext
    } as FileModel;
    this.checkFile(this.file);
    if (this.file.isImage) {
      this.src = `${this.config.siteUrl}/file/image/${this.path}?w=${this.width}&h=${this.height}`;
      this.loadFileSize('image');
    }
    if (this.file.isVideo) {
      this.src = `${this.config.siteUrl}/file/file/${this.path}`;
      this.loadFileSize('video');
    }
    if (this.file.isDoc) {
      this.src = `${this.config.siteUrl}/file/file/${this.path}`;
      this.loadFileSize('doc');
    }
  }

  onAfterAddingFile(fileItem: FileItem) {
    this.uploadComponent.item = fileItem;
    this.uploadComponent.file = {
      fileName: fileItem.file.name,
      name: this.uploadComponent.name,
      id: this.uploadComponent.id,
      size: fileItem.file.size,
      formattedSize: this.uploadComponent.formatSize(fileItem.file.size),
      type: fileItem.file.type
    } as FileModel;
    this.uploadComponent.checkFile(this.uploadComponent.item.file);
    this.uploadComponent.readFile(this.uploadComponent.item.file);
  }

  loadFileSize(type: string) {
    let doc: ElementRef = null;
    switch (type) {
      case 'doc':
        doc = this.doc;
        break;
      case 'image':
        doc = this.image;
        break;
      case 'video':
        doc = this.video;
        break;
    }
    if (!doc || (doc && !doc.nativeElement)) {
      setTimeout(() => {
        this.uploadComponent.loadFileSize(type);
      }, 300);
      return;
    }

    const file = doc.nativeElement;
    $(file).ready(() => {
      const info: any = performance.getEntriesByName(file.src || file.href);
      if (info && info.length === 0) {
        setTimeout(() => {
          this.uploadComponent.loadFileSize(type);
        }, 300);
        return;
      }
      if (type === 'doc') {
        file.download = this.uploadComponent.file.fileName;
      }
      if (info[0].transferSize) {
        this.uploadComponent.file.size = info[0].transferSize;
        this.uploadComponent.file.formattedSize = this.uploadComponent.formatSize(info[0].transferSize);
      }
    });
  }

  scaleImage(maxWidth: number, maxHeight: number) {
    const image = this.image.nativeElement;

    if (!image.clientWidth) {
      setTimeout(() => {
        this.uploadComponent.scaleImage(maxHeight, maxWidth);
      }, 300);
      return;
    }

    const ratioX = maxWidth / image.clientWidth;
    const ratioY = maxHeight / image.clientHeight;
    const ratio = Math.min(ratioX, ratioY);

    image.width = image.clientWidth * ratio;
  }

  click() {
    this.fileclicked.emit();
    this.element.nativeElement.click();
  }

  checkFile(file: any) {
    this.file.isDoc = false;
    this.file.isImage = false;
    this.file.isVideo = false;
    if (this.isImage(file)) {
      return;
    } else if (this.isVideo(file)) {
      return;
    }
    this.file.isDoc = true;
  }

  isImage(file: any) {
    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
    const ext = '|' + file.ext + '|';
    this.file.isImage = this.imgFilterExt.indexOf(type) !== -1 || this.imgFilterExt.indexOf(ext) !== -1;
    return this.file.isImage;
  }

  isVideo(file: any) {
    const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
    const ext = '|' + file.ext + '|';
    this.file.isVideo = this.videoFilterExt.indexOf(type) !== -1 || this.videoFilterExt.indexOf(ext) !== -1;
    return this.file.isVideo;
  }

  readFile(file: any) {
    file = $(this.uploadComponent.element.nativeElement);
    this.reader = new FileReader();
    this.reader.onloadend = this.onLoadFile.bind(this);
    this.reader.readAsDataURL(this.item._file);
  }

  onLoadFile() {
    if (this.uploadComponent.file.isVideo) {
      const video = $(this.uploadComponent.video.nativeElement);
      video.attr('src', this.uploadComponent.reader.result);
      return;
    }
    if (this.uploadComponent.file.isImage) {
      const img = $(this.uploadComponent.image.nativeElement);
      img.attr('src', this.uploadComponent.reader.result);
      this.uploadComponent.scaleImage(this.uploadComponent.width, this.uploadComponent.height);

    }

    if (this.uploadComponent.file.isDoc && this.doc) {
      const doc = $(this.doc.nativeElement);
      doc.attr('href', this.uploadComponent.reader.result);
      doc.attr('download', this.uploadComponent.file.fileName);
    }
    const file = this.uploadComponent.file;
    const uploadedFile = {
      content: this.uploadComponent.reader.result.toString(),
      extension: file.extension,
      size: file.size,
      fileName: file.name,
      type: file.type,
      name: file.name,
      shortName: '',
      base64paraFile: null
    } as IUploadModel;
    this.fileChangeEvent.emit(file);
    this.changeEvent.emit({ ...uploadedFile });
  }

  formatSize(value: number) {
    const bite = 1024;
    if (value >= bite * 1000000) {
      return (value / (bite * 1000000)).toFixed(2) + ' Gb';
    } else if (value >= bite * 1000) {
      return (value / (bite * 1000)).toFixed(2) + ' Mb';
    } else if (value >= bite) {
      return (value / bite).toFixed(2) + ' Kb';
    }
    return (value / bite).toFixed(2) + ' bites';
  }
}
