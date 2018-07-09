import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { ProyectosService } from '../../providers/proyectos.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styles: []
})
export class DetalleProyectoComponent implements OnInit {

  public imguno;
  public imgdos;
  public imgtres;
  proyecto: Proyecto;

  constructor(private route: ActivatedRoute, private storage: AngularFireStorage, public _ps: ProyectosService) {
    this.proyecto = {
      uid: new Date().getTime(),
      fecha: '--/--/--',
      lado: '',
      titulo: 'CarosDrean',
      categoria: 'Developer',
      github: 'https://github.com/CarosDrean',
      descripcion: 'Este es un gran proyecto esperamos sea de utilidad para ti.',
      portada: ''
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.detalleProyecto(+id);
  }

  detalleProyecto(key: number) {
    this._ps.buscar(key).subscribe(() => {
      this.proyecto = this._ps.proyecto[0];
      console.log(this.proyecto);
      this.imguno = this.detalleImagen(this.proyecto.imguno);
      this.imgdos = this.detalleImagen(this.proyecto.imgdos);
      this.imgtres = this.detalleImagen(this.proyecto.imgtres);
      console.log(this.imguno + ' 2ver');
    });
  }

  detalleImagen(nombre) {
    const ref = this.storage.ref('img/' + nombre);
    return ref.getDownloadURL();
  }

}
