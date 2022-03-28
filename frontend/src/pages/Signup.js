import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSignup } from '../hooks/useSignup';
import styled from 'styled-components';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const { user, authIsReady } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { loading, signup, error } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ email, password, name });
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
          <div className=''>
            <h1 style={{ textAlign: 'center', paddingBottom: 10 }}>Register</h1>
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
                      placeholder='Display Name'
                      value={name}
                      type='text'
                      onChange={(event) => setName(event?.target.value)}
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
                      {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <p className='text-center'>
                      Already have an account ? <Link to='/login'>Login</Link>
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
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 400px;
    @media (max-width: 575.98px) {
      width: 100%;
    }
  }
`;

export default Signup;
