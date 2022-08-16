import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import loginButtonClasses from '../UI/loginButton.module.css';
import googleLogo from '../../image/g-logo.png';


function LoginForm() {
	const loginHandler = (companyOfOAuth) => {
		const backendUrlAuth = `http://localhost:8080/auth/${companyOfOAuth}`;
		window.open(backendUrlAuth, '_self');
	}

	return (
		<div className="d-flex justify-content-center ">
			<div className="border border-2 p-3 d-flex justify-content-center flex-column shadow rounded ">
				<header className='d-flex justify-content-center'>
					<h3>發起前請先登錄</h3>
				</header>
{/*  */}
				<div
					className={loginButtonClasses['g-sign-in-button']}
					onClick={() => { loginHandler('google') }}
				>
					<div className={loginButtonClasses['content-wrapper']}>
						<div className={`${loginButtonClasses['logo-wrapper']} `}>
							<div className="d-flex img-fluid">
								<img src={googleLogo} />
							</div>
						</div>
						<span className={loginButtonClasses['text-container']}>
							<span className="fw-bold">Sign in with Google</span>
						</span>
					</div>
				</div>
				{/* <Button onClick={() => { loginHandler('facebook') }}>facebook login</Button> */}
			</div>
		</div>
	);
}

export default LoginForm;