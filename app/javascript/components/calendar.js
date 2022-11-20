import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Spacer, Box, HStack, VStack, StackDivider, Text, Select, Button, Image, IconButton, Circle  } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid' 
import timeGridPlugin from '@fullcalendar/timegrid';

import {getSlots} from  '../store/apiSlice'

import { HamburgerIcon } from '@chakra-ui/icons'

import 'bootstrap/dist/css/bootstrap.css';

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

const WorkingHoursSlot = ({day, time}) => {
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
        {
            time.map(item => {
                return <Text className='slot-duration'>{`${item.from} - ${item.to}`}</Text> 
            })
        }
        {/* <Text className='slot-duration'>{time}</Text> */}

        </CardBody>
    </Card>
}

const ConsultantSettings = () => {
    const [workingHours, setWorkingHours] = useState([]);
    const [showAddHours, setShowAddHours] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getWorkingSlots = async () => {
			const slots = await dispatch(getSlots());
			console.log("workingHours", slots)
			setWorkingHours([...slots]);
		}
		getWorkingSlots();
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
                    workingHours.map((item) => {
                        return <WorkingHoursSlot day={item.day} time={item.time}/>
                    })
                }
                <Button colorScheme='transparent' className='text-drop-filtering text-left' w='310px' onClick={(event) => {
                    setShowAddHours(true);
                }}>+ Додати робочі години</Button>
                {
                    showAddHours && <AddWorkingHours showAddHoursState={[showAddHours, setShowAddHours]}/>
                }
                </VStack>
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </VStack>
}
const Calendar = () => {
	const role = useSelector((state) => state.api.role);
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
                            <FullCalendar 
                                locale='uk'
                                plugins={[ timeGridPlugin ]}
                                timeZone= 'UTC'
                                initialView= 'timeGridWeek'
                                themeSystem= 'bootstrap5'
                                allDaySlot={false}
                                dayHeaderContent={(args) => {
                                    const {date, isPast, isToday, isFuture, text} = args;
                                    console.log("arg", args)
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
                                dayHeaderDidMount={() => {console.log('dayHeaderDidMount')}}
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
                                }}/>
                        </Flex>
                    </Flex>
			    </Box>
            </VStack>
        </Box>
    )
} 

export default Calendar;
