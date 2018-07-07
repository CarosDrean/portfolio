import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

import { ProyectosService } from '../../providers/proyectos.service';
import { Proyecto } from '../../interfaces/proyecto.interface';
import { AuthService } from '../../providers/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.css'
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  public items: Observable<any[]>;
  cargarScript = true;
  public evportada;
  public evimguno;
  public evimgdos;
  public evimgtres;

  public portada;
  public imguno;
  public imgdos;
  public imgtres;

  vportada = true;
  vimguno = true;
  vimgdos = true;
  vimgtres = true;

  // datos
  titulo = 'Titulo';
  categoria = 'Categoria';
  github = 'https://';
  fecha = '--/--/--';
  descripcion = 'Descripcion del proyecto';
  iportada: any;
  iimguno: any;
  iimgdos: any;
  iimgtres: any;
  uid: number;
  imagenes: any[] = [];
  cantidad = 0;

  ultimoLado = '';

  constructor(public authService: AuthService,
    private router: Router, db: AngularFirestore,
    public _ps: ProyectosService, private storage: AngularFireStorage, public afAuth: AngularFireAuth) {
    this._ps.cargarProyectos().subscribe( () => {
      this.cantidad = _ps.proyectos.length;
      this.cargarScript = true;
      // this.loadScript();
    });
    this.afAuth.authState.subscribe( user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.quitarClass();
  }

  detalleProyecto(key) {
    let proyecto: Proyecto;
    this._ps.buscar(key).subscribe(() => {
      proyecto = this._ps.proyecto[0];
      this.uid = proyecto.uid;
      this.titulo = proyecto.titulo;
      this.categoria = proyecto.categoria;
      this.github = proyecto.github;
      this.fecha = proyecto.fecha;
      this.descripcion = proyecto.descripcion;
      this.iimguno = this.detalleImagen(proyecto.imguno);
      this.iimgdos = this.detalleImagen(proyecto.imgdos);
      this.iimgtres = this.detalleImagen(proyecto.imgtres);
      this.imagenes = [proyecto.portada, proyecto.imguno, proyecto.imgdos, proyecto.imgtres];
    });
  }

  detalleImagen(nombre) {
    const ref = this.storage.ref('img/' + nombre);
    return ref.getDownloadURL();
  }

  obtenerUltimo() {
    console.log('se ejecuta');
    this._ps.obtenerUltimo().subscribe(() => {
      this.ultimoLado = this._ps.ultimo[0].lado;
      console.log(this.ultimoLado);
    });
  }

  obtenerLado() {
    if (this.ultimoLado === 'izquierda') {
      return 'derecha';
    } else {
      return 'izquierda';
    }
  }

  ingresarProyecto(form: NgForm) {
    console.log(this.obtenerLado());
    if (this.verificarVacio(form)) {
      this.subirImagen();

      const proyecto: Proyecto = {
        uid: new Date().getTime(),
        fecha: this.obtenerFecha(),
        lado: this.obtenerLado(),
        titulo: form.value.titulo,
        categoria: form.value.categoria,
        github: form.value.github,
        descripcion: form.value.descripcion,
        portada: this.portada,
        imguno: this.imguno,
        imgdos: this.imgdos,
        imgtres: this.imgtres
      };
      this._ps.agregarProyecto(proyecto).then( () => {
        this.loadScript();
        form.reset();
        console.log('agregado');
      });
    }
  }

  subirImagen() {
    const events = [this.evportada, this.evimguno, this.evimgdos, this.evimgtres];
    const nombres = [this.portada, this.imguno, this.imgdos, this.imgtres];

    // tslint:disable-next-line:forin
    for (const i in events) {
      this._ps.subirImagen(events[i], nombres[i]);
    }
  }

  eliminar(key) {
    this.quitarClass();
    this._ps.eliminar(key);
    // tslint:disable-next-line:forin
    for (const i in this.imagenes) {
      this.eliminarImg(this.imagenes[i]);
    }
    this.loadScript();
  }

  eliminarImg(nombre) {
    const ref = this.storage.ref('img/' + nombre);
    ref.delete();
  }

  capturarEvent(event, pos) {
    const tiempo = new Date().getTime();
    switch (pos) {
      case 0:
        this.vportada = false;
        this.evportada = event;
        this.portada = tiempo + event.target.files[0].name;
        break;
      case 1:
        this.vimguno = false;
        this.evimguno = event;
        this.imguno = tiempo + event.target.files[0].name;
        break;
      case 2:
        this.vimgdos = false;
        this.evimgdos = event;
        this.imgdos = tiempo + event.target.files[0].name;
        break;
      case 3:
        this.vimgtres = false;
        this.evimgtres = event;
        this.imgtres = tiempo + event.target.files[0].name;
        break;
    }
  }

  obtenerFecha() {
    const date = new Date();
    return this.formato(date.getDate()) + '/' + this.formato(date.getMonth() + 1) + '/' + date.getFullYear();
  }

  formato(n: number) {
    if ((n / 10) !== 0) {
      return '0' + n;
    } else {
      return n;
    }
  }

  verificarVacio(form: NgForm) {
    if (form.value.titulo.length === 0 || form.value.categoria.length === 0 ||
      form.value.github.length === 0 || form.value.descripcion.length === 0 ||
      this.vportada || this.vimguno || this.vimgdos || this.vimgtres) {
        console.log('campos incompletos');
        return false;
    } else {
      return true;
    }
  }

  logoout() {
    this.afAuth.auth.signOut();
    // this.authService.logout();
    this.router.navigate(['/home']);
  }

  quitarClass() {
    // esto evita que se quede una parte cubierta la del admin
    $('body').removeClass('show-message');
    $('#main .message-list li').removeClass('active');
    $('body').removeClass('show-main-overlay');
  }

  cargar(dato) {
    if (dato === this.cantidad - 1) {
      if (this.cargarScript) {
        this.loadScript();
        this.cargarScript = false;
      }
     }
  }

  public loadScript() {
    console.log('script');
    let messageIsOpen = false;

    function mostrarOver() {
      $('body').addClass('show-main-overlay');
    }

    function hideOver() {
      $('body').removeClass('show-main-overlay');
    }

    function mostrarMess() {
      $('body').addClass('show-message');
      messageIsOpen = true;
    }

    function hideMess() {
      $('body').removeClass('show-message');
      $('#main .message-list li').removeClass('active');
      messageIsOpen = false;
    }

    function mostrarSide() {
      $('body').addClass('show-sidebar');
    }

    function hideSide() {
      $('body').removeClass('show-sidebar');
    }

    $('.trigger-toggle-sidebar').on('click', function() {
      mostrarSide();
      hideOver();
    });

    $('.trigger-message-close').on('click', function() {
      hideMess();
      hideOver();
    });

    $('#main .message-list li').on('click', function(e) {
      const item = $(this),
        target = $(e.target);

      if (target.is('label')) {
        item.toggleClass('selected');
      } else {
        if (messageIsOpen && item.is('.active')) {
          hideMess();
          hideOver();
        } else {
          if (messageIsOpen) {
            hideMess();
            item.addClass('active');
            setTimeout(function() {
              mostrarMess();
            }, 300);
          } else {
            item.addClass('active');
            mostrarMess();
          }
          mostrarOver();
        }
      }
    });

    $('input[type=checkbox]').on('click', function(e) {
      e.stopImmediatePropagation();
    });

    $('#main > .overlay').on('click', function() {
      hideOver();
      hideMess();
      hideSide();
    });

    $('.nano').nanoScroller();

    $('a').on('click', function(e) {
      e.preventDefault();
    });

    $('.search-box input').on('focus', function() {
      if ($(window).width() <= 1360) {
        hideMess();
      }
    });

  }

}
