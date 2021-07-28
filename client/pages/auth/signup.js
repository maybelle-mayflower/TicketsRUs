import { useState } from 'react';
import Router from 'next/router';
import makeRequest from '../../hooks/make-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = makeRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => {
      return Router.push('/');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };
  return (
    <div className="container">
      <div className="mt-4">
        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <h1>Sign Up</h1>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                />
              </div>
              {errors}

              <button className="btn btn-sm btn-primary mt-3">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
