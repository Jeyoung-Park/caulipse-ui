import { useMutation } from 'react-query';
import API from '@src/api';
import { IRequestDeleteStudyUser } from '@src/api/request/studyUser';

export default () => {
	const mutation = async ({ studyId, userId }: IRequestDeleteStudyUser) => {
		const res = await API.deleteStudyUser({ studyId, userId });
		return res.data;
	};

	return useMutation(mutation, {
		onSuccess: (response: any) => {
			console.log(response);
		},
		onError: (e: Error) => {
			console.error(e.message);
		},
	});
};
