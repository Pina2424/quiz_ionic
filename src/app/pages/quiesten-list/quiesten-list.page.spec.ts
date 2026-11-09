import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuiestenListPage } from './quiesten-list.page';

describe('QuiestenListPage', () => {
  let component: QuiestenListPage;
  let fixture: ComponentFixture<QuiestenListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiestenListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
