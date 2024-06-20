import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    empresaIsOpen: false,
    facturaIsOpen: false,
    chequeIsOpen: false,
    creditoIsOpen: false,
    debitoIsOpen: false,
    ticketIsOpen: false
  }),

  actions: {
    toggleEmpresa() {
      this.empresaIsOpen = !this.empresaIsOpen
      console.log(`Empresa: ${this.empresaIsOpen}`);
    },
    toggleFactura() {
      this.facturaIsOpen = !this.facturaIsOpen
    },
    toggleCheque() {
      this.chequeIsOpen = !this.chequeIsOpen
    },
    toggleCredito() {
      this.creditoIsOpen = !this.creditoIsOpen
    },
    toggleDebito() {
      this.debitoIsOpen = !this.debitoIsOpen
      console.log(`Debito: ${this.debitoIsOpen}`);
    },
    toggleTicket() {
      this.ticketIsOpen = !this.ticketIsOpen
    }
  }
})
