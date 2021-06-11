import { Box, Flex, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { placemark } from '../../../../types/placemark'
import { FarmerForm, MapComponent } from '../../components'

const FarmerAddToMap: FC = () => {
	const [placemark, setPlacemark] = useState<placemark | null>(null)

	return (
		<Flex justifyContent='space-between'>
			<Box w='49%'>
				<Text fontSize='3xl' align='center'>
					Дабавить товары на карту
				</Text>
				<FarmerForm setPlacemarkToMap={setPlacemark} />
			</Box>
			<Box h='600px' w='50%'>
				<MapComponent placemark={placemark} />
			</Box>
		</Flex>
	)
}

export default FarmerAddToMap
