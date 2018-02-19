import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

fdescribe('StorageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StorageService]
        });
    });

    it('should initialize the stotage service', inject([StorageService], (service: StorageService) => {
        expect(service).toBeTruthy();
    }));

    //Local Storage Part
    it('should add test1 to local storage', inject([StorageService], (service: StorageService) => {
        service.setStorage("test1", { name: "hamada" });
        expect(service.getStorage("test1"))
            .toEqual(jasmine.objectContaining({ name: "hamada" }));
    }));

    it('should empty the localstorage', inject([StorageService], (service: StorageService) => {
        service.empty();
        expect(service.listAllItems().length).toBe(0);
    }));

    it('should remove test2 from localstorage', inject([StorageService], (service: StorageService) => {
        service.setStorage("test2", "test2 data");
        service.remove("test2");
    }));

    //many items in local storage retrieving 
    it('should get all items from localstorage', inject([StorageService], (service: StorageService) => {
        service.setStorage("test1", "test1 data");
        service.setStorage("test2", "test2 data");
        service.setStorage("test3", "test3 data");
        service.setStorage("test3", "test3 data3");
        service.getStorage("test2");
        expect(service.listAllItems().length).toBeGreaterThanOrEqual(3)
    }));

    //empty cases
    it('should REMOVE local storage values', inject([StorageService], (service: StorageService) => {
        service.empty();
        expect(service.listAllItems().length).toBe(0)
    }));
  
  

});