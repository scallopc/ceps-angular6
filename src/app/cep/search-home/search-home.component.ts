import { Component, OnInit } from '@angular/core';
import { ViaCepService } from '../../_services/via-cep.service';
import { AddressWithDate } from '../../_interfaces/address.interface';
import { CepStorageService } from '../../_services/localStorage.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
  breadcrumbs = [
    { label: 'Busca de Endereços', url: '/search-cep' }
  ];

  addresses: AddressWithDate[] = [];
  hasError = false;
  showDuplicateToast = false;

  constructor(
    private viaCepService: ViaCepService,
    private storage: CepStorageService
  ) {}

  ngOnInit() {
    this.addresses = this.storage.loadAddresses();
  }

  onSearchCep(cep: string): void {
    this.hasError = false;
    this.showDuplicateToast = false;

    const cleanCep = cep.replace(/\D/g, '');
    const exists = this.addresses.some(addr => addr.cep.replace(/\D/g, '') === cleanCep);
    if (exists) {
      this.showDuplicateToast = true;
      return;
    }

    this.viaCepService.consultarCep(cep).subscribe({
      next: (result) => {
        if (result.erro) {
          this.hasError = true;
        } else {
          const newAddress: AddressWithDate = { ...result, searchDate: new Date() };
          this.addresses = this.storage.addAddress(newAddress);
        }
      },
      error: () => {
        this.hasError = true;
      }
    });
  }

  onDeleteAddress(address: AddressWithDate): void {
    const index = this.addresses.findIndex(a => a.cep === address.cep);
    if (index !== -1) {
      this.addresses.splice(index, 1);
      this.storage.saveAddresses(this.addresses);
    }
  }
}
