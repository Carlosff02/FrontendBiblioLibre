import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LibrosSubidosService {

  private baseUrl = `${constants.apiUrl}/mis-libros`;

  constructor(private http: HttpClient) {}

  subirLibro(file: File, titulo: string) {
    const form = new FormData();
    form.append('file', file);
    form.append('titulo', titulo);

    return this.http.post(`${this.baseUrl}/subir`, form);
  }

  obtenerMisLibros() {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getEpubUrl(id: number) {
    return `${this.baseUrl}/archivo/${id}`;
  }
}
