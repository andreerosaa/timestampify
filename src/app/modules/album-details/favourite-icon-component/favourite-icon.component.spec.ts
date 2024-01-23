import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteIconComponent } from './favourite-icon.component';

describe('FavouriteIconComponent', () => {
  let component: FavouriteIconComponent;
  let fixture: ComponentFixture<FavouriteIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
