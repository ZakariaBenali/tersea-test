import { Button } from 'components/Buttons/Button';
import { FormControl } from 'components/Forms/FormControl';
import { Input } from 'components/Forms/Input';
import { SectionTitle } from 'components/SectionTitle';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import { FormError } from 'components/Forms/FormError';
import { FormContainer } from 'components/Forms/FormContainer';
import { createAdmin } from 'services/admin';
import { useNavigate } from 'react-router-dom';
import { initializeQueryClient } from 'lib/tanstackClient';
import { useMutation } from '@tanstack/react-query';
import { employeesQuery } from 'routes/loaders/employeesLoader';
import { validationText } from 'constant/validationText';
import { AxiosError } from 'axios';
import { ResponseError } from 'types/Response';

const CreateAdmin: FC = () => {
	const navigate = useNavigate();
	const queryClient = initializeQueryClient();
	const { queryKey } = employeesQuery();
	const { mutate, error, isError, isLoading } = useMutation(
		({ name, email, password }: { name: string; email: string; password: string }) =>
			createAdmin(name, email, password),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(queryKey);
				navigate('/');
			},
		},
	);
	const initialValues = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	};

	const validationSchema = yup.object({
		name: yup.string().required(validationText.name.required),
		email: yup.string().email(validationText.email.invalid).required(validationText.email.required),
		password: yup.string().required(validationText.password.required),
		password_confirmation: yup
			.string()
			.required(validationText.password_confirmation.required)
			.oneOf([yup.ref('password')], validationText.password.mismatch),
	});

	const axiosError = error as AxiosError<ResponseError>;
	return (
		<section id="profile">
			<div className="container">
				<SectionTitle title="Nouvelle admin" />
				<div className="flex items-start">
					<FormContainer title="Créer un administrateur" className="mr-10">
						<Formik
							enableReinitialize={true}
							onSubmit={async (values) => {
								mutate(values);
							}}
							initialValues={initialValues}
							validationSchema={validationSchema}
						>
							{({ handleChange, handleBlur, touched, errors, values }) => (
								<Form className="flex flex-col">
									{isError && <FormError>{axiosError.response?.data.error}</FormError>}
									<FormControl error={touched.name ? errors.name : ''}>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
											name="name"
											placeholder="Votre nom"
										/>
									</FormControl>
									<FormControl className="mt-4" error={touched.email ? errors.email : ''}>
										<Input
											placeholder="Email"
											name="email"
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</FormControl>
									<FormControl className="mt-4" error={touched.password ? errors.password : ''}>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
											name="password"
											type="password"
											placeholder="Votre mot de passe"
										/>
									</FormControl>
									<FormControl
										className="mt-4"
										error={touched.password_confirmation ? errors.password_confirmation : ''}
									>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password_confirmation}
											name="password_confirmation"
											type="password"
											placeholder="Confirmation de mot de passe"
										/>
									</FormControl>
									<Button type="submit" className="mt-8" isLoading={isLoading}>
										Créer un administrateur
									</Button>
								</Form>
							)}
						</Formik>
					</FormContainer>
				</div>
			</div>
		</section>
	);
};

export { CreateAdmin };
