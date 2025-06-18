import { Injectable } from "@angular/core";
import { AddressWithDate } from "../_interfaces/address.interface";

@Injectable({ providedIn: "root" })
export class CepStorageService {
  private readonly STORAGE_KEY = "cep_addresses";

  saveAddresses(addresses: AddressWithDate[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(addresses));
    } catch (error) {
      console.error("Erro ao salvar endereços:", error);
    }
  }

  loadAddresses(): AddressWithDate[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const addresses = JSON.parse(data);
      return addresses.map((addr: AddressWithDate) => ({
        ...addr,
        searchDate: new Date(addr.searchDate),
      }));
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
      return [];
    }
  }

  clearAddresses(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Erro ao limpar endereços:", error);
    }
  }

  addAddress(address: AddressWithDate): AddressWithDate[] {
    const addresses = this.loadAddresses();
    const exists = addresses.some(
      (addr) => addr.cep.replace(/\D/g, "") === address.cep.replace(/\D/g, "")
    );

    if (!exists) {
      addresses.unshift(address);
      this.saveAddresses(addresses);
    }

    return addresses;
  }
}
