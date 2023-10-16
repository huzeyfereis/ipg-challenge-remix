import { Box, Typography } from '@mui/material';

import { useActionData } from '@remix-run/react';
import WeatherDetails from '~/components/WeatherDetails';
import { getCurrentWeather } from '../services/searchService';
import WeatherSearch from '~/components/WeatherSearch';
import { addFavWeather } from '~/data/weather.server';
import { redirect } from '@remix-run/node';

export default function HomePage() {
  const data = useActionData();

  return (
    <Box sx={{ width: '50%', margin: 'auto' }}>
      {' '}
      <Typography
        sx={{ margin: '4rem auto', width: '50%', textAlign: 'center' }}
        variant='h6'
        component='div'
      >
        Welcome to the weather app 'ipgautomotive'
      </Typography>
      <WeatherSearch />
      {data && (
        <WeatherDetails
          cityName={data?.cityName}
          description={data?.description}
          humidity={data?.humidity}
          temperature={data?.temperature}
          precipitation={data?.precipitation}
          imagePath={data?.imagePath}
        />
      )}
    </Box>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get('_action');
  const cityNamee = Object.fromEntries(formData);
  const response = getCurrentWeather(cityNamee.city);

  if (action === 'search') {
    return response;
  }
  if (action === 'add') {
    await addFavWeather({ ...response });
    return redirect('/home-page');
  }
  throw new Error('Unknown action');
}
