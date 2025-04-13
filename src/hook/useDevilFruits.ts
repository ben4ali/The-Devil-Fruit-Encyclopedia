import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DevilFruit } from '../types/DevilFruit';

const fetchDevilFruits = async (pageIndex: number): Promise<DevilFruit[]> => {
  const startId = pageIndex * 2 + 1;
  const responses = await Promise.all([
    axios.get<DevilFruit>(`http://localhost:8080/api/devilfruits/${startId}`),
    axios.get<DevilFruit>(`http://localhost:8080/api/devilfruits/${startId + 1}`),
  ]);
  return responses.map((res) => res.data);
};

export const useDevilFruits = (pageIndex: number) => {
  return useQuery({
    queryKey: ['devilFruits', pageIndex],
    queryFn: () => fetchDevilFruits(pageIndex),
  });
};