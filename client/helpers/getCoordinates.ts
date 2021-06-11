import axios from 'axios'
import { placemark } from '../types/placemark'

const getCoordinates = async (address: string): Promise<placemark> => {
	let addr: string = ''
	let stringCoordinates: string[] = []
	let coordinates: number[] = []
	await axios(
		`https://geocode-maps.yandex.ru/1.x?geocode=${address}&apikey=02130a82-c368-4497-b079-9609641139cd&format=json`
	).then(response => {
		addr =
			response.data.response.GeoObjectCollection.featureMember[0].GeoObject
				.metaDataProperty.GeocoderMetaData.text
		stringCoordinates =
			response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
				.split(' ')
				.reverse()
	})
	coordinates = stringCoordinates.map(coord => parseFloat(coord))
	return { address: addr, coordinates }
}

export default getCoordinates
