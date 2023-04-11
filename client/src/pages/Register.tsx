import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from 'components/Buttons/Button';
import { FormContainer } from 'components/Forms/FormContainer';
import { FormControl } from 'components/Forms/FormControl';
import { FormError } from 'components/Forms/FormError';
import { Input } from 'components/Forms/Input';
import { Loading } from 'components/Loading';
import { NoInvitation } from 'components/pages/register/NoInvitation';
import { validationText } from 'constant/validationText';
import { Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { registerQuery } from 'routes/loaders/registerLoader';
import { createEmployee } from 'services/employee';
import { ResponseError } from 'types/Response';
import * as yup from 'yup';

const Register = () => {
	const navigate = useNavigate();
	const { id } = useParams<'id'>();
	const { queryKey, queryFn } = registerQuery(id!);
	const {
		data: queryData,
		isLoading,
		isError,
		error,
	} = useQuery(queryKey, queryFn, {
		retry: false,
	});
	const data = queryData?.data.data;
	const initialValues = {
		name: data?.name || '',
		email: data?.email || '',
		password: '',
		invitation_id: data?.id || '',
	};

	const validationSchema = yup.object({
		password: yup.string().required(validationText.password.required),
	});
	if (isLoading) {
		return <Loading />;
	}
	const axiosError = error as AxiosError<ResponseError>;
	if (isError && axiosError.response?.status === 404) {
		return <NoInvitation />;
	}
	return (
		<FormContainer title="Créer un compte">
			<p className="mb-4 font-semibold">Société liée: {data?.company.name}</p>
			<Formik
				onSubmit={async (values, actions) => {
					try {
						await createEmployee(values.invitation_id, values.password);
						navigate('/login');
					} catch (err) {
						actions.setStatus((err as AxiosError<ResponseError>).response?.data.error);
					}
				}}
				enableReinitialize={true}
				validationSchema={validationSchema}
				initialValues={initialValues}
			>
				{({ values, touched, errors, handleBlur, handleChange, isSubmitting, status }) => (
					<Form className="flex flex-col">
						{status && <FormError>{status}</FormError>}
						<input type="hidden" name="invitation_id" value={values.invitation_id} />
						<FormControl>
							<Input value={values.name} disabled />
						</FormControl>
						<FormControl className="mt-4">
							<Input value={values.email} disabled />
						</FormControl>
						<FormControl error={touched.password ? errors.password : ''} className="mt-4">
							<Input
								type="password"
								value={values.password}
								name="password"
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Votre mot de passe"
							/>
						</FormControl>
						<Button type="submit" className="mt-8" isLoading={isSubmitting}>
							S&apos;enregistrer
						</Button>
					</Form>
				)}
			</Formik>
		</FormContainer>
	);
};

export { Register };
