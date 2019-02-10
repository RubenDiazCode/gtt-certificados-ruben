import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User, UserJira } from '../models.interface';

@Component({
  selector: 'app-vista-jira',
  templateUrl: './vista-jira.component.html',
  styleUrls: ['./vista-jira.component.scss']
})
export class VistaJiraComponent implements OnInit {
  idJira: any;
  username;
  password;
  url;
  project;
  component;
  user_id;
  issue;
  userJira: any;
  userJira2: UserJira;
  editar = false;

  editarOGuardar() {
    if (this.editar) {
      this.editarUser();
    } else {
      this.guardarUser();
      
    }
  }


  constructor(private api: ApiService) { }
  //metodo que guarda el user si no hay
  guardarUser() {
    this.userJira = {
    
      user_id: parseInt(localStorage.getItem('id')),
      username: this.username,
      password: this.password,
      url: this.url,
      project: this.project,
      issue: this.issue,
      component: this.component
  
    }
    console.log("estoy en el (post) ");
    console.log(this.userJira);
    this.api.addJiraUser(this.userJira)
    .then((res:any)=>{
      console.log(res);
      this.editar = true;
    }).catch(err=>{
      console.log("estoy en el catch ");
      console.log(err);
    })

  }
  //metodo que edita el user de jira
  editarUser() {
    //montamos el user de jira
    this.userJira = {
      id: parseInt(localStorage.getItem('idJira')),
      username: this.username,
      password: this.password,
      url: this.url,
      project: this.project,
      component: this.component,
      issue: this.issue,
      user_id: localStorage.getItem('id')
    }
    console.log("user a subir a la bbdd (put) " + this.userJira);
    //llamamos a la api para subir al back
    this.api.editJiraUser(this.userJira).then((res: any) => {
      console.log("llamando a la api " + res);
    })


  }

  ngOnInit() {
    this.idJira = this.api.getIdLoggedUser();
    console.log("id de usuario a cargar el jira" + this.idJira);

    this.api.getUserJiraData().then((res: any) => {
      if (res !== null) {
        this.username = res.username;
        this.password = res.password;
        this.url = res.url;
        this.project = res.project;
        this.component = res.component;

        //cambiamos la bandera para que sepa que hay que editar
        this.editar = true;
        console.log("id jira a guardar: " + res.id);
        localStorage.setItem('idJira', res.id);
      }

    });




  }

}
