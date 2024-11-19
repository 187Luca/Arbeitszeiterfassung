import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnzeigeComponent } from './anzeige.component';

describe('AnzeigeComponent', () => {
  let component: AnzeigeComponent;
  let fixture: ComponentFixture<AnzeigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnzeigeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnzeigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
