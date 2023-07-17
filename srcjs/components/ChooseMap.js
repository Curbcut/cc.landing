import React, { useEffect, useRef } from 'react'
import Translate from './Translate'

function ChooseMap({ lenis }) {
	const chooseMapRef = useRef()

	const handleChooseMapClick = () => {
		const categoriesMenu = document.getElementById('categories-menu')
		lenis.stop()
		document.body.classList.add('bg-background')
		if (categoriesMenu) {
			categoriesMenu.classList.add('is-visible')
		}
	}

	useEffect(() => {
		const categoriesMenu = document.getElementById('categories-menu')

		const handleCloseCtaClick = () => {
			lenis.start()
			document.body.classList.remove('bg-background')
			if (categoriesMenu) {
				categoriesMenu.classList.remove('is-visible')
			}
		}

		const closeCta = categoriesMenu
			? categoriesMenu.querySelector('.close-cta')
			: null
		if (closeCta) {
			closeCta.addEventListener('click', handleCloseCtaClick)
		}

		// Clean up the event listener on component unmount
		return () => {
			if (closeCta) {
				closeCta.removeEventListener('click', handleCloseCtaClick)
			}
		}
	}, [lenis]) // Empty dependency array to run this effect only once on component mount

	return (
		<div
			id='choose-map-mobile-cta'
			ref={chooseMapRef}
			onClick={handleChooseMapClick}
			style={{ cursor: 'pointer' }}
		>
			<Translate str='Choose your map' />
		</div>
	)
}

export default ChooseMap
