import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibrosSubidosService } from '../../../core/services/libros-subidos.service';
import { EpubViewerService } from '../../../core/services/epub-viewer.service';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-visor-libro-subido',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './visor-libro-subido.component.html',
  styleUrls: ['./visor-libro-subido.component.css']
})
export class VisorLibroSubidoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usuarioService = inject(UsuarioService);
  private readonly librosService = inject(LibrosSubidosService);
  private readonly epubViewer = inject(EpubViewerService);
  libroId!: number;
  epubUrl!: string;
  libro: any = null;
  usuarioId = this.usuarioService.getUsuario() ? this.usuarioService.getUsuario()?.id : null;

  @ViewChild('viewer', { static: true }) viewerRef!: ElementRef<HTMLDivElement>;



  ngOnInit(): void {

    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    this.epubUrl = this.librosService.getEpubUrl(this.libroId);
    this.librosService.obtenerMisLibros().subscribe((libros) => {
      this.libro = libros.find(l => l.id === this.libroId);
      setTimeout(() => {
        this.epubViewer.visualizarEpub(
          this.epubUrl,
          this.viewerRef,
          this.libro?.titulo || 'Libro',
          this.usuarioId ?? undefined
        );
      }, 200);
    });
  }

  goPrev() {
    this.epubViewer.goPrev();
  }

  goNext() {
    this.epubViewer.goNext();
  }
}
