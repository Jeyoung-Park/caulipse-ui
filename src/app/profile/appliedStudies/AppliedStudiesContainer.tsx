import Loader from '@src/components/common/loader/Loader';
import useFetchAppliedStudies from '@src/hooks/remotes/user/useFetchAppliedStudies';
import { isFuture, isPast, isToday } from 'date-fns';
import React from 'react';
import AppliedStudiesPresenter from './AppliedStudiesPresenter';

const AppliedStudiesContainer = (): JSX.Element => {
	const { data, isLoading } = useFetchAppliedStudies();

	const openedAppliedStudies = data?.filter(
		(item) =>
			isToday(new Date(item?.dueDate)) || (!isToday(new Date(item?.dueDate)) && isFuture(new Date(item?.dueDate)))
	);

	const closedAppliedStudies = data?.filter(
		(item) => !isToday(new Date(item?.dueDate)) && isPast(new Date(item?.dueDate))
	);

	if (isLoading) return <Loader />;

	return (
		<div>
			{openedAppliedStudies && closedAppliedStudies && (
				<AppliedStudiesPresenter
					openedAppliedStudies={openedAppliedStudies}
					closedAppliedStudies={closedAppliedStudies}
				/>
			)}
		</div>
	);
};

export default AppliedStudiesContainer;
