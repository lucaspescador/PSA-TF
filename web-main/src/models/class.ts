export interface Turma {
  id: number;
  nome: string;
  disciplina: Disciplina;
  ano: number;
  semestre: number;
  vagas: number;
  horarios: string[];
  criado_em: string;
  atualizado_em: string;
}

interface Disciplina {
  id: number;
  codigo: string;
  nome: string;
  creditos: number;
  criado_em: string;
  atualizado_em: string;
}
