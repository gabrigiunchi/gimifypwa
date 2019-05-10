import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgxCropperjsComponent} from 'ngx-cropperjs';
import {CONSTANTS} from 'src/app/constants';
import {LayoutService} from 'src/app/services/layout.service';

interface Dimension {
  width: number;
  height: number;
}

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
  readonly config;

  @Input() image: string;
  @ViewChild('angularCropper') private angularCropper: NgxCropperjsComponent;
  @Output() cropdone = new EventEmitter<Blob>();
  @Output() cancel = new EventEmitter();

  private readonly cropperSize: Dimension = CONSTANTS.IMAGE_CROPPER_SIZE;

  constructor(private layoutService: LayoutService) {
    this.config = {
      viewMode: 0,
      zoomable: true,
      movable: true,
      cropBoxMovable: false,
      cropBoxResizable: false,
      modal: this.layoutService.isDesktop,
      dragMode: 'move',
      guides: false,
      center: false,
      background: false,
      restore: false,
      highlight: false,
      minContainerWidth: this.containerSize.width,
      minContainerHeight: this.containerSize.height
    };
  }

  ngOnInit(): void {
    this.angularCropper.ready.subscribe(() => {
      this.angularCropper.cropper.setCanvasData(
        {width: this.cropperSize.width, height: this.cropperSize.height}
      );

      this.angularCropper.cropper.setCropBoxData(
        {
          width: this.cropperSize.width,
          height: this.cropperSize.height,
          left: this.offset.width,
          top: this.offset.height
        }
      );

      this.angularCropper.cropper.move(this.offset.width);
    });
  }

  crop(): void {
    const croppedCanvas: HTMLCanvasElement = this.angularCropper.cropper.getCroppedCanvas(
      CONSTANTS.CROPPED_IMAGE_SIZE);
    const roundedCanvas: HTMLCanvasElement = this.getRoundedCanvas(croppedCanvas);
    roundedCanvas.toBlob(blob => this.cropdone.emit(blob));
  }

  abort(): void {
    this.cancel.emit();
  }

  get isDesktop(): boolean {
    return this.layoutService.isDesktop;
  }

  private get containerSize(): Dimension {
    if (this.layoutService.isDesktop) {
      return this.cropperSize;
    }

    const x = screen.availWidth;
    const y = screen.availHeight - 56;

    return {width: x, height: y};
  }

  private get offset(): Dimension {
    if (this.layoutService.isDesktop) {
      return {width: 0, height: 0};
    }

    // Center in the screen
    const x = (this.containerSize.width - this.cropperSize.width) / 2;
    const y = (this.containerSize.height - this.cropperSize.height) / 2;

    return {width: x, height: y};
  }

  private getRoundedCanvas(sourceCanvas): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }
}

