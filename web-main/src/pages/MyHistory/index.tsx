import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  CircularProgress,
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
import { Historico } from '../../models/history';

const MyHistory: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [historicos, setHistoricos] = useState<Historico[]>([]);

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
    setLoading(true);

    async function getMyHistory() {
      try {
        const response = await api.get('/historico/me/1');
        setHistoricos(response.data);
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
      <Typography variant="h4" component="h1" className={classes.title}>
        MEU HISTÓRICO
      </Typography>

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
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '2%' }}>
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
                      <TableRow hover role="checkbox" tabIndex={-1}>
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
                          {row.status}
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
