import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { Flex, Spacer, Box, HStack, VStack, StackDivider, Text, Select, Button, Image, IconButton } from '@chakra-ui/react'
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
import {getSlots} from  '../store/apiSlice'

import { HamburgerIcon } from '@chakra-ui/icons'

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

    return (
		<Box className='page-body'>
            <VStack align='left' spacing={10}>
				<Text className='heading-large'>Мій календар</Text>
                {
                    role === 'consultant' && <ConsultantSettings/>
                }
            </VStack>
        </Box>
    )
} 

export default Calendar;
