import Translate from './Translate'
import { useContext } from 'react'
import { LanguageContext } from '../landing'
import { Link } from 'react-router-dom'

const ThemesDesktop = ({ themes, pages, setValue }) =>
	themes.map((theme, i) => {
		// List every page corresponding to the theme
		const theme_pages = pages
			.filter((page) => page.theme === theme)
			.map((page, j) => (
				<span
					key={`${i}-${j}`}
					onClick={() =>
						setValue({ event: 'page_link', page: page.id })
					}
					className='cta-text-lower'
				>
					<Translate str={page.nav_title} />
				</span>
			))

		return (
			<div className='column' key={i}>
				<div className='column__title'>
					<Translate str={theme} />
				</div>
				{theme_pages}
			</div>
		)
	})

// Define the ThemesMobile component
const ThemesMobile = ({ themes, pages, setValue }) =>
	themes.map((theme, i) => {
		// List every page corresponding to the theme
		const theme_pages = pages
			.filter((page) => page.theme === theme)
			.map((page, j) => (
				<span
					key={`${i}-${j}`}
					onClick={() =>
						setValue({ event: 'page_link', page: page.id })
					}
					className='cta-text-lower'
				>
					<Translate str={page.nav_title} />
				</span>
			))

		return (
			<details className='nav-item' key={i}>
				<summary className='nav-item__title'>
					<span className='h2'>
						<Translate str={theme} />
					</span>
					<span className='plus-sign'></span>
				</summary>
				<div>{theme_pages}</div>
			</details>
		)
	})

