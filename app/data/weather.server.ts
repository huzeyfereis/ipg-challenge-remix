import prisma from './database.server';

interface Props {
  cityName: string;
  description: string;
  imagePath: string;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export async function addFavWeather(weatherData: Props) {
  try {
    return await prisma.favoritedCity.create({
      data: {
        cityName: weatherData.cityName,
        description: weatherData.description,
        imagePath: weatherData.imagePath,
        temperature: weatherData.temperature,
        humidity: weatherData.humidity,
        precipitation: weatherData.precipitation,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getFavoriteCities() {
  try {
    const cities = prisma.favoritedCity.findMany();
    return cities;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteFavoritedCity(id: string) {
  try {
    await prisma.favoritedCity.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
