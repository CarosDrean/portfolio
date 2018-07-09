import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

import { ProyectosService } from '../../providers/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../../assets/css/anim.css']
})
export class ProyectosComponent implements OnInit {
  profileUrlI: any[] = [];
  profileUrlD: any[] = [];
  proyectos: Proyecto[] = [];
  proyectosD: Proyecto[] = [];
  proyectosI: Proyecto[] = [];

  constructor(db: AngularFirestore, public _ps: ProyectosService, private storage: AngularFireStorage) {
    this._ps.cargarProyectos().subscribe(() => {
      this.cargarImagenesI();
      this.cargarImagenesD();
    });
    // this._ps.cargarIzquierda().subscribe(() => this.cargarImagenesI());
    // this._ps.cargarDerecha().subscribe(() => this.cargarImagenesD());
  }

  ngOnInit() {
  }

  cargarImagenesI() {
    this.proyectosI = this._ps.proyectosI;
    // tslint:disable-next-line:forin
    for (const i in this.proyectosI) {
      this.profileUrlI[i] = this.detalleImagen(this.proyectosI[i].portada);
    }
  }

  cargarImagenesD() {
    this.proyectosD = this._ps.proyectosD;
    // tslint:disable-next-line:forin
    for (const i in this.proyectosD) {
      this.profileUrlD[i] = this.detalleImagen(this.proyectosD[i].portada);
    }
  }

  detalleImagen(nombre) {
    const ref = this.storage.ref('img/' + nombre);
    return ref.getDownloadURL();
  }

}
