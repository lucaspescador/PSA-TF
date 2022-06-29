interface Column {
  id: any;
  label: string;
  minWidth?: number;
  align?: 'right';
}

export const columns: readonly Column[] = [
  { id: 'disciplina', label: 'Disciplina', minWidth: 250 },
  { id: 'codigo', label: 'Código', minWidth: 170 },
  { id: 'turma', label: 'Turma', minWidth: 170 },
  { id: 'creditos', label: 'Créditos', minWidth: 170 },
  { id: 'periodo', label: 'Período', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'nota', label: 'Nota', minWidth: 80 },
];
