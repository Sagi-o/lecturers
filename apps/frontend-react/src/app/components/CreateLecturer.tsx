import { Lecturer } from '@lecturers/shared-models';
import { Grid } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DEFAULT_VALUE: Lecturer = {
  name: '',
  email: '',
  languages: [],
};

interface CreateLecturerProps {
  onCreate: (lecturer: Lecturer) => void | Promise<void>;
}

export const CreateLecturer: FunctionComponent<CreateLecturerProps> = ({
  onCreate,
}) => {
  const [lecturer, setLecturer] = useState<Lecturer>(DEFAULT_VALUE);

  const onInputChange = (key: keyof Lecturer, value: string | string[]) => {
    setLecturer((lecturer) => ({ ...lecturer, [key]: value }));
  };

  return (
    <Grid container spacing={2} sx={containerStyle}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          New Lecturer
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Name"
          value={lecturer.name}
          onChange={({ target: { value } }) => onInputChange('name', value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          value={lecturer.email}
          onChange={({ target: { value } }) => onInputChange('email', value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="e.g. NodeJS,Python"
          value={lecturer.languages}
          onChange={({ target: { value } }) =>
            onInputChange('languages', value.split(','))
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onCreate(lecturer)}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
