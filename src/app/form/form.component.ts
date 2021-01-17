import { Component, OnInit } from '@angular/core';
import { Client } from '../Interface/client';
import { ClientsService } from "../service/clients.service";
import { City } from '../Interface/city';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  cities: City[];
  client: Client = {
    name: null,
    phone: null,
    city: null,
    id_city: null
  };
  id: any;
  editing: boolean = false;
  url: any;
  constructor(private clientService: ClientsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.url = this.activatedRoute.snapshot.url[0].path;
    console.log(this.url)
    if(this.id){
      this.editing = true;
      this.clientService.getClient(this.id,this.url).subscribe((data: Client) => {
        this.client = data;
      }, (error) => {
        alert('Ocurrio un error!') ;
      });
    }else{
      this.editing = false;
    }
    this.clientService.getCities().subscribe((data: City[]) => {
      this.cities = data;
    });
  }

  ngOnInit(): void {
  }
  saveClient(){
    if(this.editing){
      this.url = 'client';
      this.clientService.put(this.client,this.url).subscribe((data) => {
        alert(data);
        this.router.navigate(['/clients']);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error!') ;
      });
    }else{
      this.clientService.save(this.client,this.url).subscribe((data) => {
        alert(data);
        this.router.navigate(['/clients']);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error!') ;
      });
    }
  }

}
