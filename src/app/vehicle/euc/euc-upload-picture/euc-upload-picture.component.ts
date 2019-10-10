import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {faFileDownload} from '@fortawesome/free-solid-svg-icons';
import {UploadService} from '../../../core/service/upload/upload.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-euc-upload-picture',
  templateUrl: './euc-upload-picture.component.html',
  styleUrls: ['./euc-upload-picture.component.scss']
})
export class EucUploadPictureComponent implements OnInit {

  faFileDownload = faFileDownload;
  _path: string;
  sub: Subscription;

  constructor(
    private afStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private uploadService: UploadService) {
  }

  @ViewChild('fileInput', {static: true})
  file: ElementRef<HTMLInputElement>;

  @Input()
  set path(p: string) {
    this.uploading = false;
    this.url = null;
    if (!!p) {
      const ref: AngularFireStorageReference = this.afStorage.ref(`${p}`);
      this.sub = ref.getDownloadURL().subscribe(url => {
        this.url = url;
      });
    }
  }

  @Output()
  uploadPicture: EventEmitter<string> = new EventEmitter<string>();

  url: string;

  uploading = false;
  uploadSuccessful = false;


  ngOnInit() {
  }

  setPicture() {
    if (!this.uploading) {
      this.uploading = true;
      this.file.nativeElement.click();
    }
  }

  onFileAdded() {
    const files: FileList = this.file.nativeElement.files;
    if (files.length) {
      const path = `contents/${this.afs.createId()}`;
      this.uploadService.uploadFile(path, files.item(0)).pipe(
        filter(p => p === 100),
      ).subscribe(p => {
        if (!!this.path) {
          const ref: AngularFireStorageReference = this.afStorage.ref(path);
          ref.delete().subscribe(() => {
            this.path = path;
            this.uploadPicture.emit(path);
          });
        } else {
          this.path = path;
          this.uploadPicture.emit(path);
        }
      });
    }
  }
}
