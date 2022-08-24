import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//hello world
import CardGroup from './components/UI/CardGroup';
import NavBar from './components/Layout/Navbar';
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useParams,
	useLocation,
} from 'react-router-dom';
import LoginForm from './components/Form/LoginForm';
import FormikContainer from './components/Form/FormikContainer';
import { useState } from 'react';
import { useEffect } from 'react';
import BuildNickName from './components/Form/BuildNickname';
import axios from 'axios';
import Search from './components/Form/Search';
import { QueryContext } from './Context/QueryContext';
// import { UserContext } from './Context/UserContext';
import { useContext } from 'react';
import TestSameValue from './components/UI/TestSameValue';



axios.defaults.withCredentials = true;

function App() {
	const [user, setUser] = useState('');
	// const [nickname, setNickname] = useState(null);
	const navigate = useNavigate();
	let params = useParams();
	let { pathname } = useLocation();
	const [query, setQuery] = useState(null);
	const [queryContext, setQueryContext] = useState(null)
	// const [userContext, setUserContext] = useContext(null)

	useEffect(() => {
		const getUser = async () => {
			fetch('http://localhost:8080/api/auth/login/success', {
				method: 'GET',
				credentials: 'include',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Credentials': true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					throw new Error('authentication has been failed');
				})
				.then(async (user) => {
					setUser(user);
					if(!user.nickname){
					navigate('/createnickname')
					}
					// setUserContext(user)s
					// window.open('http://localhost:3000/findAdopter', '_self');
				})
				.catch((err) => {
					console.log('ERROR!!', err);
				});
		};
		getUser();
	}, []);

	// console.log('PRINT_USER:', user);

	if (user && user.nickname == null && pathname !== '/createnickname') {
		navigate('/createnickname');
		console.log('no nick name');
	}
	// const tryGetReqUser = async () => {
	// 	console.log('try to get req.User...');
	// 	await axios
	// 		.get('http://localhost:8080/req', { withCredentials: true })
	// 		.then((res) => console.log(res))
	// 		.catch((err) => {
	// 			console.log('whatever');
	// 		});
	// };
	const searchQueryHandler = (query) => {
		console.log('query:', query);
		// setQuery(query)
	}


	return (

		<QueryContext.Provider value={{ queryContext, setQueryContext }}>
			<NavBar className='position-sticky' user={user} />
			{/* <TestSameValue/> */}
			<div className="no_padding_body">
				<Routes>
					<Route exact path="/" element={<CardGroup user={user} query={query}/>} />
					<Route
						path="/findAdopter"
						element={user ? <FormikContainer /> : <Navigate to="/login" />}
					/>
					<Route path="/info" element={<div>领养须知</div>} />
					<Route path="/createnickname" element={<BuildNickName />} />
					<Route
						path="/login"
						element={user ? <Navigate to="/" /> : <LoginForm />}
					/>
					<Route
						path="/search"
						element={<Search searchQueryHandler={searchQueryHandler}/>}
					/>
					<Route path="*" element={<div>404!!</div>} />
				</Routes>
			</div>
			</QueryContext.Provider>

	);
}

export default App;
