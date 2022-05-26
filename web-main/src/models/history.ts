export interface Historico {
  id: number;
  nota?: number;
  status: string;
  aluno: Aluno;
  turma: Turma;
  criado_em: string;
  atualizado_em: string;
}

interface Turma {
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

interface Aluno {
  id: number;
  nome: string;
  email: string;
  role: string;
  criado_em: string;
  atualizado_em: string;
}
