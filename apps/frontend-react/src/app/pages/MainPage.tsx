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

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    getData(languagesIdsFilter);
  }, [languagesIdsFilter]);

  const getData = (languageIdsFilter?: string[]) => {
    // Get filtered lecturers with the relation/join of "languages"
    lecturersApiService
      .getAll(['languages'], languageIdsFilter)
      .then(setLecturers);

    // Get all languages
    languagesApiService.getAll().then(setLanguages);
  };

  const renderObjectsConfig = {
    languages: (languages: Language[]) => {
      const array = languages.map((lang) => lang.name);
      return <span>{array.toString()}</span>;
    },
  };

  const onLecturerCreate = async (lecturer: Lecturer) => {
    try {
      await lecturersApiService.create(lecturer);
      setIsModalOpen(false);
      resetFilterState();
      getData();
    } catch (error) {
      // Alert user with the appropriate error message from the backend
      console.log(error);
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
  };

  const onRowClick = (row: Lecturer) => {
    setIsAlertOpen(true);
    setSelectedRow(row);
  };

  const onLecturerDelete = async () => {
    setIsAlertOpen(false);

    if (!selectedRow?.id) return;

    try {
      await lecturersApiService.delete(selectedRow.id);
      resetFilterState();
      getData();
    } catch (error) {
      // Notify user with the server returned error
      console.error(error);
    }
  };

  const resetFilterState = () => {
    setLanguagesIdsFilter([]);
    setLanguagesSelection([]);
  };

  return (
    <Container>
      <Typography variant={isSmallScreen ? 'h4' : 'h3'} sx={{ m: 2, mt: 4 }}>
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
          <Button onClick={onSelectionClear}>Clear Filter</Button>
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

      <Box>
        {lecturers.length} results
      </Box>
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
    </Container>
  );
};
