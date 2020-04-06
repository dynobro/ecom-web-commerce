import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../../../services/firebase-storage.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as slug from 'slug';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  constructor(
    private firebaseStorage: FirebaseStorageService
  ) { }

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  mensajeArchivo = 'No hay un archivo seleccionado';
  datosFormulario = new FormData();
  nombreArchivo = '';
  URLPublica = '';
  porcentaje = 0;
  finalizado = false;
  previewUrl = '';
  textUploadButton = 'Subir archivo';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  // Evento que se gatilla cuando el input de tipo archivo cambia
  public async fileChangedEvent(event) {
    this.imageChangedEvent = event;
    if (event.target.files.length > 0) {
      for (const file of event.target.files) {
        this.mensajeArchivo = `${file.name}`;
        this.nombreArchivo = slug(file.name, { lower: true });
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', file, file.name);
        const base64Image = await toBase64(file);
        const compressedImage = await compressImage(base64Image, 400, 200);
        this.previewUrl = compressedImage.toString();
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  // Sube el archivo a Cloud Storage
  public subirArchivo() {
    try {
      const archivo = this.datosFormulario.get('archivo');
      const referencia = this.firebaseStorage.referenciaCloudStorage(`/uploads/products/${this.nombreArchivo}`);
      const tarea = this.firebaseStorage.tareaCloudStorage(`/uploads/products/${this.nombreArchivo}`, archivo);

      // Cambia el porcentaje
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentaje = Math.round(porcentaje);
        this.textUploadButton = `Subiendo.. ${this.porcentaje}%`;
        if (this.porcentaje === 100) {
          referencia.getDownloadURL().subscribe((URL) => {
            this.finalizado = true;
            this.URLPublica = URL;
            this.porcentaje = 0;
            this.textUploadButton = 'Subir archivo';
            this.previewUrl = '';
          });
        }
      });
    } catch (e) {
      console.log({ e });
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}

const compressImage = (src, newX, newY) => new Promise((res, rej) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const elem = document.createElement('canvas');
    elem.width = newX;
    elem.height = newY;
    const ctx = elem.getContext('2d');
    ctx.drawImage(img, 0, 0, newX, newY);
    const data = ctx.canvas.toDataURL();
    res(data);
  };
  img.onerror = error => rej(error);
});


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
