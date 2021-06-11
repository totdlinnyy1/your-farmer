import { FC, useState, useEffect } from 'react'
import { YMaps, Map, ZoomControl, Placemark } from 'react-yandex-maps'
import { Box } from '@chakra-ui/react'

interface Props {
	placemark: {
		coordinates: number[]
		address: string
	} | null
}

const MapComponent: FC<Props> = ({ placemark }) => {
	const [center, setCenter] = useState<number[]>([55.75, 37.57])
	const [placemarkCoordinates, setPlacemarkCoordinates] =
		useState<number[] | null>(null)
	useEffect(() => {
		if (placemark) {
			setPlacemarkCoordinates(placemark.coordinates)
			setCenter(placemark.coordinates)
		}
	}, [placemark])
	return (
		<YMaps>
			<Box w='100%' h='100%'>
				<Map
					defaultState={{ center, zoom: 9 }}
					state={{ center, zoom: 9 }}
					width='100%'
					height='100%'
				>
					{placemarkCoordinates && (
						<Placemark geometry={placemarkCoordinates} />
					)}
					<ZoomControl />
				</Map>
			</Box>
		</YMaps>
	)
}

export default MapComponent
