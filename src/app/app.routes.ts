import { Routes } from '@angular/router';
import { Principal } from './features/pages/principal/principal';
import { BusquedaComponent } from './features/pages/busqueda.component/busqueda.component';
import { VisorLibroComponent } from './features/pages/visor-libro.component/visor-libro.component';
import { VisorEpub } from './features/pages/visor-epub/visor-epub';
import { HomeComponent } from './features/pages/home-page/home.component';

// 👇 IMPORTA TUS NUEVOS COMPONENTES
import { MisLibrosComponent } from './features/pages/mis-libros.component/mis-libros.component';
import { VisorLibroSubidoComponent } from './features/pages/visor-libro-subido/visor-libro-subido.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: Principal },
      { path: 'busqueda', component: BusquedaComponent },
      { path: 'busqueda/visor/:titulo', component: VisorLibroComponent,  },

      // ⭐ AQUI AGREGO "MIS LIBROS"
      {
        path: 'mis-libros',
        component: MisLibrosComponent
      },

      // ⭐ AQUI AGREGO EL VISOR DE EPUB SUBIDO
      {
        path: 'visor-libro-subido/:id',
        component: VisorLibroSubidoComponent
      },
    ]
  },

  { path: 'busqueda/visor-epub/:titulo', component: VisorEpub }
];
