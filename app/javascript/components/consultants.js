import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Spacer, Box,Textarea, HStack, VStack, StackDivider, Text, Select, Button, Image, Link } from '@chakra-ui/react'
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
} from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import {
	Tag,
	TagLabel,
	TagLeftIcon,
	TagRightIcon,
	TagCloseButton,
} from '@chakra-ui/react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  } from '@chakra-ui/react'
import { Search2Icon, StarIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {
	getConsultantsList, 
	getCities,
	getSpecialisations, 
	searchConsultants, 
	getConsultationTypes, 
	getSlots,
	createConsultation } from '../store/apiSlice'
import { useDisclosure } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Calendar from 'react-calendar'

const CONSULTANT_SKELETON = 3;
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const ConsultationModal = ({showModalState, title, duration, name, surname, avatar_url, id, consultant_id}) => {
	const [showModal, setShowModal] = showModalState;
	const [showNextModal, setShowNextModal] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure({isOpen: showModal})
	const [slots, setSlots] = useState([]);
	const [currentDay, setCurrentDay] = useState('');
	const [currentData, setCurrentData] = useState('');
	const [selectedSlot, setSelectedSlot] = useState('');
	const [issue, setIssue] = useState('');
	const toast = useToast();

	const dispatch = useDispatch();
	const user_id = useSelector((state) => state.api.userId);


	console.log("user_id", user_id)
    const getSlotsList = async () => {
        const slotsList = await dispatch(getSlots(consultant_id));
        setSlots([...slotsList])

        console.log("slotsList", slotsList)
    }

	const getFormattedDate = () => {
		let date = new Date(currentData);

		date.setHours(selectedSlot + 2, 0, 0);   // Set hours, minutes and seconds
		console.log("DATE", date.toUTCString())
		return date.toUTCString();
	 }

	const addConsultation = async () => {
        const consultation = await dispatch(createConsultation({
			consultant_id: `${consultant_id}`,
			user_id: `${user_id}`,
			consultation_definition_id: `${id}`,
			issue,
			appointment_time: getFormattedDate(),
		}));
    }

	useEffect(() => {
		getSlotsList();
	}, []);

	console.log('showNextModal', showNextModal)
	return (
	  <>
		<Modal isOpen={isOpen} onClose={() => {
			setShowModal(false);
		}}>
		  <ModalOverlay />
		  <ModalContent w='800px' maxW='800px' >
			<ModalHeader>Оберіть зручну годину та час</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				{
					!showNextModal ? <HStack align='top'>
					<Box w='400px'>
					<Calendar 
						locale='uk'
						tileDisabled={({activeStartDate, date, view}) => {
							const dateObj = new Date(date);
							const day = dateObj.getDay();
							return !slots.map(slot => slot.day).includes(weekday[day]);
						}}
						onClickDay={(value, event) => {
							console.log('DAY', value)
							const dateObj = new Date(value);
							const day = dateObj.getDay();
							setCurrentDay(weekday[day]);
							setCurrentData(value);
						}}/>
					</Box>
					<Box w='360px'>
					<VStack align='top' spacing={3}>
						<HStack>
							<Text className='create-consultation-title'>{title}</Text>
							<Text className='create-consultation-duration'>{`${duration} хв.`}</Text>
						</HStack>
						<HStack>
							<Image src={avatar_url} boxSize='40px' borderRadius='full'></Image>
							<Text className='create-consultation-name'>{`${name} ${surname}`}</Text>
						</HStack>
						<HStack>
						{
							currentDay ? slots.find(slot => slot.day === currentDay).slots.map(slot => {
								return <Button className={selectedSlot === slot ? 'create-consultation-button--active' : 'create-consultation-button'} variant='outline' onClick={() => {
									
									setSelectedSlot(slot);
								}}>{`${slot}:00`}</Button>
							}) : 'Оберіть день'
						}
						</HStack>
					</VStack>
					</Box>
				</HStack> : <VStack align='left'>
						<VStack align='left'>
							<Text className='create-consultation-title'>{title}</Text>
							<Text className='create-consultation-duration'>{`${selectedSlot}:00`}</Text>
						</VStack>
						<Text className='create-consultation-issue'>Яке запитання чи проблема Вас турбують на даний момент?</Text>
						<Textarea onChange={(event) => {
							setIssue(event.target.value)
						}}/>
						<Text className='create-consultation-textarea-unnessesary'>Поле необов'язкове</Text>

				</VStack>
			}
			</ModalBody>
			<ModalFooter>
				<Button className='confirm-button' onClick={() => {
					if(!showNextModal) {
						setShowNextModal(true);
					} else {
						setShowModal(false);
						addConsultation();
						toast({
							title: 'Консультацію створено!',
							status: 'success',
							duration: 9000,
							isClosable: true,
						})
					}
				}}>Підтвердити</Button>
			</ModalFooter>
		
		  </ModalContent>
		</Modal>
	  </>
	)
  }

const ConsultationSlot = ({id, title, duration, description, avatar_url, consultant}) => {
	const [showModal, setShowModal] = useState();
	const {name, surname} = consultant;
	console.log("showModal", consultant)
	return <Card>
		<ConsultationModal id={id} title={title} duration={duration} description={description} avatar_url={avatar_url} name={name} surname={surname} consultant_id={consultant.id} showModalState={[showModal, setShowModal]}/>
		<CardBody>
			<Flex justify={'space-between'}>
				<Text className='slot-title'>{title}</Text>
				<Button variant='outline' onClick={(() => {
					setShowModal(true);
				})}>Записатися</Button>
			</Flex>
			<Text className='slot-duration'>{duration}</Text>
			<Text className='slot-description'>{description}</Text>
		</CardBody>
	</Card>

}

const ConsultantItem = ({id, name, surname, city, specialisation, experience, ratings, schedules, avatar_url, consultantToShowState}) => {
	const [consultantToShow, setConsultantToShow] = consultantToShowState;
	
	return <HStack className='consultants-item' align='top' spacing={5}>
		<Image boxSize='160px' borderRadius='8px' src={avatar_url}/>
		<VStack align='left' spacing={5} className='consultants-info'>
			<VStack align='left' >
				<HStack justify='space-between'>
					<Link className='consultant-name' onClick={(event) => {
						if(!setConsultantToShow) return;
						event.preventDefault();
						setConsultantToShow({id, name, surname, city, specialisation, experience, ratings, schedules, avatar_url});
					}}>{`${surname} ${name}`}</Link>
					<HStack align='top' spacing={1}>
						<StarIcon className='rating-icon'/>
						<Text className='text-filtering-panel'>
							{ratings}
						</Text>
					</HStack>
				</HStack>
				<Text className='consultant-specialisation'>{`${specialisation} • ${city}`}</Text>
			</VStack>
			<Text className='consultant-experience' noOfLines={3}>{`${experience}`}</Text>
		</VStack>
	</HStack>
}

const ConsultantPage = ({consultantToShowState}) => {
	const [consultantToShow, setConsultantToShow] = consultantToShowState;
	const [consultationTypes, setConsultationTypes] = useState([]);
	const [isLoading, setIsLoading] = useState();

	const dispatch = useDispatch();

	const getConsultationTypesList = async () => {
		setIsLoading(true);
		const consultationTypesList = await dispatch(getConsultationTypes(`${consultantToShow.id}`));
		setConsultationTypes([...consultationTypesList]);
		setIsLoading();
	}

	useEffect(() => {
		getConsultationTypesList();
	}, []);

	return <VStack className='consultant-page' align='left' spacing={5}>
		<Box><Button colorScheme='transparent' className='text-drop-filtering' leftIcon={<ArrowBackIcon/>} onClick={(event) => {
			setConsultantToShow(false);
		}}><Link>Назад</Link></Button></Box>
		<VStack className='consultant-page' align='left' spacing={5} divider={<StackDivider borderColor='gray.200' />}>
			<ConsultantItem {...consultantToShow} consultantToShowState={consultantToShowState}/>
			<VStack align='left' spacing={3} >
				<Text className='consultant-name'>
					Послуги консультанта
				</Text>
				<Skeleton isLoaded={!isLoading}>
				<VStack align='left' spacing={3}>
				{
					consultationTypes.map((slot, index) => {
						console.log("slot", slot)
						return <Box><ConsultationSlot {...slot} avatar_url={consultantToShow.avatar_url} /></Box>
					})
				}
				</VStack>
				</Skeleton>
			</VStack>
		</VStack>
	</VStack>
}

const ConsultantsList = ({consultantToShowState, consultantsState, isLoading}) => {
	const [consultants, setConsultants] = consultantsState;
	const userId = useSelector((state) => state.api.userId);
	console.log(userId)
	const getSkeleton = () => {
		const skeleton = [];
		for(let i = 0; i < CONSULTANT_SKELETON; ++i) {
			skeleton.push(<Box w='120vh' maxW='120vh' padding='6' key={`sekelton-item-${i}`}  bg='white'>
				<SkeletonCircle isLoaded={!isLoading} size='10' />
				<SkeletonText isLoaded={!isLoading} mt='4' noOfLines={4} spacing='4' />
		  	</Box>);
		}
		return skeleton;
	}
	return <VStack className='consultants-list' align='flex-start' spacing={5} divider={<StackDivider borderColor='gray.200' />}>
		{
			isLoading ?
			getSkeleton() :
			consultants.length > 0 ?
			consultants.filter(consultant => consultant.id != userId).map((consultant, index) => {
				return <ConsultantItem key={`consultant-item-${index}`} {...consultant} consultantToShowState={consultantToShowState}/>
			}) :
			<Text>Консультантів не знайдено</Text>
		}
	</VStack>
}

const SortingPanel = ({sortOptionState, queryState}) => {
	const [sortOption, setSortOption] = sortOptionState;
	const [query, setQuery] = queryState;

	console.log("sortOption", sortOption)
	return <Flex justify='space-between'>
		<Box w='310px'>
			<InputGroup>
				<InputLeftElement
					pointerEvents='none'
					children={<Search2Icon color='gray.300' />}
				/>
				<Input type='tel' placeholder='Шукати...' onChange={(event) => {
					const value = event.target.value;
					if(value.length >= 3) {
						setQuery(value);
					} else if(value.length === 2) {
						setQuery('');
					}
					console.log(event.target.value)
				}}/>
			</InputGroup>
		</Box>
		<Spacer />
		<Box w='310px'>
			<Select className='select-item' placeholder='Не обрано' value={sortOption} onChange={(event) => {
				setSortOption(event.target.value);
			}}>
				<option value='ratings'>За рейтингом</option>
				<option value='created_at'>За датою реєстрації</option>
				<option value='specialisation'>За кількістю консультацій</option>
			</Select>
		</Box>
  </Flex>
}

const FilteringPanel = ({filterState}) => {
	const [filter, setFilter] = filterState;
	const [rating, setRating] = useState([]);
	const [cities, setCities] = useState([]);
	const [specialisations, setSpecialisations] = useState([]);

    const dispatch = useDispatch();

	const getSpecialisationList = async () => {
		const specialisationsList = await dispatch(getSpecialisations());
		setSpecialisations([...specialisationsList]);
	}

	useEffect(() => {
		const getCitiesList = async () => {
			const citiesList = await dispatch(getCities());
			setCities([...citiesList]);
		}
		getCitiesList();
		getSpecialisationList();
	}, []);

	useEffect(() => {
		if(rating.length === 0) {
			setFilter(``);
		} else {
			setFilter(`${rating[0]} - ${rating[1]}`);
		}
	}, [rating]);

	const getRatingString = () => {
		return rating.length === 0 ? ' ' : rating[1] === 5 ? `${rating[0]}+` : `${rating[0]} - ${rating[1]}`;
	}

	return <VStack className='filtering-panel' align='left' spacing={5}>
		<HStack justify='space-between'>
			<Text className='heading-medium' onClick={() => {
			}}>Фільтр</Text>
			<Button colorScheme='transparent' className='text-drop-filtering' onClick={(event) => {
				setRating([]);
			}}>Скинути всі</Button>
		</HStack>
		<Box>
		{
			rating.length > 0 &&
			<Tag className='rating-tag' size={'md'} key={'md'} colorScheme='blue'>
				<TagLabel>Рейтинг</TagLabel>
				<TagRightIcon className='rating-icon' as={StarIcon} />
				<TagLabel>{`   ${getRatingString()}`}</TagLabel>
				<TagCloseButton onClick={(event) => {
					setRating([]);
				}}/>
			</Tag>
		}
		</Box>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Спеціалізація</Text>
			<Select placeholder='Не обрана' onChange={(event) => {
				setFilter(event.target.value);
			}}>
			{
				specialisations.map(item => {
					return <option value={item.name}>{item.name}</option>
				})
			}
			</Select>
		</VStack>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Місто проживання</Text>
			<Select placeholder='Не обрано' onChange={(event) => {
				setFilter(event.target.value);
			}}>
			{
				cities.map(item => {
					return <option value={item.name}>{item.name}</option>
				})
			}
			</Select>
		</VStack>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Рейтинг</Text>
			<RangeSlider aria-label={['min', 'max']} min={0} max={5} defaultValue={[0, 5]} 
				onChangeStart={(value) => {
					const currentStartRating = [...value];
					setRating(currentStartRating);
				}}
				onChangeEnd={(value) => {
					const currentEndRating = [...value];
					setRating(currentEndRating);
				}}>
				<RangeSliderTrack >
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				<RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} />
			</RangeSlider>
			{
				rating.length > 0 &&
				<HStack>
					<Text className='text-filtering-panel'>
						Обраний діапазон:
					</Text>
					<StarIcon className='rating-icon'/>
					<Text className='text-filtering-panel'>
						{getRatingString()}
					</Text>
				</HStack>
			}
		</VStack>
	</VStack>
}

