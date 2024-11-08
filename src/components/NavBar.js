/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import DarkSwitch from './DarkToggle';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar id="navbar" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Link passHref href="/">
          <Image src="/images/favicon.ico" alt="logo" width={60} height={60} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/categories">
              <Navbar.Brand color={321e48}>Browse 🔎</Navbar.Brand>
            </Link>
            <Button className="btn navBtn" href="/">
              Home
            </Button>
            <Button className="btn navBtn" href="/stories/add-story">
              Create Story
            </Button>
            <Button className="btn navBtn" href={`/profile/${user.id}`}>
              Profile
            </Button>
            <Button className="btn navBtn" variant="danger" onClick={signOut}>
              Sign Out
            </Button>
            <DarkSwitch />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
