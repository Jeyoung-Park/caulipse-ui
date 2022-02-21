import { GetUserProfileResponse } from '@api/response/user';
import React, { useEffect, useState } from 'react';
import { StudyUser } from '@api/types';
import StudyApproveModalContainer from '@studyDetail/studyContent/currentState/modal/StudyApproveModalContainer';
import StudyCurrentStatePresenter from './StudyCurrentStatePresenter';

const sampleImg =
	'data:image/jpeg;base64,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';
interface StudyCurrentStateContainerProps {
	studyId: string;
	hostId: string;
}
const studyUserD: StudyUser[] = [
	{
		userId: '11',
		studyId: 'asdfasdf234efawe32fd',
		isAccepted: 0,
		tempBio: 'dfdf',
		userName: 'name',
		shortIntro: '짧은 소개글입니다',
		profilePicture: sampleImg,
	},
	{
		userId: '12',
		studyId: 'asdfasdf234efawe32fd',
		isAccepted: 0,
		tempBio: 'dfdf',
		userName: 'name',
		shortIntro: '짧은 소개글입니다',
		profilePicture: sampleImg,
	},
	{
		userId: '13',
		studyId: 'asdfasdf234efawe32fd',
		isAccepted: 1,
		tempBio: 'dfdf',
		userName: 'name',
		shortIntro: '짧은 소개글입니다',
		profilePicture: sampleImg,
	},
];

const hostD: StudyUser = {
	userId: '1',
	studyId: 'asdfasdf234efawe32fd',
	isAccepted: 1,
	tempBio: 'dfdf',
	userName: 'name',
	shortIntro: '짧은 소개글입니다',
	profilePicture: sampleImg,
};

const StudyCurrentStateContainer = ({ studyId, hostId }: StudyCurrentStateContainerProps): JSX.Element => {
	const [studyUser, setStudyUser] = useState<StudyUser[] | []>(studyUserD);
	const [openStudyApproveModal, setOpenStudyApproveModal] = useState(false);

	return (
		<StudyCurrentStatePresenter
			host={hostD}
			studyUsers={studyUser}
			setOpenStudyApproveModal={setOpenStudyApproveModal}
		/>
	);
};

export default StudyCurrentStateContainer;
