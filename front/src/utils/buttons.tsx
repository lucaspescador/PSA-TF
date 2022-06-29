import React from 'react';
import { Button } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { Check, Close } from '@mui/icons-material';

export const getStatusButton = (status: string, func: any, turmaId: number) => {
  switch (status) {
    case 'CURSANDO':
      return (
        <>
          <Button
            startIcon={<Check />}
            style={{ background: green[400], color: '#f4f4f4' }}
            disabled
            variant="contained"
          >
            Matriculado
          </Button>
          <Button
            startIcon={<Close />}
            style={{ background: red[500] }}
            variant="contained"
            onClick={() => func(turmaId)}
          >
            Cancelar
          </Button>
        </>
      );
    case 'APROVADO':
      return (
        <Button
          startIcon={<Check />}
          style={{ background: green[300], color: '#f4f4f4' }}
          disabled
          variant="contained"
        >
          Já cursada
        </Button>
      );

    case 'REPROVADO':
      return (
        <Button
          startIcon={<Close />}
          style={{ background: red[300], color: '#f4f4f4' }}
          disabled
          variant="contained"
        >
          Reprovado
        </Button>
      );
    default:
      return null;
  }
};