function Footer({ themes, pages, setValue }) {
	const contextValue = useContext(LanguageContext)
	const lang = contextValue.lang
	const configState = contextValue.configState
	if (!configState) {
		return null
	}
	const collabs = configState.collabs

	const cities = [
		{
			id: 'Montréal',
			href: 'https://montreal.curbcut.ca',
			src: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5MyAzOCI+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGQ9Ik0yMi44NzggMTguODU3Yy0yLjI3OS0uMDAyLTQuMTI2LTEuODgtNC4xMjYtNC4xOTZWLS4wMDJIMFYxNC44NWMwIDIuMzE3IDEuODUgNC4xOTYgNC4xMzEgNC4xOTZIMTQuNDdjMi4yODEgMCA0LjEzMiAxLjg4IDQuMTMyIDQuMTk2djEwLjU2MmMwIDIuMzE3IDEuODUgNC4xOTYgNC4xMyA0LjE5Nkg5M1YxOC44NTdIMjIuODc4WiIgZmlsbD0iI0UwODU2NSIvPgogICAgPHBhdGggZD0iTTIyLjE0MiAyMi4yOTVoMi4zNmwzLjYyMyAxMC41MTRoLjAzNGwzLjYyNC0xMC41MTRoMi4zNTl2MTIuMzI5aC0xLjU3OXYtNy44NTZjMC0uNzA1LjAxOC0xLjQxLjAxOC0yLjExNGgtLjAzNGwtMy40ODYgOS45N2gtMS44MzlsLTMuNDg2LTkuOTdoLS4wMzRjMCAuNzA1LjAxOCAxLjQxLjAxOCAyLjExNHY3Ljg1NkgyMi4xNHYtMTIuMzNoLjAwMVpNMzUuNzE5IDI5Ljc4MmMwLTMuMjU5IDIuMDk5LTUuMTA4IDQuNzM0LTUuMTA4IDIuNjM2IDAgNC43MzQgMS44NSA0LjczNCA1LjEwOCAwIDMuMjU4LTIuMDk4IDUuMTA3LTQuNzM0IDUuMTA3LTIuNjM1IDAtNC43MzQtMS44NS00LjczNC01LjEwOFptNC43MzQgMy43MzNjMS43MzQgMCAzLjEwNC0xLjI2OCAzLjEwNC0zLjczMyAwLTIuNDY2LTEuMzctMy43MzQtMy4xMDQtMy43MzRzLTMuMTAzIDEuMjY4LTMuMTAzIDMuNzM0YzAgMi40NjUgMS4zNyAzLjczMyAzLjEwMyAzLjczM1pNNDYuNTQgMjQuOTM4aDEuNTI2djEuODE0aC4wMzVjLjU3Mi0xLjI4NiAxLjY4Mi0yLjA3OCAzLjE1Ni0yLjA3OCAyLjAxMiAwIDMuMjI2IDEuNDYyIDMuMjI2IDQuMTM5djUuODEyaC0xLjU2MXYtNS42NTRjMC0yLjA5Ni0uOTAyLTIuODg4LTIuMTUtMi44ODgtMS4zNTMgMC0yLjY3Ljk1LTIuNjcgMy4yOTN2NS4yNDloLTEuNTZ2LTkuNjg3aC0uMDAyWk01Ny4yIDMyLjA3MXYtNS43MjRoLTEuOTA3di0xLjQxaDEuOTA4di0yLjY0MWgxLjU2djIuNjQyaDMuMDE5djEuNDA5aC0zLjAxOHY1LjcyNGMwIC44MjguNDE1IDEuMTQ1IDEuMTQ1IDEuMTQ1aDEuOTZ2MS40MDloLTIuMTM0Yy0xLjY2NSAwLTIuNTMyLS44NDYtMi41MzItMi41NTRaTTYyLjg5MSAyNC45MzhoMS41Mjd2MS42OTFoLjAzNGMuNDUxLTEuMDIyLjk3Mi0xLjY5MSAyLjQ5Ni0xLjY5MWguOTJ2MS40MDlINjYuNzRjLTEuNTk1IDAtMi4yODkuOTY5LTIuMjg5IDIuODE4djUuNDZoLTEuNTZ2LTkuNjg3Wk02Ny45ODEgMjkuNzgyYzAtMy4xMTggMS45MDgtNS4xMDggNC42NDgtNS4xMDggMi41NjYgMCA0LjUyNiAxLjcyNiA0LjUyNiA0LjU5N3YxLjAzOUg2OS42M2MuMTIxIDEuODE0IDEuMjE0IDMuMjA1IDMuMDM0IDMuMjA1IDEuMzE5IDAgMi4zNDEtLjcyMyAyLjcyMy0xLjg2N2gxLjY4MWMtLjM5OSAxLjkwMi0yLjEzMyAzLjI0LTQuNDA0IDMuMjQtMi44MDggMC00LjY4MS0yLjAyNi00LjY4MS01LjEwOGwtLjAwMi4wMDJabTcuNTQzLS44MjhjMC0xLjcyNi0xLjA3NS0yLjkwNi0yLjg0My0yLjkwNi0xLjc2OSAwLTIuODA5IDEuMjY4LTMuMDE3IDIuOTA2aDUuODYyLS4wMDJabS0yLjI4OC03LjcxNWgxLjczNGwtMS43MzQgMi41ODloLTEuMzg4bDEuMzg4LTIuNTg5Wk04MS4xOTUgMzQuODljLTEuODIxIDAtMy4yNi0xLjA1Ny0zLjI2LTMuMDY1IDAtMi4xODMgMS43MzMtMy4wMyAzLjYyMy0zLjAzaDEuNTA4Yy45NTQgMCAxLjQ0LS40MDQgMS40NC0xLjE2MiAwLTEuMDU3LS45NTQtMS41ODUtMi4xNS0xLjU4NS0xLjQwNSAwLTIuMzkzLjcyMi0yLjQ5NiAyLjAyNWgtMS41NjFjLjEzOS0yLjA2IDEuNDc0LTMuNCA0LjA1Ny0zLjRzMy43MSAxLjM5MiAzLjcxIDMuMjk0VjMyLjZjMCAuNDU4LjE1Ni42MTYuNjA3LjYxNmguNDM0djEuNDA5aC0xLjAyM2MtLjkxOSAwLTEuNDkxLS41NjMtMS40OTEtMS40NDR2LS41NjNoLS4wMzVjLS42MDcgMS41NS0xLjg1NSAyLjI3MS0zLjM2MyAyLjI3MVptLjI5NC0xLjM3NWMxLjU3OSAwIDMuMDE3LTEuMDU3IDMuMDE3LTMuMzI4di0xLjA5MmgtLjAzNWMtLjMyOS43MDUtLjkzNSAxLjA1Ny0yLjA5OCAxLjA1N2gtLjc4Yy0xLjQ5MiAwLTIuMDMuNzkyLTIuMDMgMS42NzMgMCAuODguNTU1IDEuNjkyIDEuOTI2IDEuNjkydi0uMDAyWk04OC4yNDMgMjAuODY5aDEuNTZ2MTMuNzU2aC0xLjU2VjIwLjg2OVpNMTUuOTgxIDcuOTIzVjUuMzVoLTEuNzg1YS43Mi43MiAwIDAgMS0uNzE1LS43MjdWMi44MTVINS4yNzZ2MS44MTFhLjcyLjcyIDAgMCAxLS43MTUuNzI3SDIuNzcydjguMzM1aDEuNzg5YS43Mi43MiAwIDAgMSAuNzE1LjcyNnYxLjgxN2g4LjIwNXYtMS44MTdhLjcyLjcyIDAgMCAxIC43MTUtLjcyNmgxLjc4NXYtMi41NzVoLTIuNTM0djEuODE3YS43Mi43MiAwIDAgMS0uNzE2LjcyNkg2LjAyM2EuNzIuNzIgMCAwIDEtLjcxNS0uNzI2VjYuMTE3YS43Mi43MiAwIDAgMSAuNzE1LS43MjdoNi43MDhhLjcyLjcyIDAgMCAxIC43MTYuNzI3djEuODA2aDIuNTM0WiIgZmlsbD0iIzAwMCIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoOTN2MzhIMHoiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgo8L3N2Zz4=',
			alt: 'Curbcut Montréal',
		},
		{
			id: 'Toronto',
			href: 'https://toronto.curbcut.ca',
			src: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4NiAzOCI+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2EpIj4KICAgIDxwYXRoIGQ9Ik0yMy4wODUgMTguNzVjLTIuMjc5LS4wMDItNC4xMjctMS44NjktNC4xMjctNC4xNzFWMEguMTk4djE0Ljc2OGMwIDIuMzA0IDEuODUgNC4xNzIgNC4xMzIgNC4xNzJIMTQuNjc0YzIuMjgxIDAgNC4xMzIgMS44NjkgNC4xMzIgNC4xNzJ2MTAuNTAxYzAgMi4zMDMgMS44NSA0LjE3MiA0LjEzMyA0LjE3Mkg4NlYxOC43NUgyMy4wODVaIiBmaWxsPSIjNzNBRDgwIi8+CiAgICA8cGF0aCBkPSJNMjYuMzkzIDIzLjYyMkgyMi4yM1YyMi4xN2g5Ljk0djEuNDUzaC00LjE2NHYxMC44MDZoLTEuNjEzVjIzLjYyMlpNMzAuODE2IDI5LjYxM2MwLTMuMjQgMi4xLTUuMDc5IDQuNzM2LTUuMDc5IDIuNjM3IDAgNC43MzYgMS44MzkgNC43MzYgNS4wNzkgMCAzLjI0LTIuMSA1LjA3OS00LjczNiA1LjA3OS0yLjYzOCAwLTQuNzM2LTEuODQtNC43MzYtNS4wOFptNC43MzYgMy43MTJjMS43MzUgMCAzLjEwNS0xLjI2IDMuMTA1LTMuNzEycy0xLjM3LTMuNzEzLTMuMTA1LTMuNzEzYy0xLjczNSAwLTMuMTA1IDEuMjYxLTMuMTA1IDMuNzEzczEuMzcgMy43MTIgMy4xMDUgMy43MTJaTTQxLjY0IDI0Ljc5N2gxLjUyN3YxLjY4MWguMDM0Yy40NTItMS4wMTYuOTcyLTEuNjgxIDIuNDk4LTEuNjgxaC45MnYxLjRINDUuNDljLTEuNTk2IDAtMi4yOS45NjQtMi4yOSAyLjgwM3Y1LjQzaC0xLjU2di05LjYzM1pNNDYuNzIgMjkuNjEzYzAtMy4yNCAyLjEtNS4wNzkgNC43MzYtNS4wNzkgMi42MzcgMCA0LjczNiAxLjgzOSA0LjczNiA1LjA3OSAwIDMuMjQtMi4xIDUuMDc5LTQuNzM2IDUuMDc5LTIuNjM2IDAtNC43MzYtMS44NC00LjczNi01LjA4Wm00LjczNiAzLjcxMmMxLjczNSAwIDMuMTA1LTEuMjYgMy4xMDUtMy43MTJzLTEuMzctMy43MTMtMy4xMDUtMy43MTNjLTEuNzM0IDAtMy4xMDQgMS4yNjEtMy4xMDQgMy43MTNzMS4zNyAzLjcxMiAzLjEwNCAzLjcxMlpNNTcuNTQ2IDI0Ljc5N2gxLjUyN1YyNi42aC4wMzRjLjU3My0xLjI3OSAxLjY4Mi0yLjA2NyAzLjE1Ny0yLjA2NyAyLjAxMyAwIDMuMjI3IDEuNDU0IDMuMjI3IDQuMTE2djUuNzhINjMuOTN2LTUuNjIzYzAtMi4wODQtLjkwMi0yLjg3Mi0yLjE1LTIuODcyLTEuMzU0IDAtMi42NzIuOTQ1LTIuNjcyIDMuMjc1djUuMjJoLTEuNTZ2LTkuNjMzaC0uMDAyWk02OC4yMSAzMS44OXYtNS42OTJoLTEuOTA4di0xLjQwMWgxLjkwOFYyMi4xN2gxLjU2MnYyLjYyN2gzLjAxOXYxLjRoLTMuMDJ2NS42OTNjMCAuODIyLjQxNiAxLjEzOCAxLjE0NiAxLjEzOGgxLjk2djEuNDAxaC0yLjEzM2MtMS42NjYgMC0yLjUzNC0uODQtMi41MzQtMi41NFpNNzMuMDk0IDI5LjYxM2MwLTMuMjQgMi4xLTUuMDc5IDQuNzM2LTUuMDc5IDIuNjM3IDAgNC43MzYgMS44MzkgNC43MzYgNS4wNzkgMCAzLjI0LTIuMSA1LjA3OS00LjczNiA1LjA3OS0yLjYzNiAwLTQuNzM2LTEuODQtNC43MzYtNS4wOFptNC43MzYgMy43MTJjMS43MzUgMCAzLjEwNS0xLjI2IDMuMTA1LTMuNzEyUzc5LjU2NSAyNS45IDc3LjgzIDI1LjljLTEuNzM0IDAtMy4xMDQgMS4yNjEtMy4xMDQgMy43MTNzMS4zNyAzLjcxMiAzLjEwNCAzLjcxMlpNMTYuMTg1IDcuODc4di0yLjU2aC0xLjc4NmEuNzE5LjcxOSAwIDAgMS0uNzE1LS43MjJWMi44SDUuNDc2djEuOGMwIC4zOTktLjMyLjcyMi0uNzE2LjcyMkgyLjk3djguMjg4aDEuNzljLjM5NiAwIC43MTYuMzIzLjcxNi43MjN2MS44MDZoOC4yMDh2LTEuODA2YzAtLjQuMzItLjcyMy43MTUtLjcyM2gxLjc4NnYtMi41NmgtMi41Mzd2MS44MDdjMCAuMzk5LS4zMi43MjItLjcxNi43MjJoLTYuNzFhLjcxOS43MTkgMCAwIDEtLjcxNi0uNzIyVjYuMDgyYzAtLjQuMzItLjcyMi43MTYtLjcyMmg2LjcxYy4zOTYgMCAuNzE2LjMyMy43MTYuNzIydjEuNzk2aDIuNTM3WiIgZmlsbD0iIzAwMCIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYSI+CiAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0wIDBoODZ2MzhIMHoiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgo8L3N2Zz4=',
			alt: 'Curbcut Toronto',
		},
	]

	return (
		<footer>
			<div className='footer__banner'>
				<img
					src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDIwOCI+CiAgPHBhdGggZD0iTTEzMy4wOTggODMuMTk5aDMzLjI5NVY0OS45MjRjMC00LjI5NSAzLjkwMS04LjMyNyA4LjIwOC04LjMyN2gzMy4zOTRWMGwtNDEuNjA3LjAyN3YzMy41NzFjMCA0LjI5NS0zLjg2OCA3Ljk5OS04LjE4IDcuOTk5aC0yOC4xNjdjLTEuOTQ1IDAtMi45MjYtMi4zNS0xLjU1Ni0zLjczMWw1LjIwNS01LjI1NC0yOS42ODUtMjkuNTc3LTI5LjY4NCAyOS41NzcgNS4xODggNS4yNmMxLjM2NSAxLjM4Ni4zODQgMy43My0xLjU2MSAzLjczSDUwLjA5M2MtNC4zMTIgMC04LjUwOC0zLjI3Ni04LjUwOC03LjU3Vi4wMjZIMHY0MS41NzVoMzMuNzA2YzQuMzEyIDAgNy44NzMgNC4wMzIgNy44NzMgOC4zMjd2MzMuMjc1aDMzLjYzYzQuMzExIDAgNy45NzcgNC4yMDggNy45NzcgOC41MDN2MjUuMDE5YzAgNC4yOTUtMy42NjYgOC4wNzUtNy45NzggOC4wNzVsLTMzLjY0NS0uMDU1djMzLjI3YzAgNC4yOTUtMy41NSA4LjM4Mi03Ljg1NyA4LjM4MkgwdjQxLjU2OWg0MS41OHYtMzMuNTcxYzAtNC4yOTUgNC4xOTYtNy45OTggOC41MDgtNy45OThoMzMuMDk4di0zMy4zNTJjMC00LjI5NSA0LjEwMy04LjI1IDguNDEtOC4yNWgyNS4xMTVjNC4zMTIgMCA4LjA3NiAzLjk1NSA4LjA3NiA4LjI1djMzLjM1MmgzMy40MjZjNC4zMTIgMCA4LjE4IDMuNzAzIDguMTggNy45OThWMjA4SDIwOHYtNDEuNjAyaC0zMy4zOTRjLTQuMzEyIDAtOC4yMDctNC4wMzgtOC4yMDctOC4zMjd2LTMzLjI3aC0zMy4yOTVjLTQuMzEyIDAtOC4zMTItMy43OC04LjMxMi04LjA3NVY5MS4yNzRjLS4wMDUtNC4yOTUgMy45OTQtOC4wNzUgOC4zMDYtOC4wNzVabS0xNi4zODcgMEg5MS41OTZjLTQuMzEyIDAtOC40MS0zLjUyOC04LjQxLTcuODIzVjQ2Ljg1YzAtMS45NDQgMi4zNS0yLjkyNSAzLjczLTEuNTU1TDEwNCA2Mi4xOWwxNy4wNS0xNi44OWMxLjM4Ni0xLjM3IDMuNzM3LS4zODkgMy43MzcgMS41NTZ2MjguNTJjMCA0LjI5NS0zLjc3IDcuODIzLTguMDc2IDcuODIzWk00MTUuOTg0IDc2LjQxMyAzMzkuNzg3LjA0OWwtMjIuMjI1IDIyLjI3NGE3LjYzNiA3LjYzNiAwIDAgMS0xMC44MTggMEwyODQuNDc2IDAgMjA4IDc2LjY0M2wyMy4yNjggMjMuMzE5YzEuMzc3IDEuMzguNDA1IDMuNzQtMS41NDYgMy43NGgtMjEuNDQzdjYyLjcyNGgzMy44NGM0LjIyMyAwIDcuNjQ4IDMuNDMzIDcuNjQ4IDcuNjY2VjIwOGg0MS40ODl2LTMzLjkwOGMwLTQuMjMzIDMuNDI1LTcuNjY2IDcuNjQ4LTcuNjY2aDI2LjE5MmM0LjIyMyAwIDcuNjQ4IDMuNDMzIDcuNjQ4IDcuNjY2VjIwOGg0MS40ODl2LTMzLjkwOGMwLTQuMjMzIDMuNDI1LTcuNjY2IDcuNjQ4LTcuNjY2aDMzLjg0di02Mi43MjRoLTIxLjY3M2MtMS45NDUgMC0yLjkyMy0yLjM2LTEuNTQ2LTMuNzRMNDE2IDc2LjQxMmgtLjAxNlpNMjQxLjg3MyA5OS45NjJsNjQuODIyLTY0Ljk2NGE3LjYzNCA3LjYzNCAwIDAgMSAxMC44MTcgMGw2NC44MjMgNjQuOTY0YzEuMzc3IDEuMzguNDA0IDMuNzQtMS41NDYgMy43NGgtNi41NzN2NTUuMDU5YzAgNC4yMzItMy40MjUgNy42NjUtNy42NDggNy42NjVoLTI2LjE5MWMtNC4yMjQgMC03LjY0OS0zLjQzMy03LjY0OS03LjY2NXYtNTUuMDU5aC00MS40ODl2NTUuMDU5YzAgNC4yMzItMy40MjUgNy42NjUtNy42NDggNy42NjVoLTI2LjE5MmMtNC4yMjMgMC03LjY0OC0zLjQzMy03LjY0OC03LjY2NXYtNTUuMDU5aC02LjM0M2MtMS45NDUgMC0yLjkyMy0yLjM2LTEuNTQ2LTMuNzRoLjAxMVpNMTQ1NiA4My4yaC0zMy45M2E3LjY2OCA3LjY2OCAwIDAgMS03LjY3LTcuNjdWNDEuNmgtMzMuOTNhNy42NjggNy42NjggMCAwIDEtNy42Ny03LjY3VjBoLTQxLjZ2NDEuNmgzMy45M2M0LjIzIDAgNy42NyAzLjQzNSA3LjY3IDcuNjd2MjYuMjZjMCA0LjIzNS0zLjQ0IDcuNjctNy42NyA3LjY3SDEyNDh2NDEuNmgxMTcuMTNjNC4yMyAwIDcuNjcgMy40MzUgNy42NyA3LjY2OXYyNi4yNjJjMCA0LjIzNC0zLjQ0IDcuNjY5LTcuNjcgNy42NjloLTMzLjkzVjIwOGg0MS42di0zMy45MzFhNy42NjggNy42NjggMCAwIDEgNy42Ny03LjY2OWgzMy45M3YtMzMuOTMxYTcuNjY4IDcuNjY4IDAgMCAxIDcuNjctNy42NjlIMTQ1NlY4My4yWm0tNDEuNiA3LjY3djI2LjI2MWMwIDQuMjM0LTMuNDQgNy42NjktNy42NyA3LjY2OWgtMjYuMjZhNy42NjggNy42NjggMCAwIDEtNy42Ny03LjY2OVY5MC44NjljMC00LjIzNCAzLjQzLTcuNjY5IDcuNjctNy42NjloMjYuMjZjNC4yMyAwIDcuNjcgMy40MzUgNy42NyA3LjY3WiIgZmlsbD0iI0U5RUNFRiIvPgogIDxwYXRoIGQ9Ik0xMTY1LjUzIDc1LjM5MlYwaC00MS41MXY3NS4zOTJhNy42NTkgNy42NTkgMCAwIDEtNy42NiA3LjY1NUgxMDQxdjQxLjUyN2g3NS4zNmM0LjIzIDAgNy42NiAzLjQyOCA3LjY2IDcuNjU1djc1LjM5Mmg0MS41MXYtNzUuMzkyYTcuNjUgNy42NSAwIDAgMSA3LjY1LTcuNjU1aDc1LjM2VjgzLjA0N2gtNzUuMzZhNy42NSA3LjY1IDAgMCAxLTcuNjUtNy42NTVabTAgMTUuMzF2MjYuMjE2YTcuNjYgNy42NiAwIDAgMS03LjY2IDcuNjU2aC0yNi4yYTcuNjUgNy42NSAwIDAgMS03LjY1LTcuNjU2VjkwLjcwM2E3LjY1IDcuNjUgMCAwIDEgNy42NS03LjY1NmgyNi4yYzQuMjMgMCA3LjY2IDMuNDI5IDcuNjYgNy42NTZaIiBmaWxsPSIjRTlFQ0VGIi8+CiAgPHBhdGggZD0iTTEwODIuNTEgMEgxMDQxdjQxLjUyNmg0MS41MVYwWk0xMDgyLjUxIDE2Ni4wOTRIMTA0MXY0MS41MjdoNDEuNTF2LTQxLjUyN1pNMTI0OC41NCAwaC00MS41MXY0MS41MjZoNDEuNTFWMFpNMTI0OC41NCAxNjYuMDk0aC00MS41MXY0MS41MjdoNDEuNTF2LTQxLjUyN1pNODMzLjk4OSA0MS42MDFoLTMzLjkzMWE3LjY3IDcuNjcgMCAwIDEtNy42NjktNy42N1YwaC00MS42djMzLjkzMmE3LjY3IDcuNjcgMCAwIDEtNy42NjkgNy42N2gtMjYuMjYyYTcuNjcgNy42NyAwIDAgMS03LjY2OS03LjY3VjBoLTQxLjZ2MzMuOTMyYTcuNjcgNy42NyAwIDAgMS03LjY2OSA3LjY3SDYyNnY4My4xOTZoMzMuOTMxYTcuNjcgNy42NyAwIDAgMSA3LjY2OSA3LjY2OXYzMy45MzJoMzMuOTMxYTcuNjcgNy42NyAwIDAgMSA3LjY2OSA3LjY2OVYyMDhoNDEuNnYtMzMuOTMyYTcuNjcgNy42NyAwIDAgMSA3LjY2OS03LjY2OUg3OTIuNHYtMzMuOTMyYTcuNjcgNy42NyAwIDAgMSA3LjY2OS03LjY2OUg4MzRWNDEuNjAxaC0uMDExWk03NDMuMTI1IDE2Ni40aC0yNi4yNjFhNy42NyA3LjY3IDAgMCAxLTcuNjY5LTcuNjd2LTMzLjkzMWgtMzMuOTMxYTcuNjcgNy42NyAwIDAgMS03LjY2OS03LjY3VjQ5LjI3YTcuNjcgNy42NyAwIDAgMSA3LjY2OS03LjY2OWgyNi4yNjFhNy42NzEgNy42NzEgMCAwIDEgNy42NyA3LjY3djMzLjkzMWg0MS42VjQ5LjI3MWE3LjY3IDcuNjcgMCAwIDEgNy42NjktNy42N2gyNi4yNjFhNy42NzEgNy42NzEgMCAwIDEgNy42NyA3LjY3djY3Ljg1N2E3LjY3MSA3LjY3MSAwIDAgMS03LjY3IDcuNjdoLTMzLjkzdjMzLjkzMWE3LjY3MSA3LjY3MSAwIDAgMS03LjY3IDcuNjdaTTUzNC4wMTQgODMuMzc1aC00MS42ODh2NDAuMzg1aDQxLjY4OFY4My4zNzVaIiBmaWxsPSIjRTlFQ0VGIi8+CiAgPHBhdGggZD0iTTYyNiA3Ni42MzYgNTQ5LjA2NC4wNDkgNTI2LjYxMiAyMi40YTcuNzMgNy43MyAwIDAgMS0xMC44OTkgMEw0OTMuMjE2IDAgNDE2IDc2Ljg2NmwyMS44MDkgMjEuNzFhNy42NDUgNy42NDUgMCAwIDEgMCAxMC44NDlMNDE2IDEzMS4xMzQgNDkzLjIxNiAyMDhsMjIuNDk3LTIyLjRhNy43MyA3LjczIDAgMCAxIDEwLjg5OSAwbDIyLjQ1MiAyMi4zNDVMNjI2IDEzMS4zNTlsLTIyLjA0NS0yMS45NDVhNy42NDUgNy42NDUgMCAwIDEgMC0xMC44NUw2MjYgNzYuNjJ2LjAxN1ptLTExMC4zMzEgOTYuMjc5LTYzLjc4LTYzLjQ5YTcuNjQ1IDcuNjQ1IDAgMCAxIDAtMTAuODVsNjMuNzgtNjMuNDlhNy43MyA3LjczIDAgMCAxIDEwLjg5OSAwbDYzLjc4IDYzLjQ5YTcuNjQ1IDcuNjQ1IDAgMCAxIDAgMTAuODVsLTYzLjc4IDYzLjQ5YTcuNzMgNy43MyAwIDAgMS0xMC44OTkgMFpNOTk5LjU5OSAxMjQuNzA5bC0zMy4xMzYgNjYuNjY4Yy0yLjA2MSA0LjE0MS04LjI2NSAyLjY2NS04LjI2NS0xLjk2NHYtNzguMDkxYzAtMS45NTMgMi4zNS0yLjkzNSAzLjcyMy0xLjU1MmwzLjEzIDMuMTQ4IDI4LjQ2NC0yOC42MzQtMjIuMjM4LTIyLjM3MWMtMi45ODItMy0yLjk4Mi03Ljg2IDAtMTAuODZsMjIuMjM4LTIyLjM3TDk2NS4wNTEuMDUgOTQyLjkyMiAyMi4zMWE3LjYgNy42IDAgMCAxLTEwLjc5NSAwTDkwOS45NDkgMGwtMjguNDY0IDI4LjYzNCAyMi4yMzggMjIuMzdjMi45ODIgMyAyLjk4MiA3Ljg2IDAgMTAuODZsLTIyLjIzOCAyMi4zNyAyOC40NjQgMjguNjM0IDMuMTM1LTMuMTQyYzEuMzc0LTEuMzgyIDMuNzE4LS40MDEgMy43MTggMS41NTJ2NzguMTM1YzAgNC42MjktNi4yMDQgNi4xMDUtOC4yNjUgMS45NjRsLTMzLjEzNi02Ni42NjhIODM0TDg3NS40MDEgMjA4aDEyNC4xOThMMTA0MSAxMjQuNzA5aC00MS40MDFabS00MC43NzQtNjIuNzk2LTE1LjkwMyAxNS45OThjLTIuOTgyIDMtNy44MTMgMy0xMC43OTUgMGwtMTUuOTUyLTE2LjA0N2MtMi45ODItMy0yLjk4Mi03Ljg2IDAtMTAuODZsMTUuOTAzLTE1Ljk5N2MyLjk4Mi0zIDcuODEzLTMgMTAuNzk1IDBsMTUuOTUyIDE2LjA0N2MyLjk4MiAzIDIuOTgyIDcuODU5IDAgMTAuODU5Wm0tMTUuOTUyIDI4LjY5NCA5LjI5NSA5LjM1MWMxLjM3NCAxLjM4Mi40MDQgMy43NDYtMS41NDMgMy43NDZIOTI0LjMyYy0xLjk0MSAwLTIuOTE2LTIuMzY0LTEuNTQzLTMuNzQ2bDkuMjk2LTkuMzVjMi45ODItMyA3LjgxMi0zIDEwLjc5NCAwaC4wMDZaIiBmaWxsPSIjRTlFQ0VGIi8+Cjwvc3ZnPg=='
					alt=''
					loading='lazy'
				/>
			</div>
			<div className='footer__content'>
				<div className='footer__content-first-half'>
					<h3 className='h3'>
						<Translate str='Browse themes' />
					</h3>
					<div className='grid hidden-mobile'>
						<ThemesDesktop
							key={themes}
							themes={themes}
							pages={pages}
							setValue={setValue}
						/>
					</div>
					<div className='footer-mobile-nav'>
						<ThemesMobile
							key={themes}
							themes={themes}
							pages={pages}
							setValue={setValue}
						/>
					</div>
				</div>

				<div className='footer__content-second-half'>
					<div>
						<img
							className='curbcut-logo-footer'
							src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjYSkiIGZpbGw9IiNFOUVDRUYiPgogICAgPHBhdGggZD0iTTExNC42ODkgNTAuMTEyVjM2LjkxOEgwdjE4LjQ1OWgxMDkuNDIxYTUuMjA3IDUuMjA3IDAgMCAxIDUuMjA2IDUuMjA1djEwOS40MjFoMTguNDU5VjU1LjMxOGgtMTMuMTg4YTUuMjA3IDUuMjA3IDAgMCAxLTUuMjA1LTUuMjA2aC0uMDA0WiIvPgogICAgPHBhdGggZD0iTTE1MS42NzMgMTMuMVYwSDB2MTguNDU5aDE0Ni4zMzVhNS4yMDggNS4yMDggMCAwIDEgNS4yMDYgNS4yMDZWMTcwSDE3MFYxOC4zMDZoLTEzLjExOGE1LjIwOCA1LjIwOCAwIDAgMS01LjIwNi01LjIwNWgtLjAwM1oiLz4KICAgIDxwYXRoIGQ9Ik05Ni4xNjggMTEwLjQ0MVY5MS45ODJIODMuMTc1YTUuMjA3IDUuMjA3IDAgMCAxLTUuMjA2LTUuMjA1VjczLjgyOUgxOC4yMzN2MTIuOTgzYTUuMjA3IDUuMjA3IDAgMCAxLTUuMjA1IDUuMjA1SDB2NTkuNzQ2aDEzLjAyOGE1LjIwOCA1LjIwOCAwIDAgMSA1LjIwNSA1LjIwNnYxMy4wMjhINzcuOTd2LTEzLjAyOGE1LjIwOCA1LjIwOCAwIDAgMSA1LjIwNi01LjIwNmgxMi45OTN2LTE4LjQ1OWgtMTguNDZ2MTMuMDI4YTUuMjA4IDUuMjA4IDAgMCAxLTUuMjA1IDUuMjA2SDIzLjY2NWE1LjIwOCA1LjIwOCAwIDAgMS01LjIwNi01LjIwNlY5Ny40OWE1LjIwNyA1LjIwNyAwIDAgMSA1LjIwNi01LjIwNmg0OC44NDJhNS4yMDcgNS4yMDcgMCAwIDEgNS4yMDUgNS4yMDZ2MTIuOTQ4aDE4LjQ2bC0uMDA0LjAwM1oiLz4KICA8L2c+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImEiPgogICAgICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDE3MHYxNzBIMHoiLz4KICAgIDwvY2xpcFBhdGg+CiAgPC9kZWZzPgo8L3N2Zz4='
							alt=''
							width='170'
							height='170'
						/>
					</div>
					<div className='grid'>
						<div className='footer-mobile-nav'>
							<details className='nav-item'>
								<summary className='nav-item__title'>
									<span className='h2'>
										<Translate str='About' />
									</span>
									<span className='plus-sign'></span>
								</summary>
								<div>
									<Link to='/about'>
										<Translate str='About Curbcut' />
									</Link>
									<Link to='/team'>
										<Translate str='The Team' />
									</Link>
									<Link to='mailto:contact@curbcut.ca'>
										<Translate str='Contact Us' />
									</Link>
								</div>
							</details>
						</div>
						<div className='column hidden-mobile'>
							<div className='column__title'>
								<Translate str='About' />
							</div>
							<Link to='/about'>
								<Translate str='About Curbcut' />
							</Link>
							<Link to='/team'>
								<Translate str='The Team' />
							</Link>
							<Link to='mailto:contact@curbcut.ca'>
								<Translate str='Contact Us' />
							</Link>
						</div>

						<div className='column'>
							<div className='column__title'>
								<Translate str='Newsletter' />
							</div>
							<Translate str='Keep in touch!' />
							<form
								action='https://curbcut.us11.list-manage.com/subscribe/post?u=b9df261ebcf34acc88a4aab38&amp;id=5187f08559&amp;f_id=000196e0f0'
								method='post'
								id='mc-embedded-subscribe-form'
								name='mc-embedded-subscribe-form'
								className='validate'
								target='_blank'
							>
								<input
									type='email'
									name='EMAIL'
									className='required email'
									id='mce-EMAIL'
									placeholder={
										lang === 'en'
											? 'Email address'
											: 'Adresse courriel'
									}
									required
								/>
								<button type='submit' className='submit-btn'>
									<Translate str='GET UPDATES' />
								</button>
							</form>
						</div>

						<div className='column'>
							<div className='column__title'>
								<Translate str='Our collaborators' />
							</div>
							{collabs.map((collab) => (
								<img
									src={collab.img}
									height='43'
									key={collab.id}
									alt={collab.name}
								/>
							))}
						</div>

						<div className='column column--cities'>
							<div className='column__title'>
								<Translate str='Curbcut cities' />
							</div>
							{cities.map((city, index) => (
								<a href={city.href} key={city.id}>
									<img
										src={city.src}
										alt={city.alt}
										width='86'
										height='38'
									/>
								</a>
							))}
						</div>
					</div>
				</div>

				<div className='footer__content-copyright'>
					© 2023 Curbcut -
					<Translate str='by Curbcut. All rights reserved.' />
				</div>
			</div>
		</footer>
	)
}

export default Footer
