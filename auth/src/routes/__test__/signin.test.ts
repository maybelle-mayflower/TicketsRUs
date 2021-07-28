import request from 'supertest';
import { app } from '../../app';

it('returns a 200 as a successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);
});

it('returns a 400 if account has not signed up', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 status code with an invalid email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 status code with an missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: '',
      password: 'password',
    })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'email@email.com',
      password: '',
    })
    .expect(400);
});

it('sets a cookie after successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
