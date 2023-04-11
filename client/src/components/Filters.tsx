import { Form, Formik } from 'formik';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { FormControl } from './Forms/FormControl';
import { Input } from './Forms/Input';
import { Button } from './Buttons/Button';

const initialValues = {
	search: '',
};
export type sortingType = 'ASC' | 'DESC';
interface Props {
	isLoading?: boolean;
	sorted: sortingType;
	setSearchParam: Dispatch<SetStateAction<string>>;
	setSorted: Dispatch<SetStateAction<sortingType>>;
}

const Filters: FC<Props> = ({ sorted, setSearchParam, isLoading, setSorted }) => {
	return (
		<Formik
			onSubmit={(values) => {
				setSearchParam(values.search);
			}}
			initialValues={initialValues}
		>
			{({ values, handleChange }) => (
				<Form className="flex">
					<button
						className="mr-4"
						onClick={() => {
							setSorted((currentSort) => (currentSort === 'ASC' ? 'DESC' : 'ASC'));
						}}
					>
						Trié par: {sorted === 'ASC' ? 'Ascendant' : 'Descendant'}
					</button>
					<FormControl className="bg-white">
						<Input
							placeholder="Saisir un nom à rechercher"
							name="search"
							value={values.search}
							onChange={handleChange}
						/>
					</FormControl>
					<Button type="submit" className="ml-4" isLoading={isLoading}>
						Rechercher
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export { Filters };
