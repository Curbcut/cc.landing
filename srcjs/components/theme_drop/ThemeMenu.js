import React, { useEffect, useState, useMemo, useContext } from 'react'
import Translate from './Translate'
import SvgIcon from '../SvgIcon'
import { LanguageContext } from '../../theme_drop'

const ThemesMenu = ({
	openTheme,
	setopenTheme,
	categoriesMenuRef,
	theme_lowercased,
	setValue,
}) => {
	const contextValue = useContext(LanguageContext)
	const configState = contextValue.configState

	// Get all unique themes from the pages.json file
	const themes = useMemo(() => {
		let uniqueThemes = [
			...new Set(configState.pages.map((page) => page.theme)),
		]
		// Sort and place the explorer last
		uniqueThemes = uniqueThemes.sort((a, b) => {
			if (a === 'Explorer') return 1
			if (b === 'Explorer') return -1
			return a.localeCompare(b)
		})

		return uniqueThemes
	}, [configState.pages])

	const [themesMenu, setThemesMenu] = useState(null)

	// Change the background color of the categories menu when hovering over a theme
	const changeBackgroundColor = (event) => {
		const theme_lowercased = event.currentTarget.dataset.category
		if (categoriesMenuRef.current.dataset.theme) {
			// Remove the class for the old theme
			categoriesMenuRef.current.classList.remove(
				`bg-${categoriesMenuRef.current.dataset.theme}`
			)
		}
		// Add the class for the new theme
		categoriesMenuRef.current.classList.add(`bg-${theme_lowercased}`)
		// Update the theme stored in the data-theme attribute
		categoriesMenuRef.current.dataset.theme = theme_lowercased
	}

	// Clear the background color of the categories menu when leaving a theme
	const clearBackgroundColor = () => {
		if (categoriesMenuRef.current.dataset.theme) {
			categoriesMenuRef.current.classList.remove(
				`bg-${categoriesMenuRef.current.dataset.theme}`
			)
			categoriesMenuRef.current.dataset.theme = ''
		}
	}

	const handlePageLinkClick = (pageId) => {
		setValue({
			event: 'page_link',
			page: pageId,
			timestamp: Date.now(),
		})
	}

	// Control the home SVG color
	const [homeHovered, setHomeHovered] = useState(false)

	useEffect(() => {
		const handleToggle = (event) => {
			const currentCategory =
				event.currentTarget.parentNode.dataset.category

			if (currentCategory !== openTheme) {
				setopenTheme(currentCategory)
			}
		}

		setThemesMenu(
			themes.map((theme, i) => {
				const theme_pages = configState.pages
					.filter((page) => page.theme === theme)
					.map((page, j) => (
						<li
							key={j}
							onClick={() => handlePageLinkClick(page.id)}
							className='cta-text-lower'
						>
							<Translate str={page.nav_title} />
						</li>
					))

				const theme_lowercased = theme.toLowerCase().split(' ')[0]

				return (
					<details
						key={i}
						className='nav-item'
						data-category={theme_lowercased}
						open={openTheme === theme_lowercased}
						onMouseEnter={changeBackgroundColor}
						onMouseLeave={clearBackgroundColor}
					>
						<summary
							className='nav-item__category'
							onClick={handleToggle}
						>
							<span className='h4'>
								<Translate str={theme} />
								<svg
									className='caret_land'
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
							</span>
							<SvgIcon
								theme_lowercased={theme_lowercased}
								size={'25px'}
							/>
						</summary>
						<ul>{theme_pages}</ul>
					</details>
				)
			})
		)
	}, [openTheme, configState.pages, themes])

	return (
		<div>
			<details
				key='999'
				className='nav-item'
				data-category='home'
				open={openTheme === theme_lowercased}
				onMouseEnter={() => setHomeHovered(true)}
				onMouseLeave={() => setHomeHovered(false)}
			>
				<summary
					className='nav-item__category'
					onClick={() =>
						setValue({
							event: 'page_link',
							page: 'home',
							// timestamp to trigger a reactive update
							timestamp: Date.now(),
						})
					}
				>
					<span
						className='h4'
						style={{
							color: homeHovered ? 'white' : 'black',
						}}
					>
						<Translate str={configState.home_str} />
					</span>
					{/* SVG Curbcut logo */}
					<svg
						width='25px'
						height='25px'
						viewBox='0 0 15 15'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M14.677 5.68012V2.87005H12.7026C12.2654 2.87005 11.9114 2.51526 11.9114 2.07707V0.105225H2.83602V2.08132C2.83602 2.5195 2.48203 2.8743 2.04483 2.8743H0.0661621V11.9717H2.04483C2.48203 11.9717 2.83602 12.3265 2.83602 12.7646V14.7478H11.9114V12.7646C11.9114 12.3265 12.2654 11.9717 12.7026 11.9717H14.677V9.1616H11.8733V11.1448C11.8733 11.5829 11.5193 11.9377 11.0821 11.9377H3.66246C3.22527 11.9377 2.87128 11.5829 2.87128 11.1448V3.70827C2.87128 3.27008 3.22527 2.91529 3.66246 2.91529H11.0821C11.5193 2.91529 11.8733 3.27008 11.8733 3.70827V5.68012H14.677Z'
							fill={homeHovered ? 'white' : 'black'}
						/>
					</svg>
				</summary>
			</details>
			{themesMenu}
		</div>
	)
}

export default ThemesMenu