const Consultants = () => {
	const [query, setQuery] = useState('');
	const [filter, setFilter] = useState('');
	const [sortOption, setSortOption] = useState('');
	const [consultants, setConsultants] = useState([]);
	const [isLoading, setIsLoading] = useState();
	const [consultantToShow, setConsultantToShow] = useState();

    const dispatch = useDispatch();

	const getConsultants = async () => {
		setIsLoading(true);
		const consultants = await dispatch(getConsultantsList());
		console.log("consultants", consultants)
		setConsultants([...consultants]);
		setIsLoading();
	}

	const searchConsultantsList = async () => {
		setIsLoading(true);
		const consultants = await dispatch(searchConsultants(sortOption, filter, query));
		console.log("consultants", consultants)
		setConsultants([...consultants]);
		setIsLoading();

	}

	useEffect(() => {
		getConsultants();
	}, []);

	useEffect(() => {
		searchConsultantsList();
	}, [sortOption, filter, query]);


	return (
		<Box className='page-body'>
			{
				consultantToShow ?
				<ConsultantPage consultantToShowState={[consultantToShow, setConsultantToShow]} /> :
				<VStack align='left' spacing={10}>
					<Text className='heading-large'>Консультанти</Text>
					<Box>
						<Flex align='top'>
							<Box>
								<FilteringPanel filterState={[filter, setFilter]}/>
							</Box>
							<Flex><Box w={10}></Box></Flex>
							<Flex grow='1' direction='column'>

								{/* <VStack spacing={10} align='left'> */}
									<SortingPanel sortOptionState={[sortOption, setSortOption]} queryState={[query, setQuery]}/>
									<Flex><Box h={10}></Box></Flex>
									<ConsultantsList isLoading={isLoading} consultantsState={[consultants, setConsultants]} consultantToShowState={[consultantToShow, setConsultantToShow]}/>
								{/* </VStack> */}
							</Flex>
						</Flex>
					</Box>
				</VStack>
			}
		</Box>
		
	)
}

export default Consultants;