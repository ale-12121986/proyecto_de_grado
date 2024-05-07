import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabajoPage } from './trabajo.page';

describe('TrabajoPage', () => {
  let component: TrabajoPage;
  let fixture: ComponentFixture<TrabajoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TrabajoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
