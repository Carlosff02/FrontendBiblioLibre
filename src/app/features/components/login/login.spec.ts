import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login'; 
import { AuthService } from '../../../core/services/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('AuthService', ['onLogin', 'onRegister']);

    await TestBed.configureTestingModule({
      imports: [Login], 
      providers: [

        { provide: AuthService, useValue: spy }
      ]
    })
    .compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('el formulario debe ser inválido si está vacío', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('debe llamar a AuthService.onLogin cuando el formulario es válido y se envía', () => {
    const mockCredentials = { userIdOrEmail: 'usuario1', contraseña: 'password123' };
    
    component.loginForm.controls['userIdOrEmail'].setValue(mockCredentials.userIdOrEmail);
    component.loginForm.controls['contraseña'].setValue(mockCredentials.contraseña);

    authServiceSpy.onLogin.and.returnValue(of({ token: 'fake-token' } as any));

    spyOn(component, 'cerrarLogin');

    component.onLogin();

    expect(authServiceSpy.onLogin).toHaveBeenCalledWith(mockCredentials);
    
    expect(component.cerrarLogin).toHaveBeenCalled();
  });

  it('debe manejar el error si las credenciales son incorrectas', () => {
    component.loginForm.controls['userIdOrEmail'].setValue('user');
    component.loginForm.controls['contraseña'].setValue('wrong-pass');

    authServiceSpy.onLogin.and.returnValue(throwError(() => new Error('Credenciales malas')));
    
    spyOn(console, 'error');

    component.onLogin();

    expect(authServiceSpy.onLogin).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();

  });
});