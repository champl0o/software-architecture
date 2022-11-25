import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Spacer, Textarea, Box, HStack, VStack, StackDivider, Text, Select, Button, Image, IconButton, Circle  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from '@chakra-ui/react'
  import {
      Popover,
      PopoverTrigger,
      PopoverContent,
      PopoverHeader,
      PopoverBody,
      PopoverFooter,
      PopoverArrow,
      PopoverCloseButton,
      PopoverAnchor,
    } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';
import {getSlots, getConsultations, getSchedules, getConsultationTypes} from  '../store/apiSlice'

import { HamburgerIcon } from '@chakra-ui/icons'

import 'bootstrap/dist/css/bootstrap.css';


const AddConsultationType = ({showAddConsultationTypeState}) => {
    const [showAddConsultationType, setShowAddConsultationType] = showAddConsultationTypeState;

    return <VStack className='filtering-panel' spacing={7}>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Назва</Text>
        <Box w='310px'>
            <Input/>
        </Box>
        </VStack>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Тривалість (хв)</Text>
        <Box w='310px'>
            <Input/>
        </Box>
        </VStack>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Опис (необов'язково)</Text>
        <Box w='310px'>
            <Textarea/>
        </Box>
        </VStack>
        <HStack>
            <Button className='cancel-button' onClick={() => {
                setShowAddHours();
            }}>Скасувати</Button>
            <Button className='text-drop-filtering consultant-tab' onClick={() => {
                setShowAddHours();
            }}>Зберегти</Button>
        </HStack>
    </VStack>
}

const TypesSlot = ({title, duration, description}) => {
    return <Card  w='310px'>
        <CardBody>
        <HStack justify='space-between'>
            <Text className='slot-title'>{title}</Text>
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem >
                        Видалити 
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
       <Text className='slot-duration'>{`${duration}`}</Text> 
        <Text className='slot-description'>{description}</Text>
        </CardBody>
    </Card>
}

const AddWorkingHours = ({showAddHoursState}) => {
    const [showAddHours, setShowAddHours] = showAddHoursState;

    return <VStack className='filtering-panel' spacing={7}>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>День</Text>
        <Box w='310px'>
            <Select className='select-item' placeholder='Не обрано' >
                <option value='monday'>Понеділок</option>
                <option value='tuesday'>Вівторок</option>
                <option value='wednesday'>Середа</option>
                <option value='thursday'>Четвер</option>
                <option value='friday'>П'ятниця</option>
                <option value='saturday'>Субота</option>
                <option value='sunday'>Неділя</option>
            </Select>
        </Box>
        </VStack>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Години</Text>
        <HStack>
            <VStack>
                <Text className='from-to' w='155px'>від</Text>
                <Select  placeholder='Не обрано' />
            </VStack>
            <VStack>
                <Text className='from-to' w='155px'>до</Text>
                <Select placeholder='Не обрано' />
            </VStack>
        </HStack>
        </VStack>
        <HStack>
            <Button className='cancel-button' onClick={() => {
                setShowAddHours();
            }}>Скасувати</Button>
            <Button className='text-drop-filtering consultant-tab' onClick={() => {
                setShowAddHours();
            }}>Зберегти</Button>
        </HStack>
    </VStack>
}

const WorkingHoursSlot = ({day, start, end}) => {
    return <Card  w='310px'>
        <CardBody>
        <HStack justify='space-between'>
            <Text className='slot-title'>{day}</Text>
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem >
                        Видалити 
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
      
        <Text className='slot-duration'>{`${start} - ${end}`}</Text> 
    
        {/* <Text className='slot-duration'>{time}</Text> */}

        </CardBody>
    </Card>
}

const ConsultantSettings = () => {
    const [showAddHours, setShowAddHours] = useState([]);
    const [showAddConsultationType, setShowAddConsultationType] = useState([]);
    const [consultationTypes, setConsultationTypes] = useState([]);

    const [schedules, setSchedules] = useState([]);

	const dispatch = useDispatch();

    const getSchedulesList = async () => {
        const schedulesList = await dispatch(getSchedules(1));
        setSchedules([...schedulesList])
    }
	const getConsultationTypesList = async () => {
		const consultationTypesList = await dispatch(getConsultationTypes(`${1}`));
		setConsultationTypes([...consultationTypesList]);
	}

    useEffect(() => {
		getConsultationTypesList();
        getSchedulesList();
    }, []);

    return <VStack className='filtering-panel' align='left' spacing={5}>
        <Tabs variant='soft-rounded'>
            <TabList justifyContent='space-between'>
                <Tab className='consultant-tab'>Робочі години</Tab>
                <Tab className='consultant-tab'>Типи послуг</Tab>
            </TabList>
            <TabPanels>
                <TabPanel className='tab-calendar'>
                <VStack  align='left' spacing={3}>
                {
                    schedules.map((item) => {
                        return <WorkingHoursSlot day={item.day} start={item.start} end={item.end}/>
                    })
                }
                <Button colorScheme='transparent' className='text-drop-filtering text-left' w='310px' onClick={(event) => {
                    setShowAddHours(true);
                }}> + Додати робочі години</Button>
                {
                    showAddHours && <AddWorkingHours showAddHoursState={[showAddHours, setShowAddHours]}/>
                }
                </VStack>
                </TabPanel>
                <TabPanel>
                <VStack  align='left' spacing={3}>
                {
                    consultationTypes.map((item) => {
                        return <TypesSlot {...item}/>
                    })
                }
                <Button colorScheme='transparent' className='text-drop-filtering text-left' w='310px' onClick={(event) => {
                    setShowAddConsultationType(true);
                }}>+ Додати тип послуг</Button>
                {
                    showAddConsultationType && <AddConsultationType showAddConsultationTypeState={[showAddConsultationType, setShowAddConsultationType]}/> 
                }
                </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </VStack>
}

const Calendar = () => {
	const role = useSelector((state) => state.api.role);
	const userId = useSelector((state) => state.api.userId);
    const [consultations, setConsultations] = useState([]);
    const [isLoading, setIsLoading] = useState();

    const dispatch = useDispatch();

    const calendarHeaderConfig = {
        isPast: {
            title: 'dayHeaderTitlePast',
            numeric: 'dayHeaderNumericPast',
            circle: 'dayHeaderCircleTransparent'
        },
        isToday: {
            title: 'dayHeaderTitleToday',
            numeric: 'dayHeaderNumericToday',
            circle: 'dayHeaderCircleToday'
        },
        isFuture: {
            title: 'dayHeaderTitleFuture',
            numeric: 'dayHeaderNumericFuture',
            circle: 'dayHeaderCircleTransparent'
        },
    };

    const getConsultationsList = async () => {
        setIsLoading(true);
        const consultationsList = await dispatch(getConsultations(userId, role));
        console.log("consultationsList", consultationsList)
        setConsultations([...consultationsList]);
        setIsLoading(false);
    }
	useEffect(() => {
		getConsultationsList();
	}, []);

    console.log(userId)
    return (
		<Box className='page-body'>
            <VStack align='left' spacing={10}>
                <Text className='heading-large'>Мій календар</Text>
			    <Box>
                    <Flex align='top'>
                        <Box>
                        {
                            role === 'consultant' && <ConsultantSettings/>
                        }
                        </Box>
                        <Flex><Box w={10}></Box></Flex>
                        <Flex grow='1' direction='column'>
                        {
                            <Skeleton isLoaded ={!isLoading}>
                            <FullCalendar 
                                locale='uk'
                                plugins={[ timeGridPlugin ]}
                                timeZone= 'UTC'
                                initialView= 'timeGridWeek'
                                themeSystem= 'bootstrap5'
                                allDaySlot={false}
                                slotDuration={'00:60:00'}
                                eventMinHeight={'60px'}
                                dayHeaderContent={(args) => {
                                    const {date, isPast, isToday, isFuture, text} = args;
                                    const tense = Object.keys(args).find(item => 
                                        (item === 'isPast' || item === 'isToday' || item === 'isFuture') &&
                                        args[item] === true);
                                    const dayNames = text.split(' ');
                                    const dayTitle = dayNames[0];
                                    const dayNumeric = dayNames[1]?.split('.')[0];
                                    return <Box className='dayHeaderCustom'><VStack spacing={3}>
                                        <Text className={calendarHeaderConfig[tense].title}>{dayTitle}</Text>
                                        {dayNumeric && <Circle w='44px' h='44px' className={calendarHeaderConfig[tense].circle}>
                                        <Text className={calendarHeaderConfig[tense].numeric}>{dayNumeric}</Text>
                                        </Circle >}
                                    </VStack></Box>
                                }}
                                dayHeaderDidMount={() => {}}
                                headerToolbar= {{
                                  left: 'prev,next today',
                                  center: 'title',
                                  right: 'timeGridWeek,timeGridDay'
                                }}
                                buttonText={{
                                    today: 'Сьогодні',
                                    week: 'Тиждень',
                                    day: 'День',
                                }}
                                titleFormat={{
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                }}
                                eventTextColor='#2D3748'
                                eventBorderColor='#E2E8F0'
                                eventBackgroundColor='#FFFFFF'
                                eventMouseEnter={(info) => {
                                    info.jsEvent.preventDefault();
                                    info.el.style.borderColor = '#DD6B20';
                                }}
                                eventMouseLeave={(info) => {
                                    info.jsEvent.preventDefault();
                                    info.el.style.borderColor = '#E2E8F0';
                                }}
                                eventContent ={(info) => {
                                    console.log(info)
                                    return <Popover>
                                    <PopoverTrigger>
                                        {/* <Button colorScheme='transparent'> */}
                                            <VStack w='100%' align='left'>
                                                <Text className='fc-event-title'>{info.event._def.title}</Text>
                                                <Text className='fc-event-time'>{info.timeText}</Text>
                                            </VStack>
                                        {/* </Button> */}
                                    </PopoverTrigger>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverBody>
                                        <VStack w='100%' align='left' spacing={3}>
                                            <VStack align='left'>
                                                <Text className='event-popover-header'>{info.event._def.title}</Text>
                                                <Text className='event-popover-time'>{(new Date(info.event._instance.range.start)).toLocaleDateString()}</Text>
                                            </VStack>
                                            <VStack align='left'>
                                                <Text className='event-popover-title'>{role === 'user' ? 'Консультант' : 'Клієнт'}</Text>
                                                <Text className='event-popover-name'>{`${info.event._def.extendedProps[role === 'user' ? 'consultant' : 'user'].surname} ${info.event._def.extendedProps[role === 'user' ? 'consultant' : 'user'].name}`}</Text>
                                            </VStack>
                                            <VStack align='left'>
                                                <Text className='event-popover-title'>Проблема</Text>
                                                <Text className='event-popover-issue'>{`${info.event._def.extendedProps.issue || 'Клієнт не залишив подробиць'}`}</Text>
                                            </VStack>
                                        </VStack>
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Popover>
                                  }}
                                events={consultations}
                                /> 
                            </Skeleton>
                        }
                        </Flex>
                    </Flex>
			    </Box>
            </VStack>
        </Box>
    )
} 

export default Calendar;
