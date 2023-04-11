import { useMutation, useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Button } from 'components/Buttons/Button';
import { SectionTitle } from 'components/SectionTitle';
import { initializeQueryClient } from 'lib/tanstackClient';
import { FC } from 'react';
import { invitationsQuery } from 'routes/loaders/invitationsLoader';
import { cancelInvitation } from 'services/invitation';
import { formatInvitationStatus } from 'utils/formatInvitationStatus';

const Invitations: FC = () => {
	const { queryKey, queryFn } = invitationsQuery();
	const queryClient = initializeQueryClient();
	const { data: queryData } = useQuery(queryKey, queryFn);
	const cancelMutation = useMutation(cancelInvitation, {
		onSuccess: () => {
			queryClient.invalidateQueries(queryKey);
		},
	});
	return (
		<section id="invitations">
			<div className="container">
				<SectionTitle title="Les invitations" isLoading={cancelMutation.isLoading} />
				<table className="w-full">
					<tbody>
						{queryData?.data.data.map((inv) => (
							<tr key={inv.id} className="flex items-center bg-white p-4 rounded shadow-2xl shadow-gray/20 mb-4">
								<td className="flex-1 max-w-sm font-semibold">{inv.name}</td>
								<td className="flex-1 max-w-sm">{inv.email}</td>
								<td className="flex-1 max-w-sm">
									<span
										className={clsx('p-2 rounded text-sm font-bold uppercase', {
											'bg-green-300/20 text-green-500': inv.status === 'pending',
											'bg-gray/20 text-gray': inv.status === 'canceled',
											'bg-primary-500/10 text-primary-500': inv.status === 'confirmed',
										})}
									>
										{formatInvitationStatus(inv)}
									</span>
								</td>
								{inv.status === 'pending' && (
									<td className="flex-shrink-0 ml-auto">
										<Button isSmall onClick={() => cancelMutation.mutate(inv.id)}>
											Annuler
										</Button>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export { Invitations };
