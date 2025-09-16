export interface Task {
  id?: number;
  titulo: string;
  descricao: string;
  dataLimite: string; // ISO format
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  responsavel: string;
}
