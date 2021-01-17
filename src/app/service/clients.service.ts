import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../Interface/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  API_ENDPOINT = 'http://localhost:8000/api/';
  constructor(private httpClient: HttpClient) { }
  getClients(url){
    return this.httpClient.get(this.API_ENDPOINT + url);
  }
  getCities(){
    return this.httpClient.get(this.API_ENDPOINT + 'getCities');
  }
  getClient(client,url){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.get(this.API_ENDPOINT + url + '/' + client, {headers: headers});
  }
  save(client: Client, url){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.post(this.API_ENDPOINT + url, client, {headers: headers});
  }
  put(client, url){
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpClient.put(this.API_ENDPOINT + url + '/' + client.id, client, {headers: headers});
  }
  delete(id, url){
    return this.httpClient.delete(this.API_ENDPOINT + url +'/' + id);
  }
}
