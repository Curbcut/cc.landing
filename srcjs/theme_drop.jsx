import { reactShinyInput } from 'reactR'
import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	createContext,
} from 'react'
import Translate from './components/theme_drop/Translate'
import ThemeMenu from './components/theme_drop/ThemeMenu'
import { translation_df } from './data/translation.js'

// Create a Language context to be used with the useContext hook. This will allow us to pass the language
// to any component without having to pass it through props.
export const LanguageContext = createContext()

function ThemeDropdown({ configuration, value, setValue }) {
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

	// Set language
	const [lang, setLang] = useState('en')

	// Set configState
	const [configState, setConfigState] = useState(() => {
		let state = Object.fromEntries(
			Object.entries(configuration).map(([key, value]) => {
				if (typeof value === 'string') {
					try {
						value = JSON.parse(value)
					} catch (e) {}
				}
				return [key, value]
			})
		)
		// if translation_df is available in the configuration, concatenate it with translation_df from translation.js
		if (state.translation_df) {
			state.translation_df = state.translation_df.concat(translation_df)
		}
		return state
	})

	// This effect will listen for changes in the configuration prop
	// and update the configState accordingly
	// Map over configuration to modify everything to JSON
	useEffect(() => {
		let parsedConfiguration = Object.fromEntries(
			Object.entries(configuration).map(([key, value]) => {
				if (typeof value === 'string') {
					try {
						value = JSON.parse(value)
					} catch (e) {}
				}
				return [key, value]
			})
		)
		// if translation_df is available in the configuration, concatenate it with translation_df from translation.js
		if (parsedConfiguration.translation_df) {
			parsedConfiguration.translation_df =
				parsedConfiguration.translation_df.concat(translation_df)
		}

		setConfigState((prevConfig) => ({
			...prevConfig,
			...parsedConfiguration,
		}))
	}, [configuration])

	// Update the language
	useEffect(() => {
		if (configState.lang === undefined) return

		setLang(configState.lang)
	}, [configState])

	const theme_lowercased = useMemo(
		() => configState.theme.toLowerCase().split(' ')[0],
		[configState.theme]
	)

	// Create a reference to the categories menu
	const categoriesMenuRef = useRef()

	// State to hold the currently open category
	const [openTheme, setopenTheme] = useState(null)

	// State to handle visibility of the menu
	const [menuVisible, setMenuVisible] = useState(false)

	// Reference to the button that controls the menu
	const buttonRef = useRef(null)

	// Handle click outside function to close the menu if clicked outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (
				categoriesMenuRef.current &&
				!categoriesMenuRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setMenuVisible(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [categoriesMenuRef, buttonRef])

	return (
		<LanguageContext.Provider value={{ lang, configState }}>
			<div className='landing' style={{ backgroundColor: 'transparent' }}>
				{/* Styled button */}
				<button
					ref={buttonRef}
					style={{
						width: configState.width,
						height: '35px',
						borderRadius: menuVisible ? '15px 15px 0 0' : '15px',
						border: menuVisible
							? '1px solid #282828'
							: '1px solid #282828',
						borderBottom: menuVisible
							? 'none'
							: '1px solid #282828',
						background: themeColors[theme_lowercased],
						display: 'flex',
						alignItems: 'center',
						padding: '5px',
						cursor: 'default', // Change cursor style to default here
					}}
				>
					{/* Logo button */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
						}}
						onClick={(e) => {
							e.stopPropagation() // prevent the main button's onClick event from firing
							setValue({
								event: 'page_link',
								page: 'home',
								// timestamp to trigger a reactive update
								timestamp: Date.now(),
							})
						}}
					>
						{/* SVG Curbcut logo */}
						<svg
							style={{ margin: '0 10px' }}
							width='15px'
							height='15px'
							viewBox='0 0 15 15'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M14.677 5.68012V2.87005H12.7026C12.2654 2.87005 11.9114 2.51526 11.9114 2.07707V0.105225H2.83602V2.08132C2.83602 2.5195 2.48203 2.8743 2.04483 2.8743H0.0661621V11.9717H2.04483C2.48203 11.9717 2.83602 12.3265 2.83602 12.7646V14.7478H11.9114V12.7646C11.9114 12.3265 12.2654 11.9717 12.7026 11.9717H14.677V9.1616H11.8733V11.1448C11.8733 11.5829 11.5193 11.9377 11.0821 11.9377H3.66246C3.22527 11.9377 2.87128 11.5829 2.87128 11.1448V3.70827C2.87128 3.27008 3.22527 2.91529 3.66246 2.91529H11.0821C11.5193 2.91529 11.8733 3.27008 11.8733 3.70827V5.68012H14.677Z'
								fill='black'
							/>
						</svg>
					</div>

					{/* Vertical Line */}
					<div
						style={{
							height: '70%',
							borderLeft: '1px solid black',
							marginLeft: '0px',
							marginRight: '0px',
						}}
					/>

					{/* Label and Caret button */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
							width: '100%',
						}}
						onClick={() => setMenuVisible(!menuVisible)} // onClick event for label and caret
					>
						{/* Label */}
						<h2
							style={{
								margin: '0 10px',
								fontFamily: '_AcidGrotesk',
								fontSize: '1.6rem',
							}}
						>
							<Translate str={configState.theme} />
						</h2>

						{/* Caret */}
						<svg
							className='caret_land'
							style={{
								width: '14px',
								marginRight: '12px',
								marginLeft: 'auto',
								transform: menuVisible
									? 'rotateX(180deg)'
									: 'rotateX(0deg)', // apply rotation based on menuVisible state
							}}
							width='24'
							height='15'
							viewBox='0 0 24 15'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M14.4006 14.4001L14.4006 10.485C14.4006 9.99638 14.7969 9.60006 15.2855 9.60006L19.2 9.60006L19.2 5.68495C19.2 5.19635 19.5963 4.80003 20.0849 4.80003L24 4.80003L24 0L19.2 -2.09816e-07L19.2 3.91512C19.2 4.40372 18.8037 4.80003 18.3151 4.80003L15.2849 4.80003C14.9933 4.80003 14.6409 4.80027 14.4041 4.80046L14.4041 6.22837L14.4006 6.22837L14.4006 8.71515C14.4006 9.20375 14.0043 9.60006 13.5157 9.60006L10.4855 9.60006C9.99686 9.60006 9.60054 9.20375 9.60054 8.71515L9.60054 6.22837L9.59717 6.22837L9.59717 4.80399L7.81678 4.80399L7.81678 4.80066L5.68479 4.80066C5.19619 4.80066 4.79988 4.40435 4.79988 3.91575L4.79988 0.00063077L-0.000154495 0.00063056L-0.000154705 4.80066L3.91496 4.80066C4.40356 4.80066 4.79988 5.19698 4.79988 5.68558L4.79988 9.60069L8.71499 9.60069C9.20359 9.60069 9.59991 9.99701 9.59991 10.4856L9.59991 14.4007L14.4006 14.4007L14.4006 14.4001Z'
								fill='black'
							/>
						</svg>
					</div>
				</button>

				<div
					id='inapp-categories-menu'
					data-lenis-prevent
					ref={categoriesMenuRef}
					style={{ display: menuVisible ? 'block' : 'none' }}
				>
					<nav className='categories-nav'>
						<ThemeMenu
							openTheme={openTheme}
							setopenTheme={setopenTheme}
							categoriesMenuRef={categoriesMenuRef}
							theme_lowercased={theme_lowercased}
							setValue={setValue}
						/>
					</nav>
				</div>
			</div>
		</LanguageContext.Provider>
	)
}

export default function initThemeDropdown() {
	reactShinyInput('.theme_drop', 'cc.landing.theme_drop', ThemeDropdown)
}
