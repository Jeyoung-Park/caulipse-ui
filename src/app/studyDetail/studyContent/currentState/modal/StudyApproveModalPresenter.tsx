import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import '@common/modal/common.scss';
import SimpleModal from '@common/modal/SimpleModal';
import { IModalContainerCommonProps } from '@common/modal/types';

interface IStudyApproveModalPresenterProps extends IModalContainerCommonProps {
	onClick: () => void;
	current: number;
	total: number;
}

const StudyApproveModalPresenter = ({
	open,
	onClose,
	onClick,
	current,
	total,
}: IStudyApproveModalPresenterProps): JSX.Element => {
	return (
		<SimpleModal
			open={open}
			onClose={onClose}
			title={`추가완료 (${current} / ${total})`}
			height="12.688rem"
			footer={false}
		>
			<Container className="simple-modal-content-container">
				<Typography style={{ color: '#636363', textAlign: 'center', fontSize: '0.75rem' }}>
					마감버튼을 눌러 스터디원들에게 마감여부를 알려주세요!
				</Typography>
				<Container style={{ padding: 0, marginTop: '2rem', display: 'flex' }}>
					<Button
						className="simple-modal-rounded-button cancel"
						style={{ width: '6rem' }}
						onClick={() => onClose(false)}
					>
						닫기
					</Button>
					<Button className="simple-modal-rounded-button primary horizon" onClick={onClick}>
						모집 마감
					</Button>
				</Container>
			</Container>
		</SimpleModal>
	);
};

export default StudyApproveModalPresenter;
