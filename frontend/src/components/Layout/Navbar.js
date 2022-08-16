import { useContext } from 'react';
import {
	NavDropdown,
	Navbar,
	Nav,
	Container,
	Button,
	Form,
	FormControl,
	NavLink,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { QueryContext } from '../../Context/QueryContext';




const logout = () => {
	window.open('http://localhost:8080/auth/logout', '_self');
};

function NavBar({ user }) {
	console.log('USER',user);
	const navigate = useNavigate();
    const { setQueryContext } = useContext(QueryContext);
	const searchHandler = () => {
	navigate('/search');
	}
	const postAnimalHandler = () => {
	navigate('/findAdopter');
	}
	const reloadHomepageHandler = ()=>{
		window.open('http://localhost:3000/', '_self');
	}
	return (
		<>
			<Navbar className="w-100 py-0"  style={{ "backgroundColor": '#6495ED' }} >

			<Container fluid className='d-flex justify-content-between'>
					<h2 onClick={reloadHomepageHandler} className="">
						香港寵物交易領養平台
					</h2>
					<div className='d-flex justify-content-between'>
						{user && <div>用戶名稱: <div className=' fw-bold text-decoration-underline'
											style={{ cursor: 'pointer', color: '#eeccff' }}
						onClick={() => setQueryContext({ user: user.nickname, option: 'searchAnimalByUserNickName' })}>
						{user.nickname}</div></div>}
					{user ? (
						<Nav.Link >
							<div onClick={logout}>
								<Button className='py-0 px-1' variant="danger">登出</Button>
							</div>
						</Nav.Link>
					) : (
						<Nav.Link >
							<Link to={'/login'}>
								<Button   className='py-0 px-1' variant={user ? 'danger' : 'primary'}>
									{user ? '登出' : '登錄'}
								</Button>
							</Link>
						</Nav.Link>
						)}
						</div>
			</Container>
		</Navbar>
		<Navbar className="sticky-top py-1" style={{ "backgroundColor": '#6495ED' }} >

			<Container fluid className='d-flex justify-content-around'>
				{/* <div className="w-25">
					<a href="/" style={{ textDecoration: 'none', color: 'black' }} >
						香港寵物交易領養平台
					</a>
				</div> */}
				{/* <div className="input-group rounded w-25">
  					<input onClick={searchHandler} type="search" className="form-control rounded" placeholder={"搜尋寵物"} aria-label="Search" aria-describedby="search-addon" />
				</div> */}
				<Button  onClick={searchHandler} className='bg-light text-secondary py-0 px-1 ' >
					<i className="fa-solid fa-magnifying-glass" style={{ cursor: 'pointer'}} onClick={searchHandler}></i>
					搜索寵物
				</Button>

				<Button  onClick={postAnimalHandler} className='bg-warning text-secondary  py-0 px-1 '>
					<i className="fa-solid fa-file-arrow-up fs-6"> 發起售賣或領養</i>
				</Button>

			</Container>
			</Navbar>
			</>
	);
}

export default NavBar;
