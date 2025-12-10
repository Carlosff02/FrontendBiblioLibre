import { Autor } from "./autor";

export interface Libro{
  id:number|null;
  titulo:string;
  autor:Autor | null;
  descargas:number;
  imgSrc:string;
  descripcion:string;
  textHtml:string;
  epub:string;
  idioma:string;
  categorias:string[]
}
