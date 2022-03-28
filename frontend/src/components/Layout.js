import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import styled from 'styled-components';
import { login as loginAction } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [authData, setAuthData] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const localData = localStorage.getItem('auth-data');
    if (localData) {
      setAuthData(localData);
      dispatch(loginAction(JSON.parse(localData)));
    }
  }, [dispatch]);

  return (
    <div>
      <StyledHeader>
        <div className='container'>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='title-logo'>
              <Link to='/' className='logo'>
                TechEventsUK
              </Link>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
              {authData ? (
                <>
                  <button className='logout me-3' onClick={onLogout}>
                    Logout <i className='fas fa-sign-out-alt'></i>
                  </button>
                  <span className='avatar'>{user && user.name && user.name[0]}</span>
                </>
              ) : (
                <>
                  <Link
                    className='btn btn-outline-dark me-3 rounded-none'
                    to='/login'
                  >
                    Login
                  </Link>
                  <Link className='btn btn-dark rounded-none' to='/signup'>
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </StyledHeader>
      <HeaderFix />
      <main className=''>{children}</main>
    </div>
  );
};

const StyledHeader = styled.header`
  background-color: #ffffff;
  position: fixed;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  .logo {
    font-size: 25px;
    letter-spacing: 1px;
    color: #000000;
  }
  .logout {
    font-size: 14px;
    border: 1px solid #000000;
    background: none;
    height: 40px;
    padding: 0px 20px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    background: rgb(2,0,36);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
  }
`;

const HeaderFix = styled.div`
  height: 80px;
  width: 100%;
`;

export default Layout;
