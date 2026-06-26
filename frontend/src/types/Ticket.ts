export interface Ticket {
  id: number;
  origem: string;
  destino: string;
  data: string;
  hora: string;
  aeroporto: string;
  assento: string | null;
  passageiro: string | null;
}