import PredictorForm from '@/components/predictor/PredictorForm';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<main className='flex flex-col justify-center items-center'>
			<Separator className='w-[500px]' />

			{/* Form */}
			<div className='p-5'>
				<PredictorForm />
			</div>
		</main>
	);
}
