import { Container } from '@mui/system';
import { FunctionComponent, useEffect, useState } from 'react';
import { Language, Lecturer } from '@lecturers/shared-models';
import {
  languagesApiService,
  lecturersApiService,
} from '@lecturers/data-access';
import { MuiTable, TableHeadConfig } from '../components/MuiTable';
import {
  Typography,
  Paper,
  Box,
  Button,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { CreateLecturer } from '../components/CreateLecturer';
import { MultipleSelect } from '../components/MultipleSelect';

const tableHead: TableHeadConfig<Lecturer> = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'languages',
    label: 'Languages',
  },
];

const API_RESPONSE_DELAY_MILLIS = 250;

const SNACKBAR_TEXT = {
  CREATE_LECTURER_SUCCESS: 'Lecturer created successfully',
  DELETE_LECTURER_SUCCESS: 'Lecturer deleted successfully',
  CLEAR_FILTER_SUCCESS: 'Filter cleared',
};

export const MainPage: FunctionComponent = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedRow, setSelectedRow] = useState<Lecturer>();

  // Used for server-side filtering, languageIds will be sent to the server with the format:
  // "languageIds=NodeJS,Angular", the server will return filtered results
  const [languagesIdsFilter, setLanguagesIdsFilter] = useState<string[]>([]);
  const [languagesSelection, setLanguagesSelection] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchData(languagesIdsFilter);
  }, [languagesIdsFilter]);

  const fetchData = (languageIdsFilter?: string[]) => {
    setIsLoading(true);

    // Get filtered lecturers with the relation/join of "languages"
    const getLecturers = lecturersApiService.getAll(
      ['languages'],
      languageIdsFilter
    );

    // Get all languages
    const getLanguages = languagesApiService.getAll();

    Promise.all([getLecturers, getLanguages])
      .then(([lecturers, languages]) => {
        // Mimic API call response delay
        setTimeout(() => {
          setIsLoading(false);
          setLecturers(lecturers);
          setLanguages(languages);
        }, API_RESPONSE_DELAY_MILLIS);
      })
      .catch((error) => {
        setIsLoading(false);

        // Alert user with the appropriate error message from the backend
        console.error(error);
      });
  };

  const onLecturerCreate = async (lecturer: Lecturer) => {
    try {
      await lecturersApiService.create(lecturer);
      setIsModalOpen(false);
      resetFilterState();
      setSnackbarText(SNACKBAR_TEXT.CREATE_LECTURER_SUCCESS);
    } catch (error) {
      // Alert user with the appropriate error message from the backend
      console.log(error);
    }
  };

  const onLecturerDelete = async () => {
    setIsAlertOpen(false);

    if (!selectedRow?.id) return;

    try {
      await lecturersApiService.delete(selectedRow.id);
      resetFilterState();
      setSnackbarText(SNACKBAR_TEXT.DELETE_LECTURER_SUCCESS);
    } catch (error) {
      // Alert user with the appropriate error message from the backend
      console.error(error);
    }
  };

  const onSelectionChange = (selection: string[]) => {
    const filteredLanguages = languages.filter((language) =>
      selection.includes(language.name)
    );

    const languageIds = filteredLanguages
      .map(({ id }) => id)
      .filter(Boolean) as string[];

    setLanguagesIdsFilter(languageIds);
    setLanguagesSelection(selection);
  };

  const onSelectionClear = () => {
    resetFilterState();
    setSnackbarText(SNACKBAR_TEXT.CLEAR_FILTER_SUCCESS);
  };

  const onRowClick = (row: Lecturer) => {
    setIsAlertOpen(true);
    setSelectedRow(row);
  };

  const onSnackbarClose = () => {
    setSnackbarText('');
  };

  const resetFilterState = () => {
    setLanguagesIdsFilter([]);
    setLanguagesSelection([]);
  };

  const renderObjectsConfig = {
    languages: (languages: Language[]) => {
      const languageNames = languages.map(({ name }) => name);
      return <span>{languageNames.toString()}</span>;
    },
  };

  return (
    <Container>
      <Typography
        variant={isSmallScreen ? 'h4' : 'h3'}
        sx={{ mb: 2, mt: 4, ml: 0 }}
      >
        Lecturers
      </Typography>

      {/* Languages Filter */}
      <Paper sx={{ my: 4, p: 2 }}>
        <Box sx={{ mb: 2 }}>Filter by Language</Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          <MultipleSelect
            isControlled
            controlledSelection={languagesSelection}
            width={isSmallScreen ? 260 : 340}
            label={'Select'}
            values={languages.map((lang) => lang.name)}
            onChange={onSelectionChange}
          />
          <Button
            disabled={!languagesSelection?.length}
            onClick={onSelectionClear}
          >
            Clear Filter
          </Button>
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ my: 2 }}
          variant="outlined"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Lecturer
        </Button>

        <Box>{lecturers.length} results</Box>
      </Box>

      {/* Lecturers Table */}
      <Paper>
        <MuiTable
          tableHead={tableHead}
          tableRows={lecturers}
          renderObjectsConfig={renderObjectsConfig}
          onRowClick={onRowClick}
        />
      </Paper>

      {/* New Lecturer Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <CreateLecturer onCreate={onLecturerCreate} />
        </Box>
      </Modal>

      {/* Delete Row Dialog */}
      <Dialog
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Do you want to remove this row?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Lecturer "{selectedRow?.name}" will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
          <Button onClick={onLecturerDelete}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={!!snackbarText}
        autoHideDuration={5000}
        onClose={onSnackbarClose}
        message={snackbarText}
      />

      {/* Loading Spinner */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};
