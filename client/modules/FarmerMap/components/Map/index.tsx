import { FC, useState, useEffect } from 'react'
import {
	YMaps,
	Map,
	SearchControl,
	ZoomControl,
	Clusterer,
	Placemark
} from 'react-yandex-maps'
import { Box } from '@chakra-ui/react'
import { GetAllOrdersQuery } from '../../../../generated/graphql'

interface Props {
	orders?: GetAllOrdersQuery
	focusPlacemark: number[]
	setFocusOrder: (orderId: number) => void
}

const MapComponent: FC<Props> = ({ orders, focusPlacemark, setFocusOrder }) => {
	const [center, setCenter] = useState<number[]>([55.75, 37.57])

	useEffect(() => {
		if (focusPlacemark.length) {
			setCenter(focusPlacemark)
		}
	}, [focusPlacemark])
	return (
		<YMaps query={{ apikey: '02130a82-c368-4497-b079-9609641139cd' }}>
			<Box w='100%' h='100%'>
				<Map
					defaultState={{ center: [55.75, 37.57], zoom: 9 }}
					state={{ center, zoom: 9 }}
					width='100%'
					height='100%'
				>
					<SearchControl options={{ noPlacemark: true }} />
					<ZoomControl />
					<Clusterer>
						{orders?.getAllOrders.map(order => (
							<Placemark
								defaultGeometry={order.placemark.coordinates}
								key={order.id}
								defaultProperties={{
									hintContent: 'Нажмите, чтобы узнать подробнее'
								}}
								onClick={() => setFocusOrder(order.id)}
							/>
						))}
					</Clusterer>
				</Map>
			</Box>
		</YMaps>
	)
}

export default MapComponent
