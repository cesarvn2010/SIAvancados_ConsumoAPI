import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest';
import {Disciplina} from '../../Model/Disciplina';
 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:string = "";
  senha:string="";
  DisciplinasAluno : Array<Disciplina>;     
  retorno:any; 

  constructor(public navCtrl: NavController,
       public alertCtrl: AlertController,
       private rest: RestProvider) {
        this.usuario = "00000001";
        this.senha = "123";

  }

   async listarGet(){
    if (this.usuario.trim() == "")
    {
        this.showAlert("Usuário não informado!");
        return;
    }
    if (this.senha.trim() == "")
    {
        this.showAlert("Senha não informada!");
        return;
    }
    if (this.senha.trim() != "123")
    {
        this.showAlert("Senha inválida!");
        return;
    }
     
    let mensagem = await this.montarTela(1);
    if (mensagem == "")
        this.navCtrl.push("ListarPage", {usuario:this.usuario.trim(),
                                     disciplina: this.DisciplinasAluno,
                                     titulo: "Pesquisa Provider Get" });
    else
       this.showAlert(mensagem);
}

async listarPost(){
  if (this.usuario.trim() == "")
  {
      this.showAlert("Usuário não informado!");
      return;
  }
  if (this.senha.trim() == "")
  {
      this.showAlert("Senha não informada!");
      return;
  }
  if (this.senha.trim() != "123")
  {
      this.showAlert("Senha inválida!");
      return;
  }
   
  var mensagem = await this.montarTela(2);

  if (mensagem == "")
     this.navCtrl.push("ListarPage", {usuario:this.usuario.trim(),
                                   disciplina: this.DisciplinasAluno,
                                   titulo: "Pesquisa Provider Post" });
  else
     this.showAlert(mensagem);

                                   
}


  showAlert(mensagem) {
    let alert = this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }


  async montarTela(origem)
  {
         
    this.DisciplinasAluno = new Array<Disciplina>();

    let resultado : any;
    if (origem == 1)
       resultado = await this.getDisciplinas(this.usuario);
    else
       resultado = await this.getDisciplinasPost(this.usuario);

    let autenticado = resultado.Autenticado;
    let mensagem = resultado.MensagemDeErro;
     

    if (autenticado == "S")
    {
        this.retorno = resultado.DisciplinasAluno;
        
        this.DisciplinasAluno = new Array<Disciplina>();

        for (let i = 0; i < this.retorno.length ; i++)
        {
            
            var disciplina = new Disciplina();

            disciplina.codTurma = this.retorno[i].CodTurma.toString();
            disciplina.disciplina = this.retorno[i].Disciplina.toString();
            disciplina.matricula = this.retorno[i].Matricula.toString();
            disciplina.nome  = this.retorno[i].Nome.toString();

            this.DisciplinasAluno.length = this.DisciplinasAluno.length + 1;
            this.DisciplinasAluno[i] = disciplina;

        } 
    }
    return mensagem;
  }

  async getDisciplinas(usuario: string) {
    
    return new Promise((resolve, reject) => {
    this.rest.getDisciplinas(usuario)
     .subscribe(
           data => { 
               resolve(data);                 
           },
           error => {
             let erro = <any>error;
             reject(error);
             this.showAlert(erro);           
           });
         }
       );
   }

   async getDisciplinasPost(usuario: string) {
    
    return new Promise((resolve, reject) => {
    this.rest.getDisciplinasPost(usuario)
     .subscribe(
           data => { 
               //this.retorno = data.DisciplinasAluno;
               resolve(data);                 
           },
           error => {
             let erro = <any>error;
             reject(error);
             this.showAlert(erro);           
           });
         }
       );
   }

}
