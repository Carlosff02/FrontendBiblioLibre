import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisorLibroComponent } from './visor-libro.component';
import { LibroService } from '../../../core/services/libro.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';


describe('VisorLibroComponent (Integración)', () => {
  let component: VisorLibroComponent;
  let fixture: ComponentFixture<VisorLibroComponent>;
  let libroServiceSpy: jasmine.SpyObj<LibroService>;

  // Datos simulados
  const MOCK_LIBRO = {
    id: 1,
    titulo: 'Don Quijote',
    imgSrc: 'https://via.placeholder.com/150',
    autor: { nombre: 'Miguel de Cervantes' },
    descripcion: 'En un lugar de la mancha...',
    idioma: 'es', 
    categorias: ['Clásicos'],
    epub: 'http://fake.com/book.epub',
    textHtml: 'http://fake.com/book.html'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LibroService', ['buscarPorNombre']);

    await TestBed.configureTestingModule({
      imports: [ VisorLibroComponent, RouterTestingModule ],
      providers: [
        { provide: LibroService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'Don Quijote' } }
          }
        }
      ]
    }).compileComponents();

    libroServiceSpy = TestBed.inject(LibroService) as jasmine.SpyObj<LibroService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorLibroComponent);
    component = fixture.componentInstance;
  });

  it('debe mostrar el libro correctamente en el HTML', () => {
    libroServiceSpy.buscarPorNombre.and.returnValue(of(MOCK_LIBRO as any));
    
    fixture.detectChanges();

    const titulo = fixture.debugElement.query(By.css('h1'));
    expect(titulo.nativeElement.textContent).toContain('Don Quijote');
  });

  it('debe mostrar el spinner manualmente', () => {
    libroServiceSpy.buscarPorNombre.and.returnValue(of(MOCK_LIBRO as any));
    
    fixture.detectChanges(); 

    component.procesandoDatos.set(true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('.animate-spin'));
    expect(spinner).toBeTruthy();
  });

  it('debe manejar errores del servicio', () => {
    spyOn(console, 'error');
    libroServiceSpy.buscarPorNombre.and.returnValue(throwError(() => new Error('Error de red')));

    fixture.detectChanges();

    expect(component.procesandoDatos()).toBeFalse();
  });
});