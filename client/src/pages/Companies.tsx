import { useMutation, useQuery } from '@tanstack/react-query';
import { SectionTitle } from 'components/SectionTitle';
import { FC, useState } from 'react';
import { companiesQuery } from 'routes/loaders/companiesLoader';
import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ButtonStyle } from 'components/Buttons/ButtonStyle';
import { deleteCompany } from 'services/company';
import { initializeQueryClient } from 'lib/tanstackClient';
import { Button } from 'components/Buttons/Button';
import { Filters, sortingType } from 'components/Filters';

const Companies: FC = () => {
	const [searchParam, setSearchParam] = useState('');
	const [sorted, setSorted] = useState<sortingType>('ASC');
	const { queryKey, queryFn } = companiesQuery();
	const newQueryKey = [...queryKey, sorted, searchParam];
	const queryClient = initializeQueryClient();
	const { data: queryData, isLoading } = useQuery(newQueryKey, () => queryFn(sorted, searchParam), {
		refetchOnWindowFocus: false,
	});

	const deleteMutation = useMutation(deleteCompany, {
		onSuccess: () => {
			queryClient.invalidateQueries(newQueryKey);
		},
	});
	return (
		<section id="companies">
			<div className="container">
				<SectionTitle
					title="Societés"
					className="flex items-center justify-between"
					isLoading={deleteMutation.isLoading}
				>
					<div className="flex flex-col items-end">
						<Link to="/companies/create" className="mb-8">
							<ButtonStyle>Create a company</ButtonStyle>
						</Link>
						<Filters setSearchParam={setSearchParam} sorted={sorted} setSorted={setSorted} isLoading={isLoading} />
					</div>
				</SectionTitle>
				<table className="w-full">
					<tbody>
						{queryData?.data.data.map((company) => (
							<tr
								key={company.id}
								className="flex items-center justify-center bg-white p-4 py-3 rounded shadow-2xl shadow-gray/20 mb-4"
							>
								<td className="flex-1">
									<h3 className="font-bold text-lg">{company.name}</h3>
								</td>
								<td className="flex-1">{dayjs(company.createdAt).format('DD MMMM YYYY')}</td>
								<td className="flex">
									<Link to={`/companies/invite/${company.id}`} className="mr-3">
										<ButtonStyle isSmall>Inviter un utilisateur</ButtonStyle>
									</Link>
									<Button
										buttonType="danger"
										onClick={() => deleteMutation.mutate(company.id)}
										disabled={deleteMutation.isLoading}
										isSmall
									>
										Supprimer
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export { Companies };
