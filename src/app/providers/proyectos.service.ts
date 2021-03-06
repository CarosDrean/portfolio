import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Proyecto } from '../interfaces/proyecto.interface';
import { map } from 'rxjs/operators';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private itemsCollection: AngularFirestoreCollection<Proyecto>;
  public proyectos: Proyecto[] = [];
  public proyectosD: Proyecto[] = [];
  public proyectosI: Proyecto[] = [];
  public proyecto: Proyecto[] = [];
  public ultimo: Proyecto[] = [];

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  cargarProyectos() {
    this.itemsCollection = this.afs.collection<Proyecto>('proyectos', ref => ref.orderBy('uid', 'desc'));
    return this.itemsCollection.valueChanges().pipe(
      map((proyectos: Proyecto[]) => {
        this.proyectos = proyectos;
        this.cargarLados();
      })
    );
  }

  cargarLados() {
    const cantidad = this.proyectos.length;
    const lado = Math.floor(cantidad / 2);
    this.llenarDatosI(0, lado);
    this.llenarDatosD(lado, cantidad);
  }

  llenarDatosI(posicion, dato) {
    while (posicion < dato) {
      this.proyectosI[posicion] = this.proyectos[posicion];
      posicion++;
    }
  }

  llenarDatosD(posicion, dato) {
    let contador = 0;
    while (posicion < dato) {
      this.proyectosD[contador] = this.proyectos[posicion];
      posicion++;
      contador++;
    }
  }

  cargarIzquierda() {
    // tslint:disable-next-line:max-line-length
    return this.afs.collection<Proyecto>('proyectos', ref => ref.where('lado', '==', 'izquierda')).valueChanges().pipe(
      map((proyecto: Proyecto[]) => {
        this.proyectosI = proyecto;
      })
    );
  }

  cargarDerecha() {
    return this.afs.collection<Proyecto>('proyectos', ref => ref.where('lado', '==', 'derecha')).valueChanges().pipe(
      map((proyecto: Proyecto[]) => {
        this.proyectosD = proyecto;
      })
    );
  }

  obtenerUltimo() {
    const col = this.afs.collection<Proyecto>('proyectos', ref => ref.orderBy('uid', 'desc').limit(1));
    return col.valueChanges().pipe(
      map((proyecto: Proyecto[]) => {
        this.ultimo = proyecto;
      })
    );
  }

  agregarProyecto(proyecto: Proyecto) {
    return this.itemsCollection.doc(String(proyecto.uid)).set(proyecto);
  }

  subirImagen(event, nombreImg) {
    const file = event.target.files[0];
    const filePath = 'img/' + nombreImg;
    const task = this.storage.upload(filePath, file);
  }

  buscar(key) {
    return this.afs.collection<Proyecto>('proyectos', ref => ref.where('uid', '==', key)).valueChanges().pipe(
      map((proyecto: Proyecto[]) => {
        this.proyecto = proyecto;
      })
    );
  }

  eliminar(key) {
    return this.afs.collection<Proyecto>('proyectos').doc(String(key)).delete();
  }

}
