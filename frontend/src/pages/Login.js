import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLogin } from '../hooks/useLogin';
import styled from 'styled-components';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const { user, authIsReady } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, login, error } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  useEffect(() => {
    error && toast.error(error);
    if (authIsReady && user) {
      navigate('/');
    }
  }, [user, authIsReady, navigate, error]);

  return (
    <Layout>
      <StyledWrapper>
        <div className='h-100 d-flex justify-content-center align-items-center'>
          <div >
            <h1 style={{ textAlign: 'center', paddingBottom: 10 }}>Login</h1>
            <div className='card pt-3'>
              <div className='card-body'>
                {error && (
                  <div className='alert alert-danger' role='alert'>
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    className='mb-3 form-control'
                    placeholder='Email Address'
                    value={email}
                    onChange={(event) => setEmail(event?.target.value)}
                    required
                  />
                  <input
                    className='w-full mb-4 form-control'
                    placeholder='Password'
                    value={password}
                    type='password'
                    onChange={(event) => setPassword(event?.target.value)}
                    required
                  />

                  <button
                    type='submit'
                    className='mb-2 btn btn-dark w-100'
                    disabled={loading ? true : false}
                  >
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                  <p className='text-center'>
                    Don't have an account ? <Link to='/signup'>Signup</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </Layout>
  );
}

const StyledWrapper = styled.main`
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 350px;

    @media (max-width: 575.98px) {
      width: 100%;
    }
  }
`;

export default Signup;
