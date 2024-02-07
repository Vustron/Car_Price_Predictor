'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { formData, formschema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PredictionData } from '@/lib/interfaces';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { formatter } from '@/lib/utils';
import { useState } from 'react';
import axios from 'axios';

const PredictorForm: React.FC<PredictionData> = ({
	companies,
	car_models,
	years,
	fuel_types,
}) => {
	// init state
	const [isLoading, setIsLoading] = useState(false);
	const [responseData, setResponseData] = useState('');

	// init form
	const form = useForm<formData>({
		resolver: zodResolver(formschema),
		defaultValues: {
			companies: companies.join(','),
			car_models: car_models.join(','),
			years: years.join(','),
			fuel_types: fuel_types.join(','),
			kmTravelled: 0,
		},
	});

	// handle submit
	const onSubmit = async (values: formData) => {
		try {
			setIsLoading(true);

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_DATA_URL}/predict`,
				values
			);

			setResponseData(res.data.prediction);
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center max-w-[800px]'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5 w-[500px]'
				>
					<div className='grid grid-cols-2 gap-8 '>
						<FormField
							control={form.control}
							name='companies'
							render={({ field }) => (
								// Company Name
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Select Company
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value || ''}
										defaultValue={field.value || ''}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value || ''}
													placeholder='Company Name'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{companies.map((company) => (
												<SelectItem key={company} value={company}>
													{company}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='car_models'
							render={({ field }) => (
								// Car Model
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Select Model
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value || ''}
										defaultValue={field.value || ''}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value || ''}
													placeholder='Car Model'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{car_models.map((model) => (
												<SelectItem key={model} value={model}>
													{model}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='years'
							render={({ field }) => (
								// Year Purchased
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Select Year of Purchase
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value || ''}
										defaultValue={field.value || ''}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value || ''}
													placeholder='Year of Purchase'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{years.map((year) => (
												<SelectItem key={year} value={year}>
													{year}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='fuel_types'
							render={({ field }) => (
								// Fuel Type
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Select Fuel Type
									</FormLabel>

									<Select
										onValueChange={field.onChange}
										value={field.value || ''}
										defaultValue={field.value || ''}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value || ''}
													placeholder='Fuel Type'
												/>
											</SelectTrigger>
										</FormControl>

										<SelectContent>
											{fuel_types.map((fuel) => (
												<SelectItem key={fuel} value={fuel}>
													{fuel}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='flex flex-col justify-center items-center'>
						<FormField
							control={form.control}
							name='kmTravelled'
							render={({ field }) => (
								// Km Travelled
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Enter the number of kilometers that the car travelled
									</FormLabel>

									<FormControl>
										<Input
											type='number'
											placeholder='e.g. 30'
											{...field}
											onChange={(e) => field.onChange(parseInt(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						disabled={isLoading}
						className='ml-[100px] mb-10 w-[300px] hover:bg-slate-700 hover:text-white'
						type='submit'
					>
						Send
					</Button>
				</form>
			</Form>

			{isLoading && <Loading />}

			{responseData && (
				<span className='mt-3 font-bold text-lg'>
					{formatter.format(Number(responseData))}
				</span>
			)}
		</div>
	);
};

export default PredictorForm;
