import { Component } from '@angular/core';

import { Platform, Events, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Global } from './services/global';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local-storage.service';
import { Router } from '@angular/router';
declare const gapi: any;



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages: any = [];
  data_menu = [
    { id: 2, pagina: "Inicio", link: "home" },
    { id: 2, pagina: "Categorias", link: "categorias" },
    { id: 2, pagina: "Ubicaciones", link: "ubicaciones" },
    { id: 2, pagina: "Publicar", link: "publicar" },
    { id: 2, pagina: "Iniciar Sesion", link: "login" }
  ];
  data_menu_dos = [
    { id: 2, pagina: "Inicio", link: "home" },
    { id: 2, pagina: "Categorias", link: "categorias" },
    { id: 2, pagina: "Ubicaciones", link: "lugares" },
    { id: 2, pagina: "Publicar", link: "publicar" },
    { id: 2, pagina: 'Mi perfil', link: 'perfil' },
    { id: 3, pagina: 'Mis publicaciones', link: 'publicaciones' },
    { id: 6, pagina: 'Cerrar Sesión', link: 'logout' }
  ];
  data_menu_admin = [
    { id: 2, pagina: "Inicio", link: "home" },
    { id: 2, pagina: "Categorias", link: "categorias" },
    { id: 2, pagina: "Ubicaciones", link: "lugares" },
    { id: 2, pagina: "Publicar", link: "publicar" },
    { id: 2, pagina: "Añadir Categoria", link: "addcat" },
    { id: 2, pagina: "Añadir Ubicacion", link: "addlocation" },
    { id: 2, pagina: 'Mi perfil', link: 'perfil' },
    { id: 3, pagina: 'Mis publicaciones', link: 'publicaciones' },
    { id: 4, pagina: 'Añadir Publicidad', link: 'publicidad' },
    { id: 6, pagina: 'Cerrar Sesión', link: 'logout' }
  ];
  auth2: any = [];
  active: boolean = false;
  device: number = null;
  usuario: any = [];
  login: boolean = false;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private events: Events,
    private menu: MenuController,
    public modalController: ModalController,
    public userService: UserService,
    private local: LocalStorageService,
    private router:Router
  ) {
    this.initializeApp();
    this.menuToogle();
    this.userService.status$.subscribe((data) => {
      // this.menu=this.data_menu_dos;
      this.checkState();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.device = this.platform.width();
      this.getDevice(this.device);
      this.appPages = this.data_menu;
      this.checkState();
    });
  }

  menuToogle() {
    this.events.subscribe('menu:toogle', () => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      if (this.menu.isOpen) {
        this.active = true;
      } else {
        this.active = false;
      }
    });
  }

  getDevice(width) {
    if (width < 1024) {
      this.active = true;
    }
  }

  async  checkState() {
    let status = await this.userService.Logeado();
    if (status) {
      this.usuario = await this.local.cargarStorage('usuario').then((data: any) => {
        return data;
      }).catch((err: any) => {
        return null;
      });
      if (this.usuario) {
        this.login = true;
      }
      if (this.usuario.role == 2) {
        this.appPages = this.data_menu_dos;
      } else {
        this.appPages = this.data_menu_admin;
      }
    } else {
      this.appPages = this.data_menu;
      this.login = false;
    }
  }
  make(item){
    if(item.id==6){
      this.userService.logout(); 
      window.location.reload();
    }else{
      this.router.navigate([item.link]);
    }
    console.log(item)
  }






}
