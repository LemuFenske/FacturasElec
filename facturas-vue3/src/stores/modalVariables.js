import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    empresaIsOpen: false,
    facturaIsOpen: false,
    chequeIsOpen: false,
    creditoIsOpen: false,
    debitoIsOpen: false,
    ticketIsOpen: false,
    empresaEditIsOpen: false,
    facturaEditIsOpen: false,
    chequeEditIsOpen: false,
    creditoEditIsOpen: false,
    debitoEditIsOpen: false,
    ticketEditIsOpen: false,
    chequeToEdit: null,
    facturaToEdit: null,
    empresaToEdit: null,
    creditoToEdit: null,
    debitoToEdit: null,
    ticketToEdit: null
  }),

  actions: {
    toggleEmpresa() {
      this.empresaIsOpen = !this.empresaIsOpen;
      console.log(`Empresa: ${this.empresaIsOpen}`);
    },
    toggleFactura() {
      this.facturaIsOpen = !this.facturaIsOpen;
    },
    toggleCheque() {
      this.chequeIsOpen = !this.chequeIsOpen;
    },
    toggleCredito() {
      this.creditoIsOpen = !this.creditoIsOpen;
    },
    toggleDebito() {
      this.debitoIsOpen = !this.debitoIsOpen;
      console.log(`Debito: ${this.debitoIsOpen}`);
    },
    toggleTicket() {
      this.ticketIsOpen = !this.ticketIsOpen;
    },
    toggleEmpresaEdit() {
      this.empresaEditIsOpen = !this.empresaEditIsOpen;
    },
    toggleFacturaEdit() {
      this.facturaEditIsOpen = !this.facturaEditIsOpen;
    },
    toggleChequeEdit() {
      this.chequeEditIsOpen = !this.chequeEditIsOpen;
    },
    toggleCreditoEdit() {
      this.creditoEditIsOpen = !this.creditoEditIsOpen;
    },
    toggleDebitoEdit() {
      this.debitoEditIsOpen = !this.debitoEditIsOpen;
    },
    toggleTicketEdit() {
      this.ticketEditIsOpen = !this.ticketEditIsOpen;
    },
    setChequeToEdit(cheque) {
      this.chequeToEdit = cheque;
    },
    setFacturaToEdit(factura) {
      this.facturaToEdit = factura;
    },
    setEmpresaToEdit(empresa) {
      this.empresaToEdit = empresa;
    },
    setCreditoToEdit(credito) {
      this.creditoToEdit = credito;
    },
    setDebitoToEdit(debito) {
      this.debitoToEdit = debito;
    },
    setTicketToEdit(ticket) {
      this.ticketToEdit = ticket;
    }
  }
});
