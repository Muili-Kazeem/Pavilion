import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  showCartModal: boolean = false;

  constructor() { }
}
