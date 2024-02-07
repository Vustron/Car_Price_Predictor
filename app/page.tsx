import PredictorForm from '@/components/predictor/PredictorForm';
import { Separator } from '@/components/ui/separator';
import { getData } from '@/lib/actions/getData';

export default async function Home() {
	// get product
	const data = await getData();

	console.log(data);

	const companies = data.companies.sort();
	const car_models = data.car_models.sort();
	const years = data.years.sort();
	const fuel_types = data.fuel_types.sort();

	if (!data) {
		return null;
	}

	return (
		<main className='flex flex-col justify-center items-center'>
			<Separator className='w-[800px]' />

			{/* Form */}
			<div className='p-5'>
				<PredictorForm
					companies={companies}
					car_models={car_models}
					years={years}
					fuel_types={fuel_types}
				/>
			</div>
		</main>
	);
}
