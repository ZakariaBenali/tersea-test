import { AxiosError } from 'axios';
import { Button } from 'components/Buttons/Button';
import { FormContainer } from 'components/Forms/FormContainer';
import { FormControl } from 'components/Forms/FormControl';
import { FormError } from 'components/Forms/FormError';
import { Input } from 'components/Forms/Input';
import { validationText } from 'constant/validationText';
import { Formik, Form } from 'formik';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from 'services/auth';
import { ResponseError } from 'types/Response';
import { setToken } from 'utils/token';
import * as yup from 'yup';

const initialValues = {
	email: '',
	password: '',
};

const Login: FC = () => {
	const navigate = useNavigate();
	const validationSchema = yup.object({
		email: yup.string().email(validationText.email.invalid).required(validationText.email.required),
		password: yup.string().required(validationText.password.required),
	});

	return (
		<FormContainer title="Bienvenue">
			<Formik
				onSubmit={async (values, actions) => {
					const { email, password } = values;
					try {
						const { data: ResponseData } = await login(email, password);
						setToken(ResponseData.data.token);
						navigate('/');
					} catch (err) {
						const error = err as AxiosError;
						actions.setStatus((error.response?.data as ResponseError).error);
					}
				}}
				validationSchema={validationSchema}
				initialValues={initialValues}
			>
				{({ handleChange, handleBlur, touched, errors, values, isSubmitting, status }) => (
					<Form className="flex flex-col">
						{status && <FormError>{status}</FormError>}
						<FormControl error={touched.email ? errors.email : ''}>
							<Input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								name="email"
								placeholder="Votre email"
							/>
						</FormControl>
						<FormControl className="mt-4" error={touched.password ? errors.password : ''}>
							<Input
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								name="password"
								type="password"
								placeholder="Mot de passe"
							/>
						</FormControl>
						<Button type="submit" className="mt-8" isLoading={isSubmitting}>
							Se connecter
						</Button>
					</Form>
				)}
			</Formik>
		</FormContainer>
	);
};

export { Login };
