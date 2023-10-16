import { Box, Button, Card, Typography, TextField } from '@mui/material';
import { Form } from '@remix-run/react';

interface Props {
  cityName: string;
  description: string;
  imagePath: string;
  temperature: string;
  humidity: string;
  precipitation: string;
}

export default function WeatherDetails({ ...props }: Props) {
  const {
    cityName,
    description,
    imagePath,
    temperature,
    humidity,
    precipitation,
  } = props;
  return (
    <Form method='post'>
      <Card sx={{ maxWidth: '500px', padding: 3, boxSizing: 'border-box' }}>
        <Form method='post' id='addFav'>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5'>{cityName}</Typography>
            <img src={imagePath} alt='Weather data by WeatherAPI.com'></img>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='body1'>
              Current Weather: {description}
            </Typography>
            <Typography variant='body1'>
              Temperature: {temperature} C°
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='body1'>{humidity}</Typography>
            <Typography variant='body1'>{precipitation}</Typography>
          </Box>
          <Button
            name='_action'
            value='add'
            id={cityName}
            type='submit'
            variant='contained'
            color='primary'
          >
            Add
          </Button>
        </Form>
      </Card>
    </Form>
  );
}
