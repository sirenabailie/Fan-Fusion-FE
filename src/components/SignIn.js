import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src="/images/favicon.ico" alt="logo" width={400} height={400} />
      <Button id="signIn" type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
