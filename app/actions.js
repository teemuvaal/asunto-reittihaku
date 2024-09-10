'use server'

import { revalidatePath } from 'next/cache'

const rateLimitedFetch = async (url, options) => {
  // Implement rate limiting logic here if needed for server-side
  return fetch(url, options);
};

export async function convertToCoordinates(address) {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

  try {
    const response = await rateLimitedFetch(url, {
      headers: {
        'User-Agent': 'TravelDistanceApp/1.0'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }

    const data = await response.json();

    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    } else {
      throw new Error('No results found for the given address');
    }
  } catch (error) {
    console.error('Error converting address to coordinates:', error);
    return null;
  }
}

export async function fetchTravelInfo(from, to) {
  const query = `
    {
      plan(
        from: {lat: ${from.lat}, lon: ${from.lng}}
        to: {lat: ${to.lat}, lon: ${to.lng}}
        numItineraries: 1
      ) {
        itineraries {
          legs {
            startTime
            endTime
            mode
            duration
            realTime
            distance
            transitLeg
          }
        }
      }
    }
  `;

  const url = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'digitransit-subscription-key': process.env.DATA_API_KEY || '',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch travel information: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.data && data.data.plan && data.data.plan.itineraries && data.data.plan.itineraries.length > 0) {
      return data.data.plan.itineraries[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching travel info:', error);
    return null;
  }
}

export async function getTravelInfo(apartment, destinations) {
  try {
    const apartmentCoords = await convertToCoordinates(apartment);
    if (!apartmentCoords) {
      throw new Error('Failed to get coordinates for the apartment');
    }

    const destinationCoords = await Promise.all(
      destinations.filter(dest => dest.trim() !== '').map(dest => convertToCoordinates(dest))
    );

    const validDestinationCoords = destinationCoords.filter(coord => coord !== null);

    if (validDestinationCoords.length === 0) {
      throw new Error('Failed to get coordinates for any destinations');
    }

    const travelInfoResults = await Promise.all(
      validDestinationCoords.map((destCoord, index) => 
        fetchTravelInfo(apartmentCoords, destCoord).then(info => ({
          from: apartment,
          to: destinations[index],
          info: info
        }))
      )
    );

    const validTravelInfo = travelInfoResults.filter(result => result.info !== null);

    revalidatePath('/');
    return validTravelInfo;
  } catch (error) {
    console.error('Error processing addresses or fetching travel info:', error);
    return [];
  }
}