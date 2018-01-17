import { Component, OnInit, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit {

  @Input() icon: string;
  @Input() id: string;

  @Input() width: string;

  @Input() fileType: FileType;

  @Output() onUploadedStart: EventEmitter<Array<FileItem>>;
  @Output() onUploadedFinished: EventEmitter<FileUploadFinishedEvent>;

  private acceptFormats: string;

  constructor() {
    this.onUploadedStart = new EventEmitter<Array<FileItem>>();
    this.onUploadedFinished = new EventEmitter<FileUploadFinishedEvent>();
  }

  ngOnInit() {
    switch (this.fileType) {
      case FileType.Image:
        this.acceptFormats = "image/*";
        break;
      case FileType.Other:
        this.acceptFormats = "application/*";
        break;
    }
  }

  ngAfterViewInit() {
    document.getElementById(this.id).addEventListener('change', (event) => this.onChange(event), false);
  }

  private onChange(obj: any) {
    var selectedFiles = (<any>document.getElementById(this.id)).files;
    if (!selectedFiles) return;

    var files = new Array<FileItem>();
    for (var i = 0; i < selectedFiles.length; i++) {
      var file = selectedFiles[i];
      files.push(new FileItem(this.fileType, file.name, file.size));
      switch (this.fileType) {
        case FileType.Image: this.processImage(file); break;
        case FileType.Other: this.processFile(file); break;
      }
    }

    this.onUploadedStart.emit(files);
  }

  private processImage(file: any) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = (uploaded) => {
      let imageBase64: string = fileReader.result;
      imageBase64 = imageBase64.split(',')[1];
      this.onUploadedFinished.emit(new FileUploadFinishedEvent(this.fileType, file.name, imageBase64))
    }

    fileReader.onprogress = (data) => {
      if (data.lengthComputable) {
        var progress = ((data.loaded / data.total) * 100);
      }
    }
  }

  private processFile(file: any) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = (uploaded) => {
      let data: string = fileReader.result;
      data = data.split(',')[1];
      this.onUploadedFinished.emit(new FileUploadFinishedEvent(this.fileType, file.name, data))
    }

    fileReader.onprogress = (data) => {
      if (data.lengthComputable) {
        var progress = ((data.loaded / data.total) * 100);
      }
    }
  }

}

export class FileItem {
  constructor(public type: FileType, public name: string, public size: number) { }

  public bytes: string;
}

export class FileUploadFinishedEvent {
  constructor(public type: FileType, public name: string, public bytes: string) {

  }
}

export class FileProgressEvent {
  constructor(public name: string, public progress: number) {

  }
}

export enum FileType {
  Other = 0,
  Image = 1
}
