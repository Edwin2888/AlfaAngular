import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../Interface/client';
import { ClientsService } from "../service/clients.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clients: Client[];
  url: any;
  constructor(private clientService: ClientsService, private activatedRoute: ActivatedRoute) {
    this.url = this.activatedRoute.snapshot.url[0].path;
    // console.log(this.url);
    this.getClients(this.url);
  }
  getClients(url){
    this.clientService.getClients(url).subscribe((data: Client[]) => {
      this.clients = data;
      // console.log(this.clients);
    },(error) => {
      alert('Error al cargar los datos');
    });
  }

  ngOnInit(): void {
  }

  delete(id){
    if(confirm('¿Realmente deseas eliminar el registro?')){
      this.clientService.delete(id, this.url).subscribe((data) => {
        alert(data);
        this.getClients(this.url);
      }, (error) => {
        alert('Hubo un problema');
      });
    }
  }
}
