import { prisma } from './database.server';

export async function addFavWeather(weatherData) {
  console.log(weatherData, 'asdas');
  try {
    return await prisma.favoritedCity.create({
      data: {
        cityName: weatherData.cityName,
        description: weatherData.description,
        imageCode: weatherData.imageCode,
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
