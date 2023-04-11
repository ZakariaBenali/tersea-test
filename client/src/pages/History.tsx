import { useQuery } from '@tanstack/react-query';
import { SectionTitle } from 'components/SectionTitle';
import { FC } from 'react';
import { historyQuery } from 'routes/loaders/historyLoader';
import { formatHistory } from 'utils/formatHistory';

const History: FC = () => {
	const { queryKey, queryFn } = historyQuery();
	const { data: queryData } = useQuery(queryKey, queryFn);

	return (
		<section id="history">
			<div className="container">
				<SectionTitle title="Historique" />
				<table className="w-full">
					<tbody>
						{queryData?.data.data.map((history) => (
							<tr key={history.id} className="flex bg-white p-4 py-6 rounded shadow-2xl shadow-gray/20 mb-4">
								<td className="flex-1 font-semibold">{formatHistory(history)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export { History };
