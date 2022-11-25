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
import {getSlots, getConsultations, getSchedules, getConsultationTypes, createSchedule, createConsultationType, deleteConsultation, deleteConsultationType, deleteWorkingHours} from  '../store/apiSlice'
import { useDisclosure } from '@chakra-ui/react'

import { HamburgerIcon } from '@chakra-ui/icons'

import 'bootstrap/dist/css/bootstrap.css';
import { add } from '@hotwired/stimulus';


const DeleteDialog = ({header, showModal}) => {
    const { isOpen, onOpen, onClose } = useDisclosure({isOpen: showModal})
    const cancelRef = React.useRef()
  
    return (
      <>
        <Button colorScheme='red' onClick={onOpen}>
          Delete Customer
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Видалити 
              </AlertDialogHeader>
  
              <AlertDialogBody>
                    Ви впевнені, що хочете видалити?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                    Скасувати
                </Button>
                <Button colorScheme='red' onClick={() => {
                    
                }} ml={3}>
                    Видалити
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

const AddConsultationType = ({showAddConsultationTypeState, addTypesState}) => {
    const [showAddConsultationType, setShowAddConsultationType] = showAddConsultationTypeState;
    const [addTypes, setAddTypes] = addTypesState;

    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();

    return <VStack className='filtering-panel' spacing={7}>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Назва</Text>
        <Box w='310px'>
            <Input onChange={(event) => {
                setTitle(event.target.value);
            }}/>
        </Box>
        </VStack>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Тривалість (хв)</Text>
        <Box w='310px'>
            <Input onChange={(event) => {
                setDuration(event.target.value);
            }}/>
        </Box>
        </VStack>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>Опис (необов'язково)</Text>
        <Box w='310px'>
            <Textarea onChange={(event) => {
                setDescription(event.target.value);
            }}/>
        </Box>
        </VStack>
        <HStack>
            <Button className='cancel-button' onClick={() => {
                setShowAddConsultationType();
            }}>Скасувати</Button>
            <Button className='text-drop-filtering consultant-tab' onClick={() => {
                setShowAddConsultationType();
                setAddTypes({title: title, description: description, duration: duration})
            }}>Зберегти</Button>
        </HStack>
    </VStack>
}

const TypesSlot = ({title, duration, description, id, deleteTypesState}) => {
    const [deleteTypes, setDeleteTypes] = deleteTypesState;
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
                    <MenuItem onClick={() => 
                        setDeleteTypes({id: id})
                    }>
                        Видалити 
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
       <Text className='slot-duration'>{`${duration} хв.`}</Text> 
        <Text className='slot-description'>{description}</Text>
        </CardBody>
    </Card>
}

const AddWorkingHours = ({showAddHoursState, addHoursState}) => {
    const [showAddHours, setShowAddHours] = showAddHoursState;
    const [addHours, setAddHours] = addHoursState;
    const [day, setDay] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();


    return <VStack className='filtering-panel' spacing={7}>
        <VStack>
        <Text className='text-filtering-panel' w='310px'>День</Text>
        <Box w='310px'>
            <Select className='select-item' placeholder='Не обрано' onChange={(event) => {
                setDay(event.target.value);
            }} >
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
                <Input placeholder='Не обрано'  type="time" onChange={(event) => {
                    console.log("start-time",event.target.value )
                    setStartTime(event.target.value);
                }} />
            </VStack>
            <VStack>
                <Text className='from-to' w='155px'>до</Text>
                <Input placeholder='Не обрано'  type="time" onChange={(event) => {
                    console.log("end-time",event.target.value )
                    setEndTime(event.target.value);
                }}/>
            </VStack>
        </HStack>
        </VStack>
        <HStack>
            <Button className='cancel-button' onClick={() => {
                setShowAddHours();

            }}>Скасувати</Button>
            <Button className='text-drop-filtering consultant-tab' onClick={() => {
                setShowAddHours();
                setAddHours({end_time: endTime, start_time: startTime, day: day});
            }}>Зберегти</Button>
        </HStack>
    </VStack>
}

const WorkingHoursSlot = ({day, start, end, id, deleteHoursState}) => {
    const [deleteHours, setDeleteHours] = deleteHoursState;

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
                    <MenuItem onClick={() => {
                        setDeleteHours({id: id});
                    }}>
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
    const [isLoadingTypes, setIsLoadingTypes] = useState();
    const [isLoadingHours, setIsLoadingHours] = useState();
    const [schedules, setSchedules] = useState([]);

    const [addHours, setAddHours] = useState();
    const [addTypes, setAddTypes] = useState();

    const [deleteHours, setDeleteHours] = useState();
    const [deleteTypes, setDeleteTypes] = useState();

	const dispatch = useDispatch();

    const getSchedulesList = async () => {
        setIsLoadingHours(true);
        const schedulesList = await dispatch(getSchedules(1));
        setSchedules([...schedulesList])
        setIsLoadingHours();
    }

    const addSchedule = async () => {
        const schedulesList = await dispatch(createSchedule({consultant_id: 1, ...addHours}));
    }

    const addConsultationTypes = async () => {
        const typesList = await dispatch(createConsultationType({consultant_id: 1, ...addTypes}));
    }

	const getConsultationTypesList = async () => {
        setIsLoadingTypes(true);
		const consultationTypesList = await dispatch(getConsultationTypes(`${1}`));
		setConsultationTypes([...consultationTypesList]);
        setIsLoadingTypes();
	}

    const deleteSchedules = async () => {
		const consultationTypesList = await dispatch(deleteWorkingHours({id: deleteHours.id}));
	}

    const deleteConsultationTypes= async () => {
		const consultationTypesList = await dispatch(deleteConsultationType({id: deleteTypes.id}));
	}

    useEffect(() => {
		getConsultationTypesList();
        getSchedulesList();
    }, []);

    useEffect(() => {
        addSchedule();
		getSchedulesList();
    }, [addHours])

    
    useEffect(() => {
        addConsultationTypes();
		getConsultationTypesList();
    }, [addTypes])


    useEffect(() => {
        deleteSchedules();
		getSchedulesList();
    }, [deleteHours])

    useEffect(() => {
        deleteConsultationTypes();
		getConsultationTypesList();
    }, [deleteTypes])

    return <VStack className='filtering-panel' align='left' spacing={5}>
        <Tabs variant='soft-rounded'>
            <TabList justifyContent='space-between'>
                <Tab className='consultant-tab'>Робочі години</Tab>
                <Tab className='consultant-tab'>Типи послуг</Tab>
            </TabList>
            <TabPanels>
                <TabPanel className='tab-calendar'>
                <VStack  align='left' spacing={3}>
                <VStack>
                    <SkeletonText isLoaded={!isLoadingHours}>
                    {
                        schedules.map((item) => {
                            return <WorkingHoursSlot {...item} deleteHoursState={[deleteHours, setDeleteHours]} />
                        })
                    }
                    </SkeletonText >
                 </VStack>
                <Button colorScheme='transparent' className='text-drop-filtering text-left' w='310px' onClick={(event) => {
                    setShowAddHours(true);
                }}> + Додати робочі години</Button>
                {
                    showAddHours && <AddWorkingHours showAddHoursState={[showAddHours, setShowAddHours]} addHoursState={[addHours, setAddHours]} />
                }
                </VStack>
                </TabPanel>
                <TabPanel>
                <VStack  align='left' spacing={3}>
                <SkeletonText isLoaded={!isLoadingTypes}>
                {
                    consultationTypes.map((item) => {
                        return <TypesSlot {...item} deleteTypesState={[deleteTypes, setDeleteTypes]} />
                    })
                }
                 </SkeletonText >
                <Button colorScheme='transparent' className='text-drop-filtering text-left' w='310px' onClick={(event) => {
                    setShowAddConsultationType(true);
                }}>+ Додати тип послуг</Button>
                {
                    showAddConsultationType && <AddConsultationType addTypesState={[addTypes, setAddTypes]} showAddConsultationTypeState={[showAddConsultationType, setShowAddConsultationType]}/> 
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
    const [deleteConsultationById, setDeleteConsultationById] = useState();

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

    const deleteConsultationFromCalendar = async () => {
        const consultationsList = await dispatch(deleteConsultation({id: deleteConsultationById.id}));
    }

	useEffect(() => {
		getConsultationsList();
	}, []);

    useEffect(() => {
        deleteConsultationFromCalendar();
		getConsultationsList();
	}, [deleteConsultationById]);

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
                                            <VStack align='left'>
                                                <Button variant='outline' onClick={() => {
                                                    setDeleteConsultationById({id: info.event._def.extendedProps.consultation_id})
                                                }}>Скасувати консультацію</Button>
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
