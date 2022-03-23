import React from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import './index.scss';

const ACCOUNT_INFO = '계정 정보';
const ASK = '문의하기';
const NOTICE = '공지사항';
const TERMS = '서비스 이용약관';

const navigations = [
	{
		label: NOTICE,
	},
	{
		label: ASK,
	},
	{
		label: ACCOUNT_INFO,
	},
	{
		label: TERMS,
	},
];

const MyBtns = (): JSX.Element => {
	const history = useHistory();

	const handleClick = (label: string) => {
		switch (label) {
			case NOTICE:
				history.push('/profile/notice');
				break;
			case ACCOUNT_INFO:
				history.push('/profile/accountinfo');
				break;
			default:
				break;
		}
	};

	return (
		<div className="my-btns-container">
			{navigations?.map((item) => (
				<button type="button" key={item.label} onClick={() => handleClick(item.label)}>
					{item.label === ASK ? (
						<a href="mailto:caulipse814@gmail.com" className="navigation-item-container">
							<div className="navigation-item-label">{item.label}</div>
							<IoChevronForward size={24} color="#b1b1b1" />
						</a>
					) : (
						<div className="navigation-item-container">
							<div className="navigation-item-label">{item.label}</div>
							<IoChevronForward size={24} color="#b1b1b1" />
						</div>
					)}
				</button>
			))}
		</div>
	);
};

export default MyBtns;
