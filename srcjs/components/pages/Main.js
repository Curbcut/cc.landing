import Translate from '../Translate.js'
import React, { useEffect, useRef, useState } from 'react'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import SvgIcon from '../SvgIcon'
import { useContext } from 'react'
import { LanguageContext } from '../../landing'

// Component for each discover cards
function DiscoverCard({ card, lang }) {
	return (
		<a className='card' href='/'>
			<div className='card__img'>
				<img src={card.img} alt={card[lang]} />
			</div>
			<div className={`card__title bg-${card.theme}`}>{card[lang]}</div>
		</a>
	)
}

// Component for each news cards
function NewsCard({ card, lang }) {
	return (
		<div className='swiper-slide news'>
			<SvgIcon theme_lowercased={card.icon} size='32px' />
			<div className='news__title'>{card[`title_${lang}`]}</div>
			<div className='news__description'>{card[`text_${lang}`]}</div>
			<a className='cta-text cta-text--underline' href='/'>
				<Translate str='Read more' />
			</a>
		</div>
	)
}

function Main({ lenis }) {
	const contextValue = useContext(LanguageContext)
	const lang = contextValue.lang
	const configState = contextValue.configState
	if (!configState) {
		return null
	}
	const discover_cards = configState.discover_cards
	const news_cards = configState.news_cards

	if (discover_cards.length > 4) {
		console.error('discover_cards should not have a length higher than 4!')
	}

	// Setup the video sources
	const placeholder_video_src =
		'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
	const video_src =
		'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

	// Setup the video
	const [isModalOpen, setIsModalOpen] = useState(false)
	const videoRef = useRef(null)

	// Create a function to play the video which is used on clicks
	const playVideo = () => {
		lenis.stop()
		setIsModalOpen(true)
	}

	const closeModal = () => {
		lenis.start()
		setIsModalOpen(false)
	}

	const handleDialogClick = (event) => {
		if (!videoRef.current.contains(event.target)) {
			closeModal()
		}
	}

	// Create a ref object which will be used on the swiper element
	const sliderRef = useRef(null)

	// Create a function to setup the swiper element with the swiper library
	const setupSlider = (element) => {
		if (element) {
			const slidesCount = element.querySelectorAll('.swiper-slide').length
			if (slidesCount > 3) {
				element.classList.add('swiper-is-enabled')
			}
			new Swiper(element, {
				modules: [Navigation],
				allowSlidePrev: true,
				allowSlideNext: true,
				navigation: {
					prevEl: '#swipe-cta-prev',
					nextEl: '#swipe-cta-next',
				},
				slidesPerView: 1.3,
				slidesOffsetBefore: 23,
				slidesOffsetAfter: 20 * slidesCount,
				spaceBetween: 68,
				breakpoints: {
					768: {
						slidesOffsetBefore: 0,
						slidesOffsetAfter: 0,
						slidesPerView: 3,
					},
				},
			})
		}
	}

	// Call setupSlider with the ref's current value (div id news-slider)
	useEffect(() => {
		setupSlider(sliderRef.current)
	}, [])

	return (
		<React.Fragment>
			<main>
				<div className='hero'>
					<h1 className='h1 main-title'>
						<div className='main-title__first-part'>
							<Translate str='EXPLORE<br />URBAN' />
						</div>
						<div className='main-title__video' onClick={playVideo}>
							<video autoPlay muted loop playsInline>
								<source
									src={placeholder_video_src}
									type='video/mp4'
								/>
							</video>
						</div>
						<span className='main-title__second-part'>
							<Translate str={'SUSTAIN&shy;ABILITY'} />
						</span>
					</h1>

					{[...Array(5)].map((e, i) => (
						<span key={i} className='dot'></span>
					))}
				</div>

				<section className='section section-about'>
					<div>
						<span className='section__title'>
							<Translate str='About us' />
						</span>
					</div>
					<div>
						<div className='h3'>
							<Translate str='Curbcut is a platform for deep, dynamic, and intuitive exploration of urban sustainability.' />
						</div>

						<a
							href='/about'
							className='cta-text cta-text--underline'
						>
							<Translate str='More about Curbcut' />
						</a>
					</div>
				</section>

				<section className='section section-discover'>
					<div>
						<span className='section__title'>
							<Translate str='Discover' />
						</span>
						{/* <a
							className='cta-text cta-text--underline'
							href='/discover'
						>
							<Translate str='View all' />
						</a> */}
					</div>
					<div className='section-discover__cards-wrapper'>
						{discover_cards.map((card) => (
							<DiscoverCard
								key={card.id}
								card={card}
								lang={lang}
							/>
						))}
					</div>
				</section>

				<section className='section section-news'>
					<div>
						<span className='section__title'>
							<Translate str='Latest news' />
						</span>
					</div>
					<div>
						<div id='swipe-cta-prev' className='swipe-cta'>
							<img
								src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC40MDA2IDE0LjQwMDFMMTQuNDAwNiAxMC40ODVDMTQuNDAwNiA5Ljk5NjM4IDE0Ljc5NjkgOS42MDAwNiAxNS4yODU1IDkuNjAwMDZMMTkuMiA5LjYwMDA2TDE5LjIgNS42ODQ5NUMxOS4yIDUuMTk2MzUgMTkuNTk2MyA0LjgwMDAzIDIwLjA4NDkgNC44MDAwM0wyNCA0LjgwMDAzTDI0IDBMMTkuMiAtMi4wOTgxNmUtMDdMMTkuMiAzLjkxNTEyQzE5LjIgNC40MDM3MiAxOC44MDM3IDQuODAwMDMgMTguMzE1MSA0LjgwMDAzTDE1LjI4NDkgNC44MDAwM0MxNC45OTMzIDQuODAwMDMgMTQuNjQwOSA0LjgwMDI3IDE0LjQwNDEgNC44MDA0NkwxNC40MDQxIDYuMjI4MzdMMTQuNDAwNiA2LjIyODM3TDE0LjQwMDYgOC43MTUxNUMxNC40MDA2IDkuMjAzNzUgMTQuMDA0MyA5LjYwMDA2IDEzLjUxNTcgOS42MDAwNkwxMC40ODU1IDkuNjAwMDZDOS45OTY4NiA5LjYwMDA2IDkuNjAwNTQgOS4yMDM3NSA5LjYwMDU0IDguNzE1MTVMOS42MDA1NCA2LjIyODM3TDkuNTk3MTcgNi4yMjgzN0w5LjU5NzE3IDQuODAzOTlMNy44MTY3OCA0LjgwMzk5TDcuODE2NzggNC44MDA2Nkw1LjY4NDc5IDQuODAwNjZDNS4xOTYxOSA0LjgwMDY2IDQuNzk5ODggNC40MDQzNSA0Ljc5OTg4IDMuOTE1NzVMNC43OTk4OCAwLjAwMDYzMDc3TC0wLjAwMDE1NDQ5NSAwLjAwMDYzMDU2TC0wLjAwMDE1NDcwNSA0LjgwMDY2TDMuOTE0OTYgNC44MDA2NkM0LjQwMzU2IDQuODAwNjYgNC43OTk4OCA1LjE5Njk4IDQuNzk5ODggNS42ODU1OEw0Ljc5OTg4IDkuNjAwNjlMOC43MTQ5OSA5LjYwMDY5QzkuMjAzNTkgOS42MDA2OSA5LjU5OTkxIDkuOTk3MDEgOS41OTk5MSAxMC40ODU2TDkuNTk5OTEgMTQuNDAwN0wxNC40MDA2IDE0LjQwMDdMMTQuNDAwNiAxNC40MDAxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+'
								alt=''
								width='32'
								height='19'
							/>
						</div>
						<div id='swipe-cta-next' className='swipe-cta'>
							<img
								src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC40MDA2IDE0LjQwMDFMMTQuNDAwNiAxMC40ODVDMTQuNDAwNiA5Ljk5NjM4IDE0Ljc5NjkgOS42MDAwNiAxNS4yODU1IDkuNjAwMDZMMTkuMiA5LjYwMDA2TDE5LjIgNS42ODQ5NUMxOS4yIDUuMTk2MzUgMTkuNTk2MyA0LjgwMDAzIDIwLjA4NDkgNC44MDAwM0wyNCA0LjgwMDAzTDI0IDBMMTkuMiAtMi4wOTgxNmUtMDdMMTkuMiAzLjkxNTEyQzE5LjIgNC40MDM3MiAxOC44MDM3IDQuODAwMDMgMTguMzE1MSA0LjgwMDAzTDE1LjI4NDkgNC44MDAwM0MxNC45OTMzIDQuODAwMDMgMTQuNjQwOSA0LjgwMDI3IDE0LjQwNDEgNC44MDA0NkwxNC40MDQxIDYuMjI4MzdMMTQuNDAwNiA2LjIyODM3TDE0LjQwMDYgOC43MTUxNUMxNC40MDA2IDkuMjAzNzUgMTQuMDA0MyA5LjYwMDA2IDEzLjUxNTcgOS42MDAwNkwxMC40ODU1IDkuNjAwMDZDOS45OTY4NiA5LjYwMDA2IDkuNjAwNTQgOS4yMDM3NSA5LjYwMDU0IDguNzE1MTVMOS42MDA1NCA2LjIyODM3TDkuNTk3MTcgNi4yMjgzN0w5LjU5NzE3IDQuODAzOTlMNy44MTY3OCA0LjgwMzk5TDcuODE2NzggNC44MDA2Nkw1LjY4NDc5IDQuODAwNjZDNS4xOTYxOSA0LjgwMDY2IDQuNzk5ODggNC40MDQzNSA0Ljc5OTg4IDMuOTE1NzVMNC43OTk4OCAwLjAwMDYzMDc3TC0wLjAwMDE1NDQ5NSAwLjAwMDYzMDU2TC0wLjAwMDE1NDcwNSA0LjgwMDY2TDMuOTE0OTYgNC44MDA2NkM0LjQwMzU2IDQuODAwNjYgNC43OTk4OCA1LjE5Njk4IDQuNzk5ODggNS42ODU1OEw0Ljc5OTg4IDkuNjAwNjlMOC43MTQ5OSA5LjYwMDY5QzkuMjAzNTkgOS42MDA2OSA5LjU5OTkxIDkuOTk3MDEgOS41OTk5MSAxMC40ODU2TDkuNTk5OTEgMTQuNDAwN0wxNC40MDA2IDE0LjQwMDdMMTQuNDAwNiAxNC40MDAxWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+'
								alt=''
								width='32'
								height='19'
							/>
						</div>
						<div
							id='news-slider'
							className='swiper'
							ref={sliderRef}
						>
							<div className='swiper-wrapper'>
								{news_cards.map((card) => (
									<NewsCard
										key={card.id}
										card={card}
										lang={lang}
									/>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
			{isModalOpen && (
				<dialog id='video-modal' open onClick={handleDialogClick}>
					<div id='video-modal-close-btn' onClick={closeModal}>
						<img
							src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNCAzNCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTI2LjMxNSA5LjM0MyA5LjM0NCAyNi4zMTRsLTEuNzE4LTEuNzE4IDE2Ljk3MS0xNi45N3oiLz4KICA8cGF0aCBmaWxsPSIjMDAwIiBkPSJtOS4zNDQgNy42MjcgMTYuOTcgMTYuOTctMS43MTcgMS43MTgtMTYuOTctMTYuOTd6Ii8+Cjwvc3ZnPg=='
							alt=''
							width='34'
							height='34'
						/>
					</div>
					<video ref={videoRef} controls autoPlay>
						<source src={video_src} type='video/mp4' />
					</video>
				</dialog>
			)}
		</React.Fragment>
	)
}

export default Main
