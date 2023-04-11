import { useMutation } from '@tanstack/react-query';
import { Button } from 'components/Buttons/Button';
import { FormControl } from 'components/Forms/FormControl';
import { FormError } from 'components/Forms/FormError';
import { Input } from 'components/Forms/Input';
import { SectionTitle } from 'components/SectionTitle';
import { validationText } from 'constant/validationText';
import { Form, Formik } from 'formik';
import { initializeQueryClient } from 'lib/tanstackClient';
import { useNavigate } from 'react-router-dom';
import { companiesQuery } from 'routes/loaders/companiesLoader';
import { createCompany } from 'services/company';
import { ResponseError } from 'types/Response';
import * as yup from 'yup';

const CreateCompany = () => {
	const navigate = useNavigate();
	const queryClient = initializeQueryClient();
	const { queryKey } = companiesQuery();

	const { mutate, error, isError, isLoading } = useMutation((name: string) => createCompany(name), {
		onSuccess: () => {
			queryClient.invalidateQueries(queryKey);
			navigate('/companies');
		},
	});

	const initialValues = {
		name: '',
	};

	const validationSchema = yup.object({
		name: yup.string().required(validationText.name.required),
	});
	return (
		<section id="create-company">
			<div className="container">
				<SectionTitle title="Nouvelle société" />
				<div className="relative w-full max-w-xl p-8 bg-white rounded-lg shadow-2xl md:p-10 shadow-gray/30 mr-10">
					<h2 className="text-xl font-bold">Créer une société</h2>
					<Formik
						onSubmit={async ({ name }) => {
							mutate(name);
						}}
						validationSchema={validationSchema}
						initialValues={initialValues}
					>
						{({ values, touched, errors, handleBlur, handleChange }) => (
							<Form className="mt-4 flex flex-col">
								{isError && <FormError>{(error as ResponseError).error}</FormError>}
								<FormControl error={touched.name ? errors.name : ''}>
									<Input
										name="name"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Nom de la société"
									/>
								</FormControl>
								<Button type="submit" className="mt-4" isLoading={isLoading}>
									Créer la société
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</section>
	);
};

export { CreateCompany };
