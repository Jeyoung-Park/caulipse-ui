import Loader from '@src/components/common/loader/Loader';
import useFetchNotice from '@src/hooks/remotes/notice/useFetchNotice';
import React from 'react';
import { NoticeInterface } from '../../interface/interface';
import NoticeDetailPresenter from './NoticeDetailPresenter';

const notice: NoticeInterface = {
	noticeId: '1',
	title: '제목입니다',
	content: '124314531251425412564126142612461246',
	createdAt: new Date(),
};

interface NoticeDetailContainerProps {
	noticeId: string;
}

const NoticeDetailContainer = ({ noticeId }: NoticeDetailContainerProps): JSX.Element => {
	const data = useFetchNotice(noticeId);

	if (data.isLoading) return <Loader />;

	return <NoticeDetailPresenter notice={notice} />;
};

export default NoticeDetailContainer;
