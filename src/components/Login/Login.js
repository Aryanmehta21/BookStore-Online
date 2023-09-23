import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import background from '../../assets/2.jpeg';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Centers content vertically */
  width: 100%; /* Full-width container */
  text-align: center;
  margin: 0 auto;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const CenteredContent = styled.div`
  background-color: rgba(192, 192, 192, 0.6); /* Semi-transparent grey background */
  padding: 20px;
  border-radius: 10px;
  backdrop-filter: blur(10px); /* Apply a blur effect to the background */
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const LinkText = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

const GetStartedButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <LoginContainer>
      <CenteredContent>
        <Title><b>Welcome to Online BookStore</b></Title>
        <Description>Login here to Continue.</Description>
        <LinkText>Don't have an account? Sign up here</LinkText>
        <GetStartedButton onClick={() => loginWithRedirect()}>Get Started</GetStartedButton>
      </CenteredContent>
    </LoginContainer>
  );
};

export default Login;
