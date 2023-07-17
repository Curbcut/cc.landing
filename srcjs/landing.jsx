import { reactShinyInput } from 'reactR'
import './styles/style.scss'
import { useState, createContext } from 'react'
import Nav from './components/Nav'
import ThemesMenu from './components/ThemesMenu'
import Footer from './components/Footer'
import ChooseMap from './components/ChooseMap'
import Lenis from '@studio-freight/lenis'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/pages/Main'
import About from './components/pages/About'
import Team from './components/pages/Team'

// Create a Language context to be used with the useContext hook. This will allow us to pass the language
// to any component without having to pass it through props.
export const LanguageContext = createContext()

const Landing = ({ configuration, value, setValue }) => {
	// Set language
	const [lang, setLang] = useState('en')

	// Map over configuration to modify everything to JSON
	configuration = Object.fromEntries(
		Object.entries(configuration).map(([key, value]) => {
			if (typeof value === 'string') {
				try {
					value = JSON.parse(value)
				} catch (e) {}
			}
			return [key, value]
		})
	)

	const pages = configuration.pages

	// Get all unique the themes from the pages.json file
	let themes = []
	pages.forEach((page) => {
		if (!themes.includes(page.theme)) {
			themes.push(page.theme)
		}
	})
	// Sort and place the explorer last
	themes = themes.sort((a, b) => {
		if (a === 'Explorer') return 1
		if (b === 'Explorer') return -1
		return a.localeCompare(b)
	})

	// Smooth scroll
	const lenis = new Lenis()

	// Setup the lenis scroll
	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	// Start the lenis scroll
	requestAnimationFrame(raf)

	return (
		<div className='landing'>
			<LanguageContext.Provider value={{ lang, configuration }}>
				<Router>
					<Nav lenis={lenis} setLang={setLang} />
					<div id='main-content'>
						<ThemesMenu
							lenis={lenis}
							pages={pages}
							themes={themes}
							setValue={setValue}
						/>
						<Routes>
							<Route
								path='/'
								element={<Main lenis={lenis} lang={lang} />}
							/>
							<Route path='/about' element={<About />} />
							<Route path='/team' element={<Team />} />
						</Routes>
						<ChooseMap lenis={lenis} />
					</div>
					<Footer
						lang={lang}
						pages={pages}
						themes={themes}
						setValue={setValue}
					/>
				</Router>
			</LanguageContext.Provider>
		</div>
	)
}

reactShinyInput('.landing', 'cc.landing.landing', Landing)
