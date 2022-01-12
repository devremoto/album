import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('container', { static: false }) container: ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  @Input() background = true;
  @Input() imagePath: string;
  @Input() name: string;
  @Input() cover = false;
  @Input() content: string;
  @Input() url: string;
  @Input() width: number;
  @Input() height: number;
  @Input() showLabel = true;
  @Output() removeClick = new EventEmitter();

  opened = false;
  btnMsg = 'fechar';
  isImage: boolean;
  size: { width: number, height: number };
  helper = {
    imgFilterExt: '|jpg|png|jpeg|bmp|gif|',
    support: !!(FileReader && CanvasRenderingContext2D),
    isImage(file: any) {
      const type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  img: HTMLImageElement;
  id: string;
  canvasId: string;
  constructor() {
    this.id = Math.random().toString(36).substring(2);
    this.canvasId = Math.random().toString(36).substring(2);
  }
  ngAfterViewInit(): void {
    this.load();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.content && changes.content.currentValue && changes.content.currentValue !== changes.content.previousValue) {
      this.load();
    }
  }

  ngOnInit() {
  }

  load = () => {
    const el = this.container.nativeElement;
    this.img = new Image();
    this.img.src = this.content || this.url;
    this.img.onload = this.onLoadImage;

    if (this.background) {
      const width = (this.width / this.height) * this.height;
      const height = (this.height / this.width) * this.width;

      el.style.backgroundImage = `url('${this.content || this.url}')`;
      el.style.backgroundSize = 'cover';
      el.style.width = this.cover ? 'auto' : `${width}px`;
      el.style.height = `${width}px`;
      el.style.backgroundPosition = 'center center';
    }

  }


  onLoadImage = (event) => {
    const { width, height } = event.target;
    const max = Math.max(width, height);
    const proportion = this.width / width;
    const newWidth = width * proportion;
    const newHeight = height * proportion;
    this.canvas.nativeElement.setAttribute('width', newWidth.toString());
    this.canvas.nativeElement.setAttribute('height', newHeight.toString());
    const context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.content = event.target.result;
    context.createImageData(newWidth, newHeight);
    setTimeout(() => {
      context.drawImage(this.img, 0, 0, newWidth, newHeight);
    }, 500);
  }

  remove(event) {
    this.content = 'assets/images/default-user.png';
    this.url = '';
    this.img = null;
    const el = this.container.nativeElement;
    el.style.backgroundImage = '';
    this.removeClick.emit();
  }

  show() {
    if (this.imagePath) {
      this.opened = true;
    }
  }

  close() {
    this.opened = false;
  }
}
