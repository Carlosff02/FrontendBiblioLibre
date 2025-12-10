import 'zone.js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisorEpub } from './visor-epub';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VisorEpub', () => {
  let component: VisorEpub;
  let fixture: ComponentFixture<VisorEpub>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VisorEpub, 
        RouterTestingModule, 
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisorEpub);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});