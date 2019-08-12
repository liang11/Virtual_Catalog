import { TestBed } from '@angular/core/testing';

import { ServiceVirtualCatalogService } from './service-virtual-catalog.service';

describe('ServiceVirtualCatalogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceVirtualCatalogService = TestBed.get(ServiceVirtualCatalogService);
    expect(service).toBeTruthy();
  });
});
