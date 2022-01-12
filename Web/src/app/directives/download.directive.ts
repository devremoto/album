import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DownloadModel } from '../models/common/download.model';

@Directive({
  selector: '[appDownload]'
})
export class DownloadDirective implements OnChanges {

  constructor(private el: ElementRef) {

  }

  @Input('appDownload') file: DownloadModel;
  @Input() url: string;
  @Input() controller: string;
  @Input() key: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.file && changes.file.currentValue && changes.file.currentValue !== changes.file.previousValue) {
      this.file = changes.file.currentValue;
      if (changes.file.currentValue.key) {
        this.key = changes.file.currentValue.key;
      }
      if (changes.file.currentValue.controller) {
        this.controller = changes.file.currentValue.controller;
      }
    }
  }

  @HostListener('click', ['$event', 'file']) onMouseClick(event, file) {
    event.preventDefault();
    event.stopPropagation();
    if (this.file && this.file.content !== 'MA==' && this.file.name) {
      this.download(this.file);
    } else
      if (this.controller && this.key) {
        this.downloadByController();
      } else if (this.url) {
        this.downloadByUrl();
      }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.cursor('pointer');
  }

  private cursor(cursor: string) {
    this.el.nativeElement.style.cursor = cursor;
  }

  private download(file: DownloadModel) {
    if (file.content) {
      this.downloadLocal(file);
      return;
    }

    if (file.controller && file.key) {
      this.key = file.key;
      this.controller = file.controller;
      this.downloadByController();
      return;
    }

    if (file.controller && file.key) {
      this.key = file.key;
      this.controller = file.controller;
      this.downloadByController();
      return;
    }

    if (this.url) {
      this.downloadByUrl();
      return;
    }
  }

  private downloadLocal(file: DownloadModel) {
    const element = document.createElement('a');
    const content = this.file.content.split(',');
    element.setAttribute('href', `${content[0]},${content[1]}`);
    element.setAttribute('target', `_blank`);
    element.setAttribute('download', file.name || 'untitled');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  private downloadByController() {
    if (this.controller && this.key) {
      window.location.href = `${environment.apiAddress}/${this.controller}/download/${this.key}`;
    }
  }

  private downloadByUrl() {
    window.location.href = `${this.url}`;
  }

}


