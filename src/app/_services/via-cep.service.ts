import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../_interfaces/address.interface';


@Injectable()
export class ViaCepService {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  consultarCep(cep: string): Observable<Address> {
    const cepLimpo = cep.replace(/\D/g, '');
    return this.http.get<Address>(`${this.baseUrl}/${cepLimpo}/json`);
  }
}
