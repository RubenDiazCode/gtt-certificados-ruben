import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserJira, Certificate } from './models.interface';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class ApiService {

  public baseurl = 'https://localhost:44346';

  jwt: any;
  dataUser: any;

  //control del registro por el backend
  register(username, password, email) {
    const body = { username, password, email };
    console.log(body);
    return this.http.post('/api/users', body).toPromise();

  }
  //control del login por el back

  login(username, password) {
    const body = { username, password };
    console.log("user a loguear "+body.username+" pass:"+body.password);
    return this.http.post('/api/auth', body)
      .toPromise();
  }
  //cargar user de jira loggeado
  getUserJiraData() {
    return this.http.get('/api/jira/' + localStorage.getItem('id')).toPromise();
  }
  //obtener la id del user loggeado
  getIdLoggedUser() {
    return localStorage.getItem('id');
  }

  //obtiene la id del jira del usuario loggeado
  getJiraIDLoggedUser() {
    return localStorage.getItem('idJira');
  }
  //guardar user editado de jira en el back 
  editJiraUser(userJira: UserJira){
    return this.http.put('/api/jira/'+localStorage.getItem('idJira'),userJira).toPromise();
  }
  //crear user de jira en el back
  addJiraUser(userjira){
    return this.http.post('/api/jira/',userjira).toPromise();
  }

  //cargar certificado en back
  addCertificate(cert: Certificate, ficheroBase64: any)
  {
    cert.fichero_base_64 = ficheroBase64;
    return this.http.post('/api/certificates',cert).toPromise();
  }


  constructor(private http: HttpClient) { }
}
