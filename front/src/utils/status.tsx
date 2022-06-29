import React from 'react';
import { Chip } from '@mui/material';
import { green, red, yellow } from '@mui/material/colors';

export const getStatusChip = (status: string) => {
  switch (status) {
    case 'CURSANDO':
      return (
        <Chip
          label="Cursando"
          style={{ background: yellow[700], color: '#fff', fontWeight: 'bold' }}
        />
      );
    case 'APROVADO':
      return (
        <Chip
          label="Aprovado"
          style={{ background: green[700], color: '#fff', fontWeight: 'bold' }}
        />
      );
    case 'REPROVADO':
      return (
        <Chip
          label="Reprovado"
          style={{ background: red[700], color: '#fff', fontWeight: 'bold' }}
        />
      );

    default:
      return null;
  }
};
