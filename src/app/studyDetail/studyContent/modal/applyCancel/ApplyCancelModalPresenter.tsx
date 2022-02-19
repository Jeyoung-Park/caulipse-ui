import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import '@common/modal/common.scss';
import SimpleModal from '@common/modal/SimpleModal';
import { IModalContainerCommonProps } from '@common/modal/types';

interface IApplyCancelModalPresenterProps extends IModalContainerCommonProps {
	onClick: () => void;
}

const ApplyCancelModalPresenter = ({ open, onClose, onClick }: IApplyCancelModalPresenterProps): JSX.Element => {
	return (
		<SimpleModal
			open={open}
			onClose={onClose}
			title="신청 취소"
			titleStyle={{ color: '#fa1e69' }}
			height="12.688rem"
			footer={false}
		>
			<Container className="simple-modal-content-container">
				<Typography style={{ color: '#636363', textAlign: 'center', fontSize: '0.75rem' }}>
					스터디 신청을 취소합니다.
				</Typography>
				<Container style={{ padding: 0, marginTop: '2rem', display: 'flex' }}>
					<Button className="simple-modal-rounded-button cancel" onClick={() => onClose(false)}>
						취소
					</Button>
					<Button className="simple-modal-rounded-button secondary horizon" onClick={onClick}>
						확인
					</Button>
				</Container>
			</Container>
		</SimpleModal>
	);
};

export default ApplyCancelModalPresenter;
