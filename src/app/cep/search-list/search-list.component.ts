import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddressWithDate } from '../../_interfaces/address.interface';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  @Input() 
  set addresses(value: AddressWithDate[]) {
    if (value) {
      this._addresses = value.map(addr => ({
        ...addr,
        searchDate: addr.searchDate || new Date()
      }));
    }
  }
  get addresses(): AddressWithDate[] {
    return this._addresses;
  }

  @Output() delete = new EventEmitter<AddressWithDate>();

  private _addresses: AddressWithDate[] = [];

  getFullAddress(address: AddressWithDate): string {
    const parts = [
      address.logradouro,
      address.complemento,
      address.bairro,
      `${address.localidade} - ${address.uf}`
    ];
    return parts.filter(part => part).join(', ');
  }

  onDelete(address: AddressWithDate): void {
    this.delete.emit(address);
  }
}
