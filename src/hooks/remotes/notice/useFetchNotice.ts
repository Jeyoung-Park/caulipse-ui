import API from '@src/api';
import { getNoticeInterface } from '@src/api/response/notice';
import { useQuery } from 'react-query';
import QUERY_KEY from '@src/hooks/remotes';

export default (id: string) => {
	const fetcher = async (): Promise<getNoticeInterface> => {
		const res = await API.getNotice(id);
		return res.data;
	};
	return useQuery(`${QUERY_KEY.FETCH_NOTICE}/${id}`, fetcher, {
		onError: (e) => {
			window.alert('공지사항 조회에 실패하였습니다.');
			console.log(e);
		},
	});
};
