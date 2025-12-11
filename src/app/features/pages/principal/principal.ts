import { Component, effect, inject, signal } from '@angular/core';
import { LibroService } from '../../../core/services/libro.service';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Login } from '../../components/login/login';
import { FormsModule } from '@angular/forms';
import { EpubViewerService } from '../../../core/services/epub-viewer.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Libro } from '../../../core/models/libro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  imports: [RouterLink, FormsModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal {

  private readonly libroService = inject(LibroService)
  private readonly libroUsuarioService = inject(EpubViewerService);
  private readonly usuarioService = inject(UsuarioService);
  titulo='';
  libros = rxResource({
    stream: () => this.libroService.listarLibrosPopulares()
});
librosPorUsuario:Libro[] =[];

usuarioId = signal<number|null>(null)

constructor(){
   effect(() => {

    this.usuarioService.usuarioChange();

    const user = this.usuarioService.getUsuario();

    this.usuarioId.set(user?.id ?? null);
    this.librosPorUsuario=[]
    this.obtenerLibrosPorUsuario();
  });
}

obtenerLibrosPorUsuario() {
  const id = this.usuarioId();

  if (!id) {
    this.librosPorUsuario = [];
    return;
  }

  this.libroUsuarioService.obtenerLibrosPorUsuario(id).subscribe({
    next: (res) => {
      this.librosPorUsuario = res ?? [];
      console.log(this.librosPorUsuario)
    },
    error: (err) => {
      console.error('Error al cargar libros:', err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los libros del usuario."
      });
    }
  });
}


}
