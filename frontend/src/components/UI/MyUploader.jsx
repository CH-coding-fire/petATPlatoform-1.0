import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { useState } from 'react';

export const MyUploader = () => {
	const [first, setfirst] = useState('');
	// specify upload params and url for your files
	const getUploadParams = ({ meta }) => {
		return { url: 'https://httpbin.org/post' };
	};
	// called every time a file's `status` changes
	const handleChangeStatus = ({ meta, file }, status) => {
		setfirst('');
		console.log('HANDLE_CHANGE_STATUS');
		console.log(status, meta, file);
	};

	// receives array of files that are done uploading when submit button is clicked
	const handleSubmit = (files) => {
		console.log(files.map((f) => f.meta));
	};

	const type = () => {
		console.log('run-0.5');
		console.log('run-1');
	};

	return (
		<Dropzone
			onClick={type}
			nputWithFilesContent={null}
			getUploadParams={getUploadParams}
			onChangeStatus={handleChangeStatus}
			onSubmit={handleSubmit}
			accept="image/*,audio/*,video/*"
		/>
	);
};
