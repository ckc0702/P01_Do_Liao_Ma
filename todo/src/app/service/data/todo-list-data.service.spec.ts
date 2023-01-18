import { TestBed } from '@angular/core/testing';

import { TodoListDataService } from './todo-list-data.service';

describe('TodoListDataService', () => {
  let service: TodoListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
