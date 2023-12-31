import { Box, Button } from '@mui/material';

import TextInput from '~/components/TextInput';
import { Form } from '@remix-run/react';

export default function WeatherSearch() {
  return (
    <Form method='post' id='search-form' action='/home-page'>
      <Box
        sx={{
          display: 'flex',
          width: '30%',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <TextInput id={'city'} label={'Search'} name={'city'} />
        <Button type='submit' variant='contained' color='primary'>
          Search
        </Button>
      </Box>
    </Form>
  );
}
