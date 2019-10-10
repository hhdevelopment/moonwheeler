import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadService} from '../../core/service/upload/upload.service';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent implements OnInit {
  @ViewChild('fileInput', {static: true})
  file: ElementRef<HTMLInputElement>;

  public files: Set<File> = new Set();

  uploading = false;
  uploadSuccessful = false;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: FileList = this.file.nativeElement.files;
    if (files.length) {
      console.log(files);
    }
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        console.log(key);
        this.files.add(files[key]);
      }
    }
  }
}
