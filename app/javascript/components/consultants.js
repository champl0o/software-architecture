import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Spacer, Box, HStack, VStack, StackDivider, Text, Select, Button, Image, Link } from '@chakra-ui/react'
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
import { Search2Icon, StarIcon, ArrowBackIcon } from '@chakra-ui/icons'
import {getConsultantsList, getCities, getSpecialisations, searchConsultants} from '../store/apiSlice'

const CONSULTANT_SKELETON = 3;

const ConsultationSlot = ({title, duration, description }) => {
	return <Card>
		<CardBody>
			<Flex justify={'space-between'}>
				<Text className='slot-title'>{title}</Text>
				<Button variant='outline'>Записатися</Button>
			</Flex>
			<Text className='slot-duration'>{duration}</Text>
			<Text className='slot-description'>{description}</Text>
		</CardBody>
	</Card>

}

const ConsultantItem = ({name, surname, specialisation, experience, rating, slots, avatar_url, consultantToShowState}) => {
	const [consultantToShow, setConsultantToShow] = consultantToShowState;
	return <HStack className='consultants-item' align='top' spacing={5}>
		<Image boxSize='160px' borderRadius='8px' src={avatar_url}/>
		<VStack align='left' spacing={5}>
			<VStack align='left' >
				<HStack justify='space-between'>
					<Link className='consultant-name' onClick={(event) => {
						if(!setConsultantToShow) return;
						event.preventDefault();
						setConsultantToShow({name, surname, specialisation, experience, rating, slots});
					}}>{`${surname} ${name}`}</Link>
					<HStack align='top' spacing={1}>
						<StarIcon className='rating-icon'/>
						<Text className='text-filtering-panel'>
							{rating}
						</Text>
					</HStack>
				</HStack>
				<Text className='consultant-specialisation'>{`${specialisation}`}</Text>
			</VStack>
			<Text className='consultant-experience' noOfLines={3}>{`${experience}`}</Text>
		</VStack>
	</HStack>
}

const ConsultantPage = ({consultantToShowState}) => {
	const [consultantToShow, setConsultantToShow] = consultantToShowState;
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
				<VStack align='left' spacing={3}>
				{
					consultantToShow.slots.map((slot, index) => {
						return <Box><ConsultationSlot {...slot} /></Box>
					})
				}
				</VStack>
			</VStack>
		</VStack>
	</VStack>
}

const ConsultantsList = ({consultantToShowState, consultantsState}) => {
	const [consultants, setConsultants] = consultantsState;
    const dispatch = useDispatch();

	const getSkeleton = () => {
		const skeleton = [];
		for(let i = 0; i < CONSULTANT_SKELETON; ++i) {
			skeleton.push(<Box w='120vh' maxW='120vh' padding='6' key={`sekelton-item-${i}`}  bg='white'>
				<SkeletonCircle isLoaded={consultants.length === 7} size='10' />
				<SkeletonText isLoaded={consultants.length === 7} mt='4' noOfLines={4} spacing='4' />
		  	</Box>);
		}
		return skeleton;
	}
	return <VStack className='consultants-list' align='flex-start' spacing={5} divider={<StackDivider borderColor='gray.200' />}>
		{
			consultants.length === 0 ?
			getSkeleton() :
			consultants.map((consultant, index) => {
				return <ConsultantItem key={`consultant-item-${index}`} {...consultant} consultantToShowState={consultantToShowState}/>
			})
		}
	</VStack>
}

const SortingPanel = ({sortOptionState}) => {
	const [sortOption, setSortOption] = sortOptionState;

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
				<option value='rating'>За рейтингом</option>
				<option value='city'>За датою реєстрації</option>
				<option value='specialisation'>За кількістю консультацій</option>
			</Select>
		</Box>
  </Flex>
}

const FilteringPanel = ({ratingState}) => {
	const [rating, setRating] = ratingState;
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
			<Select placeholder='Не обрана'>
			{
				specialisations.map(item => {
					return <option value={item.name}>{item.name}</option>
				})
			}
			</Select>
		</VStack>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Місто проживання</Text>
			<Select placeholder='Не обрана'>
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
	const [rating, setRating] = useState([]);
	const [profession, setProfession] = useState([]);
	const [city, setCity] = useState([]);
	const [searchByWord, setSearchByWord] = useState([]);
	const [sortOption, setSortOption] = useState();
	const [consultants, setConsultants] = useState([]);
	const [consultantToShow, setConsultantToShow] = useState();

    const dispatch = useDispatch();

	const getConsultants = async () => {
		const consultants = await dispatch(getConsultantsList());
		console.log("consultants", consultants)
		setConsultants([...consultants]);
	}

	const searchConsultantsList = async () => {
		const consultants = await dispatch(searchConsultants(sortOption));
		console.log("consultants", consultants)
		setConsultants([...consultants]);
	}


	useEffect(() => {
		getConsultants();
	}, []);


	useEffect(() => {
		setConsultants([]);
		searchConsultantsList();
	}, [sortOption]);

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
								<FilteringPanel ratingState={[rating, setRating]} professionState={[profession, setProfession]} cityState={[city, setCity]}/>
							</Box>
							<Flex><Box w={10}></Box></Flex>
							<Flex grow='1' direction='column'>

								{/* <VStack spacing={10} align='left'> */}
									<SortingPanel sortOptionState={[sortOption, setSortOption]}/>
									<Flex><Box h={10}></Box></Flex>
									<ConsultantsList consultantsState={[consultants, setConsultants]} consultantToShowState={[consultantToShow, setConsultantToShow]}/>
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