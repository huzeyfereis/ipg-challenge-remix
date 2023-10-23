import { Box, Typography } from '@mui/material';

import { useActionData, useLoaderData } from '@remix-run/react';
import WeatherDetails from '~/components/WeatherDetails';
import WeatherSearch from '~/components/WeatherSearch';
import { getCurrentWeather } from '../services/searchService';
import {
  addFavWeather,
  deleteFavoritedCity,
  getFavoriteCities,
} from '~/data/weather.server';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

export const action = async ({ request }: LoaderFunctionArgs) => {
  const formData = await request.formData();
  const cityName = Object.fromEntries(formData);

  const response = await getCurrentWeather(cityName.city as string);
  const action = formData.get('_action');
  const favoriteCities = await getFavoriteCities();

  if (action === 'addFav') {
    await addFavWeather(response);
    return redirect('/home-page');
  }

  if (action === 'remove') {
    const selectedCity = favoriteCities.find(
      (city) => city.cityName === cityName.city
    );
    await deleteFavoritedCity(selectedCity.id);
    return redirect('/home-page');
  }

  return response;
};

export const loader = () => {
  return getFavoriteCities();
};

export default function HomePage() {
  const data = useActionData();
  const loaderData = useLoaderData();

  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
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
          isFavorited={false}
          cityAmount={loaderData.length}
        />
      )}
      <Typography
        sx={{ margin: '4rem auto', width: '50%', textAlign: 'center' }}
        variant='h6'
        component='div'
      >
        Favorite Cities
      </Typography>
      {loaderData &&
        loaderData.map((city) => (
          <WeatherDetails
            key={city.id}
            id={city.id}
            cityName={city?.cityName}
            description={city?.description}
            humidity={city?.humidity}
            temperature={city?.temperature}
            precipitation={city?.precipitation}
            imagePath={city?.imagePath}
            isFavorited={true}
          />
        ))}
    </Box>
  );
}
