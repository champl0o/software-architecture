import React from 'react';
import { Stack, HStack, VStack, Text, Box, Select } from '@chakra-ui/react'
import {
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
} from '@chakra-ui/react'
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/react'

const ConsultantsList = () => {
	return <VStack className='filtering-panel' align='left' style={{'vertical-align': 'top'}} spacing={5}>
		{/* <InputGroup>
			<InputLeftElement
				pointerEvents='none'
				children={<div/>}
			/>
			<Input type='tel' placeholder='Phone number' />
		</InputGroup> */}
	</VStack>
}

const FilteringPanel = () => {
	return <VStack className='filtering-panel' align='left' spacing={5}>
		<HStack justify='space-between'>
			<Text className='heading-medium'>Фільтр</Text>
			<Text className='text-drop-filtering'>Скинути всі</Text>
		</HStack>
		<Box>Space for badges</Box>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Спеціалізація</Text>
			<Select placeholder='Не обрана'/>
		</VStack>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Місто проживання</Text>
			<Select placeholder='Не обрана'/>
		</VStack>
		<VStack className='filtering-panel' align='left'>
			<Text className='text-filtering-panel'>Рейтинг</Text>
			<RangeSlider aria-label={['min', 'max']} min={0} max={5} defaultValue={[0, 5]}>
				<RangeSliderTrack>
					<RangeSliderFilledTrack />
				</RangeSliderTrack>
				<RangeSliderThumb index={0} />
				<RangeSliderThumb index={1} />
			</RangeSlider>
		<Text className='text-filtering-panel'>Обраний діапазон: </Text>
		</VStack>
	</VStack>
}

const Consultants = () => {
	console.log('here')
	return (
		<HStack>
			<VStack align='left' spacing={10}>
				<Text className='heading-large'>Консультанти</Text>
				<HStack>
					<FilteringPanel/>
					<ConsultantsList/>
				</HStack>
			</VStack>
		</HStack>
	)
}

export default Consultants;