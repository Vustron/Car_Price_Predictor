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
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

const PredictorForm = () => {
	// init form
	const form = useForm<formData>({
		resolver: zodResolver(formschema),
		defaultValues: {
			companyName: '',
			carModel: '',
			yearPurchased: '',
			fuelType: '',
			kmTravelled: 0,
		},
	});

	return (
		<div className='flex flex-col justify-center items-center max-w-[800px]'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(() => null)}
					className='space-y-8 w-[350px]'
				>
					<FormField
						control={form.control}
						name='companyName'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-bold text-md'>
									Company Name
								</FormLabel>

								<Select
									onValueChange={field.onChange}
									value={field.value}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue
												defaultValue={field.value}
												placeholder='Select company'
											/>
										</SelectTrigger>
									</FormControl>

									<SelectContent></SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button className='ml-auto' type='submit'>
						Send
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default PredictorForm;
