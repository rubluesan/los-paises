import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCardSkeleton } from './country-card-skeleton';

describe('CountryCardSkeleton', () => {
  let component: CountryCardSkeleton;
  let fixture: ComponentFixture<CountryCardSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCardSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCardSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
