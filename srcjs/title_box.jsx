import { reactShinyInput } from 'reactR'
import React, { useState, useEffect, useRef } from 'react'
import SvgIcon from './components/SvgIcon'

const themeColors = {
	explorer: '#a3b0d1',
	ecology: '#73ad80',
	housing: '#e08565',
	health: '#cd718c',
	transport: '#c9c3fa',
	climate: '#f5d574',
	urban: '#adb033',
	demographics: '#9e9090',
	economy: '#beaf62',
	resources: '#dca656',
	land: '#7baaaa',
}

function TitleTextBox({ configuration, value, setValue }) {
	// State to handle visibility of the menu
	const boxRef = useRef(null)
	const [boxVisible, setBoxVisible] = useState(true)
	const [isExtraVisible, setExtraVisible] = useState(false)
	const [lang, setLang] = useState('en')

	const [configState, setConfigState] = useState(() => {
		return configuration
	})

	// This effect will listen for changes in the configuration prop
	// and update the configState accordingly
	useEffect(() => {
		const newConfig = {
			...configuration,
			// Convert configuration.show to boolean
			show: configuration.show === 'true',
		}

		setConfigState((prevConfig) => ({
			...prevConfig,
			...newConfig,
		}))

		// If configuration.show is true, force the box to be visible
		if (newConfig.show) {
			setBoxVisible(true)
		}
	}, [configuration])

	// update boxVisible when configuration.show changes
	useEffect(() => {
		setBoxVisible(configState.show)
	}, [configState.show])

	// update lang when configuration.lang changes
	useEffect(() => {
		setLang(configState.lang)
	}, [configState.lang])

	// Update boxVisible when there is a click outside of the box
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (boxRef.current && !boxRef.current.contains(event.target)) {
				setBoxVisible(false)
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	// Function to decode html entities (configuration is encoded)
	function decodeHtml(html) {
		var txt = document.createElement('textarea')
		txt.innerHTML = html
		return txt.value
	}

	return (
		boxVisible && (
			<div
				className='title-text-box landing'
				style={{
					width: isExtraVisible
						? configState.maxWidth
						: configState.minWidth,
					backgroundColor:
						themeColors[
							configState.theme.toLowerCase().split(' ')[0]
						],
				}}
				ref={boxRef}
			>
				<div className='title-text-box__top'>
					<SvgIcon
						theme_lowercased={
							configState.theme.toLowerCase().split(' ')[0]
						}
						size={'25px'}
						color={'white'}
					/>
					<h3
						className='title-text-box__title'
						dangerouslySetInnerHTML={{
							__html: decodeHtml(configState.title_text_title),
						}}
					/>
					<div
						className='title-text-box__close'
						onClick={() => setBoxVisible(false)}
					>
						X
					</div>
				</div>
				<div className='content'>
					<div
						className='title-text-box__main'
						dangerouslySetInnerHTML={{
							__html: decodeHtml(configState.title_text_main),
						}}
					/>
					{isExtraVisible && (
						<div
							className='title-text-box__extra'
							dangerouslySetInnerHTML={{
								__html: decodeHtml(
									configState.title_text_extra
								),
							}}
						/>
					)}
				</div>
				<div className='button-container'>
					<button onClick={() => setExtraVisible(!isExtraVisible)}>
						{isExtraVisible
							? configState.lang === 'fr'
								? 'EN LIRE MOINS'
								: 'READ LESS'
							: configState.lang === 'fr'
							? 'EN LIRE PLUS'
							: 'READ MORE'}
					</button>
				</div>
			</div>
		)
	)
}

export default function initTitleTextBox() {
	reactShinyInput('.title_box', 'cc.landing.title_box', TitleTextBox)
}
