import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { columns } from './columns';
import useStyles from './styles';

import api from '../../services/api';
import { Historico, Rendimento } from '../../models/history';
import { useAuth } from '../../hooks/Auth';
import { getStatusChip } from '../../utils/status';

const MyHistory: React.FC = () => {
  const classes = useStyles();
  const { token } = useAuth();

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const [rendimento, setRendimento] = useState<Rendimento>({} as Rendimento);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    async function getMyHistory() {
      try {
        const response = await api.get('/historico/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistoricos(response.data);

        const statResponse = await api.get('/historico/me/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRendimento(statResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getMyHistory();
  }, []);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        className={classes.title}
        align="center"
      >
        MEU HISTÓRICO
      </Typography>

      <div className={classes.divider}>
        <Divider />
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {!loading && historicos.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          <b>Nenhum resultado encontrado :(</b>
        </Typography>
      )}

      {!loading && historicos.length > 0 && (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '1%' }}>
          <Typography variant="h5" component="h1" align="right" padding={2}>
            {`Rendimento: ${rendimento.rendimento * 100}%`}
          </Typography>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow
                  sx={{
                    '& th': {
                      color: '#fff',
                      backgroundColor: '#3f69ab',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {historicos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell key={`${row.id}-disciplina`}>
                          {row.turma.disciplina.nome}
                        </TableCell>
                        <TableCell key={`${row.id}-codigo`}>
                          {row.turma.disciplina.codigo}
                        </TableCell>
                        <TableCell key={`${row.id}-nome`}>
                          {row.turma.nome}
                        </TableCell>
                        <TableCell key={`${row.id}-creditos`}>
                          {row.turma.disciplina.creditos}
                        </TableCell>
                        <TableCell key={`${row.id}-periodo`}>
                          {`${row.turma.ano}/${row.turma.semestre}`}
                        </TableCell>
                        <TableCell key={`${row.id}-status`}>
                          {getStatusChip(row.status)}
                        </TableCell>
                        <TableCell key={`${row.id}-nota`}>
                          {row.nota || '--'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={historicos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  );
};

export default MyHistory;
