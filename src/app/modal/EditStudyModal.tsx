import { Box, Button } from '@material-ui/core';
import Modal from '@src/components/common/modal/Modal';
import { IModalContainerCommonProps } from '@src/components/common/modal/types';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './editStudyModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import CommonTextField from '@src/components/common/textfield/CommonTextField';
import CommonButton from '@src/components/common/button/CommonButton';
import { ButtonTypeEnum } from '@src/components/common/button/types';
import { useAtom } from 'jotai';
import globalState from '@src/state';
import usePatchStudy from '@src/hooks/remotes/study/usePatchStudy';
import { getMainCategoryCode } from '../shared/utils/category';
import StudySelect from '../study/studyModal/studySelect';

const EDIT_STUDY_TAB_ENUM = {
	TAG: '태그 수정',
	CONTENT: '글 수정',
};
const TITLE_MAX = 40;
const CONTENT_MAX = 500;

const EditStudyModal = ({ open, onClose }: IModalContainerCommonProps): JSX.Element => {
	const [state] = useAtom(globalState);
	const initialStudyData = state.modal.params?.studyData;
	const patchStudy = usePatchStudy();

	const [currentTab, setCurrentTab] = useState(EDIT_STUDY_TAB_ENUM.TAG);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date(initialStudyData.createdAt));
	const [selectedCapacity, setSelectedCapcity] = useState<number>(initialStudyData.capacity);
	const [selectedMainCategoryCode, setSelectedMainCategoryCode] = useState(
		getMainCategoryCode(initialStudyData.categoryCode)
	);
	const [selectedSubCategoryCode, setSelectedSubCategoryCode] = useState(initialStudyData.categoryCode);
	const [selectedFrequencies, setSelectedFrequencies] = useState(initialStudyData.frequency);
	const [selectedDays, setSelectedDays] = useState<string[]>([initialStudyData.weekday]);
	const [selectedPlaces, setSelectedPlaces] = useState<string[]>([initialStudyData.location]);
	const [selectedTitle, setSelectedTitle] = useState<string>(initialStudyData.title);
	const [selectedContent, setSelectedContent] = useState<string>(initialStudyData.studyAbout);

	const handleEdit = () => {
		patchStudy.mutate({
			id: initialStudyData.id,
			data: {
				capacity: selectedCapacity,
				categoryCode: selectedSubCategoryCode,
				// createdAt: selectedDate,
				location: selectedPlaces[0],
				studyAbout: selectedContent,
				title: selectedTitle,
				weekday: selectedDays[0],
				frequency: selectedFrequencies,
			},
		});
	};

	const renderHeader = useCallback(() => {
		return (
			<>
				<Box className="edit-study-modal-header-con">
					<IoClose className="edit-study-modal-header-close-icn" color="#ffffff" onClick={() => onClose(false)} />
					<Box className="edit-study-modal-header-title">모집글 수정하기</Box>
					<Box className="edit-study-modal-header-close-icn" />
				</Box>
				<Box className="edit-study-modal-tab-con">
					<Button
						className={classNames('edit-study-modal-tab-btn', {
							'edit-study-modal-tab-btn-selected': currentTab === EDIT_STUDY_TAB_ENUM.TAG,
						})}
						onClick={() => setCurrentTab(EDIT_STUDY_TAB_ENUM.TAG)}
					>
						태그 수정
					</Button>
					<Button
						className={classNames('edit-study-modal-tab-btn', {
							'edit-study-modal-tab-btn-selected': currentTab === EDIT_STUDY_TAB_ENUM.CONTENT,
						})}
						onClick={() => setCurrentTab(EDIT_STUDY_TAB_ENUM.CONTENT)}
					>
						글 수정
					</Button>
				</Box>
			</>
		);
	}, [currentTab]);

	const renderContentEdit = useCallback(() => {
		return (
			<>
				<Box className="edit-study-modal-body-content-header">
					<Box className="edit-study-modal-title">제목</Box>
					<Box className="edit-study-modal-subtitle">
						({selectedTitle.length}/{TITLE_MAX})
					</Box>
				</Box>
				<CommonTextField
					className="edit-study-modal-body-content-title-input"
					value={selectedTitle}
					onChange={(e) => setSelectedTitle(e.target.value)}
					textFieldProps={{
						variant: 'outlined',
						minRows: 1,
						placeholder: '제목을 입력해 주세요.',
						multiline: true,
						inputProps: { maxLength: TITLE_MAX },
					}}
				/>
				<Box className="edit-study-modal-body-content-header mt2rem">
					<Box className="edit-study-modal-title">본문</Box>
					<Box className="edit-study-modal-subtitle">
						({selectedContent.length}/{CONTENT_MAX})
					</Box>
				</Box>
				<CommonTextField
					className="edit-study-modal-body-content-title-input"
					value={selectedContent}
					onChange={(e) => setSelectedContent(e.target.value)}
					textFieldProps={{
						variant: 'outlined',
						minRows: 5,
						placeholder: '본문을 입력해 주세요.',
						multiline: true,
						inputProps: { maxLength: CONTENT_MAX },
					}}
				/>
			</>
		);
	}, [selectedTitle, selectedContent]);

	return (
		<Modal open={open} onClose={onClose} isFullHeight>
			<>
				{renderHeader()}
				<Box className="edit-study-modal-body-con">
					{currentTab === EDIT_STUDY_TAB_ENUM.TAG ? (
						<StudySelect
							selectedDate={selectedDate}
							setSelectedDate={setSelectedDate}
							selectedCapacity={selectedCapacity}
							setSelectedCapacity={setSelectedCapcity}
							selectedMainCategoryCode={selectedMainCategoryCode}
							setSelectedMainCategoryCode={setSelectedMainCategoryCode}
							selectedSubCategoryCode={selectedSubCategoryCode}
							setSelectedSubCategoryCode={setSelectedSubCategoryCode}
							selectedFrequencies={selectedFrequencies}
							setSelectedFrequencies={setSelectedFrequencies}
							selectedDays={selectedDays}
							setSelectedDays={setSelectedDays}
							selectedPlaces={selectedPlaces}
							setSelectedPlaces={setSelectedPlaces}
						/>
					) : (
						renderContentEdit()
					)}
				</Box>
				<CommonButton
					type={ButtonTypeEnum.primary}
					title="수정완료"
					onClick={handleEdit}
					className="edit-study-modal-cta-btn"
				/>
			</>
		</Modal>
	);
};

export default EditStudyModal;
