import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Se tiene que importar los requisitos para que funcione la API de DolarToday (HTTP-XXXX)

@Injectable({
  providedIn: 'root'
})
export class DolartodayService {


  private REST_API_SERVER = "https://s3.amazonaws.com/dolartoday/data.json" //Aquí se coloca la página donde se está extrayendo la información requerida

  constructor(private httpClient: HttpClient) { } //Se coloca en en constructor el HTTP que se vaya a usar 

  public getDolarToday(){ //Función que extrae la data de la página web de la API
    return this.httpClient.get(this.REST_API_SERVER); 
  }
}
