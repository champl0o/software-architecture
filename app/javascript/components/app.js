import React from 'react';
import { ChakraProvider, Button, Divider, HStack, Box } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Consultants from './consultants'

import 'bootstrap/dist/css/bootstrap.min.css';

// import logo from '../../assets/images/turbota.png'

const Header = () => {
	return (
		<Box h='90px'>
        <Navbar expand='lg'>
			<Container className='menu' fluid>
				<Navbar.Brand>
					turbota.
					{/* <img>
						src={logo}
						className='d-inline-block align-top'
						alt='React Bootstrap logo'
					</img> */}
				</Navbar.Brand>
				<Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end' >
					<Nav className='nav-frame me-auto' bg='light'>
						<LinkContainer to='/support'>
							<Nav.Link style={{order: 0}}>Підтримка</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/help'>
							<Nav.Link style={{order: 1}}>Допомога</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/consultants'>
							<Nav.Link style={{order: 2}}>Консультування</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/blog'>
							<Nav.Link style={{order: 3}}>Блог</Nav.Link>
						</LinkContainer>
						<LinkContainer to='/statistics'>
							<Nav.Link style={{order: 4}}>Статистика</Nav.Link>
						</LinkContainer>
					</Nav>
					<Button className='join-button'>Доєднатися</Button>
				</Navbar.Collapse>
			</Container>
        </Navbar>
		</Box>
	)
}

const App = () => {
  return (
    <ChakraProvider>
		<BrowserRouter>
			<Header/>
			<Divider/>
			<Box className='page-body'>
			<Routes>
				<Route exact path='/' element={<div/>} />
				<Route exact path='/consultants' element={<Consultants/>} />
			</Routes>
			</Box>
		</BrowserRouter>
    </ChakraProvider>
  )
}

export default App