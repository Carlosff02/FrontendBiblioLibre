import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibrosSubidosService } from '../../../core/services/libros-subidos.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-mis-libros',
  standalone: true,
  imports: [ RouterLink, FormsModule],
  templateUrl: './mis-libros.component.html',
  styleUrls: ['./mis-libros.component.css']
})
export class MisLibrosComponent {
  private readonly librosService = inject(LibrosSubidosService);
  readonly librosResource = rxResource({
    stream: ()=>this.librosService.obtenerMisLibros(),
  })
  archivoSeleccionado: File | null = null;
  tituloLibro: string = "";



  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subirLibro() {
    if (!this.archivoSeleccionado || this.tituloLibro.trim().length === 0) {
      alert("Selecciona un archivo EPUB y escribe un título");
      return;
    }

    this.librosService.subirLibro(this.archivoSeleccionado, this.tituloLibro)
      .subscribe({
        next: () => {
          alert("Libro subido correctamente");
          this.tituloLibro = "";
          this.archivoSeleccionado = null;
          this.librosResource.reload();
        },
        error: () => {
          alert("Error al subir el libro");
        }
      });
  }
}
