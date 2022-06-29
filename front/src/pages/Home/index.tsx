import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { Check, Login, Receipt, Cancel } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import useStyles from './styles';
import { Turma } from '../../models/class';
import { Historico } from '../../models/history';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import { getStatusButton } from '../../utils/buttons';

const Home: React.FC = () => {
  const classes = useStyles();
  const { token } = useAuth();
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [open, setOpen] = useState(false);
  const [historico, setHistorico] = useState<Historico[] | null>(null);
  const [comprovante, setComprovante] = useState<Historico[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    nome: '',
    codigo: '',
    horarios: '',
  });

  const handleNome = (evt: any) => {
    setFilters({
      ...filters,
      nome: evt.target.value,
    });
  };

  const handleCodigo = (evt: any) => {
    setFilters({
      ...filters,
      codigo: evt.target.value,
    });
  };

  const handleHorario = (evt: any) => {
    setFilters({
      ...filters,
      horarios: evt.target.value,
    });
  };

  const handleOpen = useCallback(async () => {
    setLoading(true);
    try {
      const comprovanteResponse = await api.get(`/historico/me/comprovante`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComprovante(comprovanteResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  }, [token]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMatricula = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await api.post(
          `/turmas/${id}/matricula`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const historyResponse = await api.get('/historico/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistorico(historyResponse.data);

        const turmasResponse = await api.get('/turmas', {
          params: filters,
        });
        setTurmas(turmasResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const handleCancelarMatricula = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        await api.delete(`/turmas/${id}/matricula`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const historyResponse = await api.get('/historico/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistorico(historyResponse.data);

        const comprovanteResponse = await api.get('/historico/me/comprovante', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComprovante(comprovanteResponse.data);

        const turmasResponse = await api.get('/turmas', {
          params: filters,
        });
        setTurmas(turmasResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  const renderActionButtons = useCallback(
    (turma: Turma) => {
      if (!token || !historico) {
        return (
          <Button startIcon={<Login />} variant="contained" disabled>
            Entre para se matricular
          </Button>
        );
      }

      const historicoIdx = historico.findIndex((h) => h.turma.id === turma.id);

      if (historicoIdx > -1) {
        return getStatusButton(
          historico[historicoIdx].status,
          handleCancelarMatricula,
          turma.id,
        );
      }

      return (
        <Button onClick={() => handleMatricula(turma.id)} variant="contained">
          Matricular-se
        </Button>
      );
    },
    [token, historico],
  );

  useEffect(() => {
    setLoading(true);

    async function getTurmas() {
      try {
        const response = await api.get('/turmas', {
          params: filters,
        });
        setTurmas(response.data);

        if (token) {
          const historyResponse = await api.get('/historico/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setHistorico(historyResponse.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getTurmas();
  }, [filters, token]);

  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        className={classes.title}
        align="center"
      >
        TURMAS
      </Typography>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack
        component="form"
        sx={{
          width: '100%',
          marginTop: '1%',
          borderRadius: '5px',
          marginBottom: '2%',
          background: 'white',
          padding: '1%',
        }}
        direction="row"
        justifyContent="center"
        spacing={2}
        noValidate
        autoComplete="on"
      >
        <TextField
          hiddenLabel
          type="text"
          name="nome"
          onChange={(e) => handleNome(e)}
          placeholder="Nome. Ex.: Turma 128"
          variant="outlined"
          sx={{ width: '33%' }}
        />
        <TextField
          hiddenLabel
          type="text"
          name="code"
          onChange={(e) => handleCodigo(e)}
          placeholder="Código da Disciplina. Ex.: 4611C-06"
          variant="outlined"
          sx={{ width: '33%' }}
        />
        <TextField
          hiddenLabel
          type="text"
          name="time"
          onChange={(e) => handleHorario(e)}
          placeholder="Horários. Ex.: 2AB"
          variant="outlined"
          sx={{ width: '33%' }}
        />

        <Button
          startIcon={<Receipt />}
          onClick={() => handleOpen()}
          variant="contained"
        >
          Comprovante de Matrícula
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Comprovante de Matrícula
        </DialogTitle>

        <DialogContent>
          <Grid item xs={12} md={6}>
            <List dense>
              {comprovante?.map((comprovanteItem: Historico) => (
                <>
                  {/* prettier-ignore */}
                  <ListItem
                    key={comprovanteItem.id}
                    secondaryAction={(
                      <>
                        <Tooltip title="Cancelar matrícula">
                          <IconButton edge="end" aria-label="delete" onClick={() => handleCancelarMatricula(comprovanteItem.turma.id)}>
                            <Cancel style={{ color: red[600] }} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: green[600] }}>
                        <Check />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={comprovanteItem.turma.disciplina.nome}
                      secondary={`${comprovanteItem.turma.nome} - ${comprovanteItem.turma.ano}/${comprovanteItem.turma.semestre} - ${comprovanteItem.turma.horarios}`}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>

      <div className={classes.divider}>
        <Divider />
      </div>

      {!loading && turmas.length === 0 && (
        <Typography variant="h6" align="center" color="text.secondary">
          <b>Nenhum resultado encontrado :(</b>
        </Typography>
      )}

      {!loading && turmas.length > 0 && (
        <div className={classes.root}>
          {turmas.map((item: Turma) => (
            <Card key={item.id} className={classes.card} sx={{ maxWidth: 340 }}>
              <CardHeader
                title={item.nome}
                subheader={`${item.disciplina.nome} (${item.disciplina.codigo})`}
              />

              <CardContent>
                <Typography variant="h6" color="text.secondary">
                  <b>{`Vagas restantes: ${item.vagas - item.matriculados}`}</b>
                </Typography>
              </CardContent>

              <CardContent>
                <Divider />

                <Typography align="center">
                  {`Período: ${item.ano}/${item.semestre}`}
                </Typography>

                <Divider />

                <Typography align="center">
                  {`Horários: ${item.horarios.join(' - ')}`}
                </Typography>

                <Divider />

                <Typography align="center">
                  {`Créditos: ${item.disciplina.creditos}`}
                </Typography>
                <Divider />
              </CardContent>

              <CardActions style={{ justifyContent: 'center' }}>
                {renderActionButtons(item)}
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
