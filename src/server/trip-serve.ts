import axios, { AxiosError } from 'axios';
import { api } from './api';

export type TripDetails = {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
};

type TripCreate = Omit<TripDetails, 'id' | 'is_confirmed'> & {
  emails_to_invite: string[];
};

async function getById(id: string) {
  try {
    const { data } = await api.get<{ trip: TripDetails }>(`/trips/${id}`);
    return data.trip;
  } catch (error) {
    throw error;
  }
}

async function create({
  destination,
  starts_at,
  ends_at,
  emails_to_invite,
}: TripCreate) {
  try {
    const { data } = await api.post<{ tripId: string }>('/trips', {
      destination,
      starts_at,
      ends_at,
      emails_to_invite,
      owner_name: 'John Doe',
      owner_email: 'ramomoliveriadev@gmail.com',
    });

    return data;
  } catch (error) {
    handleAxiosError(error);
    throw error; // Propaga o erro para ser tratado posteriormente, se necessário
  }
}

async function update({
  id,
  destination,
  starts_at,
  ends_at,
}: Omit<TripDetails, 'is_confirmed'>) {
  try {
    await api.put(`/trips/${id}`, {
      destination,
      starts_at,
      ends_at,
    });
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}

function handleAxiosError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.log('Response error:', error.response.data);
      console.log('Response status:', error.response.status);
      console.log('Response headers:', error.response.headers);
    } else if (error.request) {
      console.log('Request error:', error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log('Config error:', error.config);
  } else {
    console.log('Erro desconhecido:', error);
  }
}

export const tripServer = { getById, create, update };
