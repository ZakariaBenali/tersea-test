import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from 'components/Buttons/Button';
import { FormControl } from 'components/Forms/FormControl';
import { FormError } from 'components/Forms/FormError';
import { Input } from 'components/Forms/Input';
import { SectionTitle } from 'components/SectionTitle';
import { validationText } from 'constant/validationText';
import { Form, Formik } from 'formik';
import { initializeQueryClient } from 'lib/tanstackClient';
import { useNavigate, useParams } from 'react-router-dom';
import { invitationsQuery } from 'routes/loaders/invitationsLoader';
import { createInvitation } from 'services/invitation';
import { ResponseError } from 'types/Response';
import * as yup from 'yup';

const InviteToCompany = () => {
	const navigate = useNavigate();
	const { id } = useParams<'id'>();
	const queryClient = initializeQueryClient();
	const { queryKey } = invitationsQuery();

	const { mutate, error, isError, isLoading } = useMutation(
		({ name, email }: { name: string; email: string }) => {
			if (!id) {
				throw new Error('Aucun id');
			}
			return createInvitation(id, name, email);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(queryKey);
				navigate('/invitations');
			},
		},
	);

	const initialValues = {
		name: '',
		email: '',
	};

	const validationSchema = yup.object({
		email: yup.string().email(validationText.email.invalid).required(validationText.email.required),
		name: yup.string().required(validationText.name.required),
	});

	const axiosError = error as AxiosError<ResponseError>;
	return (
		<section id="create-company">
			<div className="container">
				<SectionTitle title="Créer une invitation" />
				<div className="relative w-full max-w-xl p-8 bg-white rounded-lg shadow-2xl md:p-10 shadow-gray/30 mr-10">
					<h2 className="text-xl font-bold">Inviter un utilisateur</h2>
					<Formik
						onSubmit={async (values) => {
							mutate(values);
						}}
						validationSchema={validationSchema}
						initialValues={initialValues}
					>
						{({ values, touched, errors, handleBlur, handleChange }) => (
							<Form className="mt-4 flex flex-col">
								{isError && <FormError>{axiosError.response?.data.error}</FormError>}
								<FormControl error={touched.name ? errors.name : ''}>
									<Input
										name="name"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Nom de l'utilisateur"
									/>
								</FormControl>
								<FormControl error={touched.email ? errors.email : ''} className="mt-4">
									<Input
										name="email"
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										placeholder="Email de l'utilisateur"
									/>
								</FormControl>
								<Button type="submit" className="mt-8" isLoading={isLoading}>
									Inviter
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</section>
	);
};

export { InviteToCompany };
