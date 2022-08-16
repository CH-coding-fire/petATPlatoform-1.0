import styles from './Modal.module.css';

const Modal = (props) => {
	const closeModalHandler = () => {
		props.onCloseModal();
	};

	return (
		<div className={styles.modal}>
			<p>{props.message}</p>
			<button className="btn btn--alt" onClick={closeModalHandler}>
				Ok
			</button>
		</div>
	);
};

// export default Modal;
