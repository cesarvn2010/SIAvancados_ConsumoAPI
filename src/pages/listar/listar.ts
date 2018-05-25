import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Disciplina} from '../../Model/Disciplina';

/**
 * Generated class for the ListarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar',
  templateUrl: 'listar.html',
})
export class ListarPage {

  usuario:string = "";
  titulo:string= "";
  DisciplinasAluno : Array<Disciplina>;  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.usuario = this.navParams.get('usuario'); 
    this.DisciplinasAluno = this.navParams.get('disciplina');
    this.titulo = this.navParams.get('titulo'); 
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad ListarPage');
  }

}
