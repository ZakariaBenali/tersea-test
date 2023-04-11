import { useQuery } from '@tanstack/react-query';
import { Filters, sortingType } from 'components/Filters';
import { SectionTitle } from 'components/SectionTitle';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { employeesQuery } from 'routes/loaders/employeesLoader';

const Employees: FC = () => {
	const [searchParam, setSearchParam] = useState('');
	const [sorted, setSorted] = useState<sortingType>('ASC');
	const { queryKey, queryFn } = employeesQuery();
	const { data: queryData, isLoading } = useQuery(
		[...queryKey, sorted, searchParam],
		() => queryFn(sorted, searchParam),
		{
			refetchOnWindowFocus: false,
		},
	);

	return (
		<section id="employees">
			<div className="container">
				<SectionTitle title="Employés" className="flex justify-between">
					<Filters setSearchParam={setSearchParam} sorted={sorted} setSorted={setSorted} isLoading={isLoading} />
				</SectionTitle>
				<table className="w-full">
					<tbody>
						{queryData?.data.data.map((employee) => (
							<tr key={employee.id} className="flex bg-white p-4 py-6 rounded shadow-2xl shadow-gray/20 mb-4">
								<td className="flex-1 font-semibold">{employee.name}</td>
								<td className="flex-1">{employee.email}</td>
								<td className="flex-1">{employee.company ? employee.company.name : '-'}</td>
								<td className="flex-1 uppercase">
									<strong>{employee.isAdmin ? 'Admin' : 'Employé'}</strong>
								</td>
								<td className="flex-1">{dayjs(employee.createdAt).format('DD MMMM YYYY')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export { Employees };
