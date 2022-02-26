import React from 'react';
import { Button } from '@material-ui/core';
import { IButtonProps } from './types';
import './index.scss';

const CommonButton = ({ title, onClick, disabled = false, style }: IButtonProps) => {
	return (
		<Button disableFocusRipple className="common-button" style={style} disabled={disabled} onClick={onClick}>
			{title}
		</Button>
	);
};

export default CommonButton;
