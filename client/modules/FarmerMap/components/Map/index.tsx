import { FC } from 'react'
import { YMaps, Map, SearchControl, ZoomControl } from 'react-yandex-maps'
import { Box } from '@chakra-ui/react'

const MapComponent: FC = () => {
	return (
		<YMaps query={{ apikey: '02130a82-c368-4497-b079-9609641139cd' }}>
			<Box w='100%' h='100%'>
				<Map
					defaultState={{ center: [55.75, 37.57], zoom: 9 }}
					width='100%'
					height='100%'
				>
					<SearchControl options={{ noPlacemark: true }} />
					<ZoomControl />
				</Map>
			</Box>
		</YMaps>
	)
}

export default MapComponent
