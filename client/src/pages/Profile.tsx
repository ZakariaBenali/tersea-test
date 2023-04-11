import { Button } from 'components/Buttons/Button';
import { FormControl } from 'components/Forms/FormControl';
import { Input } from 'components/Forms/Input';
import { SectionTitle } from 'components/SectionTitle';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'state/atoms/userAtom';
import dayjs from 'dayjs';
import { updateProfile } from 'services/auth';
import { AxiosError } from 'axios';
import { ResponseError } from 'types/Response';
import { FormError } from 'components/Forms/FormError';
import { FormSuccess } from 'components/Forms/FormSuccess';
import { FormContainer } from 'components/Forms/FormContainer';
import { validationText } from 'constant/validationText';

const Profile: FC = () => {
	const user = useRecoilValue(userAtom);
	const [updated, setUpdated] = useState(false);
	const initialValues = {
		name: user?.name || '',
		email: user?.email || '',
		password: '',
		password_confirmation: '',
	};

	const validationSchema = yup.object({
		name: yup.string().required(validationText.name.required),
		password: yup.string(),
		password_confirmation: yup.string().oneOf([yup.ref('password')], validationText.password.mismatch),
	});

	return (
		<section id="profile">
			<div className="container">
				<SectionTitle title="Profil" />
				<div className="flex items-start">
					<FormContainer title="Modifier votre profil" className="mr-10">
						<Formik
							enableReinitialize={true}
							onSubmit={async (values, actions) => {
								setUpdated(false);
								const { name, password } = values;
								try {
									await updateProfile(name, password);
									setUpdated(true);
									actions.setStatus('');
								} catch (err) {
									const error = err as AxiosError;
									actions.setStatus((error.response?.data as ResponseError).error);
								}
							}}
							initialValues={initialValues}
							validationSchema={validationSchema}
						>
							{({ handleChange, handleBlur, touched, errors, values, isSubmitting, status }) => (
								<Form className="flex flex-col">
									{status && <FormError>{status}</FormError>}
									{updated && <FormSuccess>Profile updated</FormSuccess>}
									<FormControl error={touched.name ? errors.name : ''}>
										<Input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.name}
											name="name"
											placeholder="Votre nom"
										/>
									</FormControl>
									<FormControl className="mt-4">
										<Input defaultValue={values.email} disabled />
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
									<Button type="submit" className="mt-8" isLoading={isSubmitting}>
										Modifier le profil
									</Button>
								</Form>
							)}
						</Formik>
					</FormContainer>
					{user?.company && (
						<FormContainer title="Votre société">
							<div className="mt-4">
								<strong>Nom</strong>
								<p className="mt-2">{user?.company?.name}</p>
							</div>
							<div className="mt-4">
								<strong>Created At</strong>
								<p>{dayjs(user?.company?.createdAt).format('DD MMM YYYY')}</p>
							</div>
						</FormContainer>
					)}
				</div>
			</div>
		</section>
	);
};

export { Profile };
