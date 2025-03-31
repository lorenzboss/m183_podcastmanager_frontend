import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDialogComponent } from './topic-dialog.component';

describe('TopicDialogComponent', () => {
  let component: TopicDialogComponent;
  let fixture: ComponentFixture<TopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopicDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
