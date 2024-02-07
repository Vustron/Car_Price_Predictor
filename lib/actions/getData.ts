import { PredictionData } from '@/lib/interfaces';

const URL = `${process.env.NEXT_PUBLIC_API_DATA_URL}/data`;

export const getData = async (): Promise<PredictionData> => {
	const res = await fetch(URL);

	return res.json();
};
