import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {

  constructor(public modal: NgbModal) { }

  ngOnInit() {
  }

 //funcion que abre modal , el contenido es el template que le pasemos desde un componente padre
 openCentrado(contenido): void {
  this.modal.open(contenido, { centered: true, size: 'lg', windowClass: 'modal-xl' })
}
}
