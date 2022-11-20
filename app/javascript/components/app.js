import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { ChakraProvider, Button, Divider,  HStack, Box, Flex, VStack } from '@chakra-ui/react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { CalendarIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import Consultants from './consultants'
import Calendar from './calendar'

import {signIn} from '../store/apiSlice'


import 'bootstrap/dist/css/bootstrap.min.css';

// import logo from '../../assets/images/turbota.png'

const AuthenticationModal = ({showModal}) => {
	const [showAuthModal, setShowAuthModal] = showModal;

	const isLoggedIn = useSelector((state) => state.api.isLoggedIn);
	console.log("isLoggedIn", isLoggedIn)
	const dispatch = useDispatch();
	
	// useEffect(() => {
	// 	dispatch(checkAuthentication());
	// }, []);
	

	const { isOpen, onOpen, onClose } = useDisclosure({isOpen: showAuthModal})

	return (
	  <>
		<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
		  <ModalOverlay />
		  <ModalContent>
			<ModalHeader>Увійти як</ModalHeader>
			<ModalCloseButton />
			<ModalBody >
				<VStack>
					<Button className='modal-button' variant='outline' onClick={() => {
						dispatch(signIn({role: 'user'}));
						setShowAuthModal(false);
					}}>Користувач</Button>
					<Button className='modal-button' variant='outline' onClick={() => {
						dispatch(signIn({role: 'consultant'}));
						setShowAuthModal(false);
					}}>Консультант</Button>
				</VStack>
			</ModalBody>
  
		  </ModalContent>
		</Modal>
	  </>
	)
}

const Header = ({showModal}) => {
	const [showAuthModal, setShowAuthModal] = showModal;
	const navigate = useNavigate();
	const role = useSelector((state) => state.api.role);

	return (
		<Box h='90px'>
        <Navbar expand='lg'>
			<Container className='menu' fluid>
				<Navbar.Brand>
					turbota.
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
					{role ? 
					<Button variant='outline' rightIcon={<CalendarIcon/>} onClick={(event) => {
						navigate('/calendar');
					}}>Мій календар</Button> : 
					<Button className='join-button' rightIcon={<ArrowForwardIcon/>} onClick={(event) => {
						setShowAuthModal(true);
					}}>Доєднатися</Button>}
				</Navbar.Collapse>
			</Container>
        </Navbar>
		</Box>
	)
}

const App = () => {
	const [showAuthModal, setShowAuthModal] = useState();
	
	

  return (
    <ChakraProvider>
		<BrowserRouter>
			<Header showModal={[showAuthModal, setShowAuthModal]}/>
			<Divider/>
			<AuthenticationModal showModal={[showAuthModal, setShowAuthModal]}/>
			<Routes>
				<Route exact path='/' element={<div/>} />
				<Route exact path='/consultants' element={<Consultants/>} />
				<Route exact path='/calendar' element={<Calendar/>} />
			</Routes>
		</BrowserRouter>
    </ChakraProvider>
  )
}

export default App