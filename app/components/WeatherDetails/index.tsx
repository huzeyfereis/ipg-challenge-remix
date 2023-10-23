import { Button, Card, Typography, TextField } from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

interface Props {
  id?: string;
  cityName: string;
  description: string;
  imagePath: string;
  temperature: number;
  humidity: number;
  precipitation: number;
  isFavorited: boolean;
  cityAmount?: number;
  // addFav?: () => void;
  // removeFav?: (e: any) => any;
}

export default function WeatherDetails(props: Props) {
  const {
    id,
    cityName,
    description,
    imagePath,
    temperature,
    humidity,
    precipitation,
    isFavorited,
    cityAmount,
  } = props;

  const fetcher = useFetcher();

  const addFavoriteHandler = () => {
    if (cityAmount >= 5) {
      alert('You can not add more than 5 city!');
    }
  };

  const deleteFavoritedCityHandler = () => {
    const proceed = confirm('Are you sure? Do you want to delete this item?');
    if (!proceed) {
      return;
    }
    fetcher.submit(null, { method: 'delete', action: '/home-page' });
  };

  return (
    <Form method='post' name='city'>
      <Card
        key={id}
        sx={{
          padding: 2,
          boxSizing: 'border-box',
          boxShadow: 3,
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <TextField sx={{ display: 'none' }} name='city' value={cityName}>
          {cityName}
        </TextField>
        <Typography>{cityName}</Typography>
        <img src={imagePath} alt='Weather data by WeatherAPI.com'></img> |
        <Typography>Current weather: {description}</Typography> |
        <Typography>Temp: {temperature} C°</Typography> |
        <Typography>Humidty: {humidity}</Typography> |
        <Typography>Precip_mm: {precipitation}</Typography>
        {!isFavorited ? (
          <Button
            name='_action'
            value='addFav'
            type='submit'
            variant='outlined'
            color='primary'
            onClick={addFavoriteHandler}
          >
            <FaThumbsUp />
            &nbsp; Like
          </Button>
        ) : (
          <Button
            onClick={deleteFavoritedCityHandler}
            name='_action'
            value='remove'
            type='submit'
            variant='outlined'
            size='small'
          >
            <FaThumbsDown />
            &nbsp; Dislike
          </Button>
        )}
      </Card>
    </Form>
  );
}
