import { Box, Flex, Text } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { placemark } from '../../../../types/placemark'
import { FarmerForm, MapComponent } from '../../components'

const FarmerAddToMap: FC = () => {
	const [placemark, setPlacemark] = useState<placemark | null>(null)
	const isSmallerThen800 = useMediaQuery({ maxDeviceWidth: 800 })
	return (
		<Flex
			justifyContent='space-between'
			flexDirection={isSmallerThen800 ? 'column' : undefined}
		>
			<Box w={isSmallerThen800 ? '100%' : '49%'}>
				<Text fontSize='3xl' align='center'>
					Дабавить товары на карту
				</Text>
				<FarmerForm setPlacemarkToMap={setPlacemark} />
			</Box>
			<Box h='600px' w={isSmallerThen800 ? '100%' : '50%'}>
				<MapComponent placemark={placemark} />
			</Box>
		</Flex>
	)
}

export default FarmerAddToMap
