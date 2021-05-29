import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
	isOpen: boolean
	onClose: () => void
	headerText: string
}

const ModalWindow: FC<Props> = ({ isOpen, onClose, headerText, children }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={true}
			isCentered={true}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					<Text fontSize='2xl'>{headerText}</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
			</ModalContent>
		</Modal>
	)
}

export default ModalWindow
