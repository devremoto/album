import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DownloadModel } from 'src/app/models/common/download.model';
import { IUploadModel, UploadModel } from 'src/app/models/common/UploadModel';

import { DialogService } from '../dialog/dialog.service';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit, OnChanges {
  @ViewChild('fileElement', { static: false }) fileElement: ElementRef;
  @ViewChild('labelElement', { static: false }) labelElement: ElementRef;
  @ViewChild('contentElement', { static: false }) contentElement: ElementRef;
  @Input() maxSize = 0;
  labelDefault = 'Selecione um arquivo';
  @Input() label;
  @Input() showName = true;
  /** Extensões permitidas exemplo ['pdf','jpg','jpeg'] default ['*'] */
  @Input() extensions: string[] = ['*'];
  /** Definie se é permitido ou não efetuar download do arquivo */
  @Input() allowDownload: true;
  /** Nome do controller para efetuar o donwnload */
  @Input() controller: string;
  /** Representa o id do arquivo no servidor */
  @Input() key: string;
  @Input() download: DownloadModel = {};
  /** Número máximo de caracteres para serem exibidos no nome do arquivo no label botão
   * após o arquivo ser carregado
   */
  @Input() maxLabel = 10;
  @Input() uploadUrl: string;
  @Output() fileLoaded = new EventEmitter<UploadModel>();
  @Output() uploadData = new EventEmitter<File>();


  file: any = {};
  sizeAllowed = true;
  accepetedExtensionList: string;
  allowAllExtensions = false;
  uploadedFile: UploadModel = {} as UploadModel;


  id: string;
  initialContent: any;
  accepetedExtensionListLabel: string;

  constructor(private dialogService: DialogService) {
    this.id = Math.random().toString(36).substring(2);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.download && changes.download.currentValue.name && changes.download.currentValue !== changes.download.previousValue) {
      this.file = { name: changes.download.currentValue.name };
      this.uploadedFile = {
        name: changes.download.currentValue.name || changes.download.currentValue.fileName,
        content: changes.download.currentValue.content,
        fileName: changes.download.currentValue.fileName || changes.download.currentValue.name,
        shortName: this.limit(changes.download.currentValue.name),
        controller: this.controller,
        key: this.key,
      } as UploadModel;

    }

    if (changes.controller) {
      this.download.controller = changes.controller.currentValue;
      this.uploadedFile.controller = changes.controller.currentValue;
    }

    if (changes.key) {
      this.download.key = changes.key.currentValue;
      this.uploadedFile.key = changes.key.currentValue;
    }
  }

  ngOnInit() {
    if (this.key) {
      this.download.key = this.key;
      this.uploadedFile.key = this.key;
    }
    if (this.controller) {
      this.uploadedFile.controller = this.controller;
    }

    if (this.download.name) {
      this.uploadedFile.name = this.download.name;
      this.uploadedFile.fileName = this.download.name;
      this.uploadedFile.shortName = this.limit(this.download.name);
    }

    if (this.contentElement && this.contentElement.nativeElement) {
      this.label = '';
      this.initialContent = this.contentElement.nativeElement.innerHTML;
    }
    this.checkExtensions();
  }

  checkExtensions() {
    this.accepetedExtensionList = this.extensions.map(x => {
      x = x.replace(/\./i, '');
      this.allowAllExtensions = (!this.allowAllExtensions && (x === '*' || x === '**'));

      return `.${x.toLowerCase()}`;

    }).join(',');

    this.accepetedExtensionListLabel = this.accepetedExtensionList.replace(/,(\.)([a-zA-Z0-9]{3,4})$/, ' ou $2').replace(/\./gi, ' ');
  }

  public carregarArquivosClick(event: any): void {
    const files = event.target.files;
    this.file = files[0];
    const fileParts = this.file.name.split('.');
    const extension = fileParts[fileParts.length - 1];
    fileParts.splice(fileParts.length - 1, 1);
    const name = fileParts.join('.');
    if (!this.allowAllExtensions && this.extensions.indexOf(extension.toLowerCase()) === -1) {
      const mensagem = this.extensions.length > 1 ? `Extensões permitidas <b>${this.accepetedExtensionListLabel}</b>` : `A extensão permitida para upload é somente <b>${this.accepetedExtensionList}</b>`;
      this.dialogService.error(mensagem);
      this.reset();

      return;
    }

    if (this.maxSize) {
      this.sizeAllowed = (this.file.size / (1024 * 1024) < this.maxSize);
    }

    this.setToolTip(this.labelElement, this.file.name);
    this.setToolTip(this.contentElement, this.file.name);


    if (this.sizeAllowed) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.uploadedFile = {
          content: reader.result.toString(),
          extension,
          size: this.file.size,
          fileName: this.file.name,
          type: this.file.type,
          name,
          shortName: this.limit(name)
        } as UploadModel;
        this.download.name = this.uploadedFile.fileName;
        this.download.content = this.uploadedFile.content;
        this.fileLoaded.emit({ ...this.uploadedFile });
        this.uploadData.emit(this.file as File);
      };


    } else {
      this.dialogService.error(`Tamanho máximo permitido ${this.maxSize} MB`);
      this.reset();
    }

  }

  limit(name: string) {
    if (name && name.length > this.maxLabel) {
      return name.substring(0, this.maxLabel) + '...';
    }
    return name;
  }


  excluir(event) {
    event.preventDefault();
    event.stopPropagation();
    this.reset();
  }

  reset() {
    this.file = {};
    this.uploadedFile = {} as IUploadModel;
    this.setToolTip(this.contentElement, '');
    this.setToolTip(this.labelElement, '');
    this.fileElement.nativeElement.value = '';
    this.fileLoaded.emit({} as IUploadModel);
  }

  setToolTip(element: ElementRef, value) {
    if (element && element.nativeElement) {
      element.nativeElement.setAttribute('title', value);
      element.nativeElement.setAttribute('tooltip', value);
    }

  }

}
