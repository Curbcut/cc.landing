import Translate from './Translate'
import { useEffect, useState, useRef } from 'react'
import SvgIcon from './SvgIcon'
import { useNavigate } from 'react-router-dom'

function ThemesMenu({ lenis, themes, pages, setValue }) {
	const navigate = useNavigate()
	// Create a reference to the categories menu
	const categoriesMenuRef = useRef()

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

	// State to hold the currently open category
	const [openTheme, setopenTheme] = useState(null)
	const [themesMenu, setThemesMenu] = useState(null)

	// Create the themes menu
	useEffect(() => {
		// Function to handle opening a new category
		const handleToggle = (event) => {
			const currentCategory =
				event.currentTarget.parentNode.dataset.category

			if (currentCategory !== openTheme) {
				setopenTheme(currentCategory)
			}
		}

		setThemesMenu(
			themes.map((theme, i) => {
				const theme_pages = pages
					.filter((page) => page.theme === theme)
					.map((page, j) => (
						<li
							key={j}
							onClick={() =>
								setValue({ event: 'page_link', page: page.id })
							}
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
							<span className='h2'>
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
							<SvgIcon theme_lowercased={theme_lowercased} />
						</summary>
						<ul>{theme_pages}</ul>
					</details>
				)
			})
		)
	}, [openTheme, pages, themes, setValue])

	// Return the themes menu
	return (
		<div id='categories-menu' data-lenis-prevent ref={categoriesMenuRef}>
			<img
				onClick={() => navigate('/')}
				style={{ cursor: 'pointer' }}
				className='curbcut-logo'
				src='data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAACmCAYAAAAiceswAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAC0eSURBVHgB7d0HuF1FuT7wl95b6CSQEKp0lA7CkaKoNPkLIiIERdALcvEqKqJSREUpYsOGgoJXUUCkC2qCdGlKk57QIQECBBJKyPnP+8zal+3xlL3KfGtmrff3PN+TQKLss9fea8038803c0FEROq2gosPuJgf4Z3r4mmIiIiIiEhrbeRiuot+g+iDiIhIjeaGiIiIiIiIESUgIiIiIiJiRgmIiIiIiIiYUQIiIiIiIiJmlICIiIiIiIgZJSAiIiIiImJGCYiIiIiIiJhRAiIiIiIiImaUgIiIiIiIiBklICIiIiIiYkYJiIiIiIiImJkXMtDCLhbPfr+Ii8W6/myOi6nZ71/OQkREREREetSWBIQrPSu4WN7FeBdjXazqYjkXo12McrF09mve9+R5Fy+5eCaLR1087uL+7J8fy359HSIiIiIiLdfUBIQ/1wYuNsx+XcfF6vAJx6Ko1qgsxg3yZ7Pgk5EnXdzr4g4Xf8t+PxsiIiIiIi3TlARkKRebu9jaxTYuNnKxJOq3kIs1stiu69+/6uJaF1e7uMbFPS6mQURERESk4VJOQLhPgwnHzi62d/E2F/MgDQu62DELJiP3ufiri6uy0OqIiIiISPPt4mIHhPecix+4eAGSG8un9nFxtotXXPQ3MFiu9TMXfai+XExE4sRV2+mwucf0QUREYnEibO79kzH4doFapLICwg3i+7vY28VmaHb74BVdHASfaN3i4qcu/uhiJkREREREEhdzAjI/fLJxuIv3on2rAfx5+7LgctnJLi6G38guIiIiIpKkWFcS2Lnq5y4uc7EXVIrEDfUnuLg0+3UUREREREQSFFMCwteyiYtLXNzqYj/8+yGAAoxxcbSLR1x8zsUqEBERERFJSCwJCFc4jnNxhYv3Qye0j4Tv17fh94awA9hcEBERERFJQN0JCBONI1z808WX4TebS2+YdLBzzp9dTHSxHkREREREIldnAsLD+U53cYqL8ZCimIhs5+JCF5+CiIiIiEjE6khAFnBxMHyL2U+g2S11La0Gn9Cd5WJNiIiIiIhEyHrwz9a67OJ0GvxJ5lK9A1z8Dv5keBERERGRqFgmIO+A36vA7k0LQULaEL6T2H9DK0wiIiIiEhGrblNMPthedwWIFSZ57JTFVadTXbwJEREREZGaWcyOfxq+va6SD3tMPpiEsCRrSYiIiIiI1CzkCgiTmwkuToYfCEt99nTxkotDXcyEiIiIiEhNQq2AsDUsN5v/CEo+YjHBxeUuloGIiIiISE1CJCD8/2R73c9DyUdstnVxEtQEQERERERqEiIBOc7F913MA4nRBBfnuFgQIiIiIiLGqk5AdnfxRWjlI3bcE8IWvXNBRERERMRQlQnIXi7OgF1rXynn6y6+ABERERERQ1UlIGNc/BDa4JwSlsgxAdkYIiIiIiJGqlitWAX+nIllEbd+Fy+7eDb79RX4lrTT4A/pmzbg7091MSf7PROrge9V51yTUS7mc7E4/L6KJbLfL4b48WwQXrtdXdwLEREREZHAqkhAjnaxGeIy28VdLia7uC/7lfE83kpAXsz+XlWYeCwMn3gsmQVXhsa6WNXF+i5WQ3yJyeouvgW/f0dEREREJKiyCQgPtjsY9eLKBlcr/ubiehfXufgXfJJh6cUsnhrh763lYj0XO7jYIIu6k5LdXBzk4ufw76eIiIiISHS4d+Bh+AFrHTHLxZ9dHOJiDaTZ0YmJxztdfBl+haa/xnjCxYYQkTps5GI6bL7rfRARkVicCJt7/2QX45A4rpzcCtsBcicecnEM3tqD0RRMoLgawj0Zz6Ge9/YaqIuZSB2UgIiItJMSkBwOhO3AmDHDxc9crIxmYwLAVZFbYP8eM/aEiFhTAiIi0k4nw+bePxkRJSBFZrvf7uJY2OGbdq2LT7q4B83HjfFcieDGfiYDp7kYDTsnwSc/j0JEJAweVrsIfPMOWhT+ecTOhK9nwU6FL0JSwvbuvJbsCLlQ9u8WzIJegu8uyeA+zVlZiLTZprDBxkhrupiCCBRJQHiC9iqwcxb8eRXT0C68QZ8H37nrdPjN6xbGu/hMFiIiZbEjICdU2AWQXff4/OCDkF0DF8/+Dn/luVRc6WZb9FfhkxGuCrGxB2fuuOfwNvjOhq9B6sQS6LHw+y85QbZK9u/Yjp8JCJPL+bO/u3DX75lQclKxk4B04mkXT8IPjHid74a/7v0QabaVXGwJGxzzf9DFlUjQjrArBeLs1/9AiOeQWO654YzU6hARK00pweIMOCcxuGL9C/g9e2+i2tf/hosbXXwX/gyj8ZBQOGDh+/sh+DKRq1w8BpvPKccAV7v4Xvbf53dkfog0B5P2P8Hm+9QJ3o93QWKNmzircTns3qRjoZtNN5a+TYHd+/8NiIiV1BMQrnJwZu1c+I56Vvcplqw+AJ/ssGRVz4xqbAE/Achn/uOwu57DBasgOHN7nIt14FfMRFLFSd5L4FcDrb9LXF08AjV/h/JkQNx4/lOE75LEN4czWyoB+k8sY5gIv6QdGmt1d3Lxd5TH82LGIDy+N0kuLcInmHshPM5e8ryX2EtY+BnnAZ4caPCzsxzSxHOJLunh7zEB4ed3SYT3LheTUB6fH5u7OMDFfvCTVHVjB8HzXZwJX671OqQX/L7x+bI3/H0/hRVwlm0x8eSqDM8AS+Fa833+FHxVQ2hnI919s++Gv0+Fdjt859FeVfG6WG66cRYLol4cD3CM9wDs/bHXv8gsiSeLW2RmPFCwaS12q8T9IFZZ8umoxkSEf62ME5GufWDzHvGGazHILYozrzwX5ybU1466yjgNvUltBYRnBnGi6CXYvOa80UlE+L6meEaUlVHwySPP1GLJU4zXcqTgZ/AiFx9G/G3kee/lPdjifdkH6bJqS/tb5GP1utoQR/S6/PJRF+siPM7K7g8/syGD4+DsdtjgqpeSQQltPhcHwXe7u8HF1+BnY0dBYsOZ8R/Bd8o7HP4w1Rjxs8OSLK6CcL/IttAZR93Wc3GKi0fgZ8p3gM3Kegj8DHIv0P/Cz+Tyc5nqiqlIa/SSgHBZ/SOwcQYiaQ8WMXbF+gFscHlwd4iEw9Kzs1z8xMXWkFhx8M4B/V/gN5inMpjn6geTWS738xyptie17FZ1NPyqNPd4xFA2V6Vx8CtzvN78nGqfiEikevly7gybWrx7XZwK6cU58BsDLRyCuEt2JE08I+Dz8Cse+0IDBUt5N2qzTeSlLn4P2xbsVeI9bIKLB+EH3qnO9hfF9rjHwre3PQE2exDqxFJOrtTd7GI36P4iEp1evpQsv7KY7WK97sOQXnCz3cWwwaX67SFSHd53js9CXYvsvT3H3+2D74TEzZdNGMQtBX/Y6pkuVkY7bOXiMhdfQfNWPEbCzzpLzNhCeHGISDRGeqDwkKFdEB4H1Fr9yIebpyxOkGV9vlUJnjQfZ6J/5eJzLhaA1OHjGHkwxsSQnQjZo34DNAufe+z2dAd8iWlT94Yw2fo1fLnVJmjvKgA/6/ws8wBLnmU2D0SkdiPdkPaDzU2LN8jnIXlwc+XdsNGH9pUsSBhfQtrdWZqAG8lZhjTcQOyL8KU6TV6h6iTDx6N5toFv/8zyRq0yemyo8hsXX4VKskRqN9yXkHW/eyI8HsLyC0heL7u4Aja4cXNXiBTHzcCHuTgSmoGMwTEu/go/UO10suJKwHYuLoA/7K0Nkw6cHT8K/mycJnT86+ytYrOArSADce8LE5BfuhgLEanNcEvPPGDqbQiPbQBvgxRh1Y6X2IjgXIgUw0OXPguJCVvTcpacpSk8GZcblXmdFkL7sOU4N9h/AH5yJ0WdvVWfhlY9RsLqjvHwJXjPQkTMDbcCMgE2M5XsJ/8gpIjrYOc9LkZDJD+ufrB19DhIbJaAb1PLgRhnzNuYfBA/o9wfwPat45EeJk9sTKK9Vb3j5/0aaKVIpBZDJSCcPbFovUs3Qop6Bn7m0gI7xmwGkfzYiWYLiMSPHf/YISulblF8rXzN74PktTZ8CbjKsUSMDZWA8EZmdcLtlZAyrMqwuBrWB5F8OJlxLPwMs0gKWJp2nosVET+u1vCMFrVKL24t+P1QG0NEzAyVgLwbNth+915IGZNhJ8/5ASLEh/o2EEkLn4E/RNzdkrjywdPdt4WUxUTuDLTvnBSR2gx2c13exdawcaeL2ZAyHoAdltHoMCfJg+cILQmRtHDFjhvSj0acG7qXg1+l0cpHdTjBdo6LpSEiwQ2WgLAmck3YsDrHosksV0DYNW0diPRuR4ik6wvwDVliw1ayVpUKbcJ28ydARIIbLAFhucSCsPEvSFlPuJgJO5tApDc8R0KfF0nZIi6+g3j2B3AvHldlDoX2VYXAMdEnXXwQIhLUYAlIH+w8BCnrRdieIq8VEOkV66rnhUjamEjzYMZFUL8dXBwBCe0k2JyDJtJaAwcHnF2x6on9KvzsvZTDQ5SYgIyBDc4Esib6dYgMbzWINEOnNOczqA/3JpwNf5p3DPgMeM7FdBczXMyCbw1PL2PoAx25j3Dh7Pf8meZzsRR8grd09ud1b/4f5+LHLnaCnnUiQQxMQNbAWzeG0J6H7cx9U/HG/yLscPMjGxU8BpHhLQVpKjYPmepiCvwkyDT4+zkHnS9lf97rCdOLZsGJjVHwA1DeY3gyO88f4uRKDCtpH4PvOnUP7PG9+Tb8/bcOc1w86uJ6+MYnd2f/zGvM681nUNGBOpMNHojJzwCTKyYhXD3lflR2+FoXdmXh3fjf3tPFbyEilRt4U38n7HDmRAlIeW/irVknCxwMrAQlICJtwT1mt8EfGnuLi/vgB+FWM8N8TnE1jRNkHBRyFXZD+ATFEhOjU1x8CH7QbWlfF/vBFqsULnNxhYtLEO7QWyY307MY7LnC5IulZ7u5eC9sDw1k0sfP/v0QkUoNTEA2hB3ewF+AVGEq7PBhMBoi0nRTXPwafvDJA09fQz24mnJfFnwtvAet72JLF4fDJyZW2NWNKyGnwQ5XBr4Ou3bATAh+7+Ln8Af0vYl6MdG9PAvuy/h/Lo6CTbUGV+A+6+IQiPhx69Moh6WGVgd996rsz1TEvzVP4s1tkot+o7gYUpWvwe66MT6PfCYava4Tka59YPMecSBpdS7HBNj8TAODM6lHwvf1j/kguW4bwb/u/pqDg09+RvZAPWUvefH6buriWvhExeI9YtmRVSkUf77vA+g3ij/Bn/cUO67E/wY278kbqG5ylvfe2wGT170P0sVnucV7VFd5HUsMj4WfPO6vIXivvBJ+ZbG2wze7H86suV0JdqZDqvIybMWyCVJkIM6Ss4Umu9iwdGIOJA9uvN3ZxYXwJTix4/W92cXu8LPiFtebexSsyqHYxnpvhMf3jatdXF24EfF73MUnXJwJP6AKiZUiB0Jtj6U6D8MnIPwM1zEWZuLFBPUvsB8//p/uEqxVYNdJibT/ozrnwnYfyBSIxIezOjy9WucL5cdyWHZ4Ogtp4p5CJp3cQ8BzO1ZAWCzLYZL2MML6FsKvtnAA/xUXJyOtjk8cOHEAx70pX0JY/O/8wcXVEKnOH10c4OIi2LnVxf6IYHKuOwFhreNCsKP9H9WZgnQHDiJVmQglH0UdA9/iNXWcjGFtMQeLIcvvWC3AA+vylqPm0ekCFdr58IlO3Xs9iuBr5mt/P8LuYeV+kwlQAiLV494mdpaz2sv2XURSGdB9g7bcyEevQESkOhdC8uLsN2e+v4c0B6AD8efhbOKpCP+QPRi+bXAI3JPJjeeh9zBNcnEY0r723BjMZgShJzVZsmJZpi7twJX7SbDB0sWbEYnum9sqsPUcRESqo7LO/O5ycTqah7PiNyEsnl2xO8LgxvrtEd6xsC3fDYXnk/wKYbEpwx4QqZ7Vs4vJTjR7+7oTkLVhazZERKROLL2ajOZhp6qvIjzuDQjRUvNQhO9WxwF7U0qKOJ44HeHHFR9BjV2DRJpkYBcsS1oBEZEqWR8Olzr2fr8EzTUJvrY6JLZ63g7V4oGHoVZWOriBuwl7frqxA94/ERav91YQkdK6E5CVYasJ9cYiEo+ZkDzYcvcNNBdnw3+NsBZA9S15D0L4Q/YmufgbmucChMUyrA9ARErrJCC82aVw6JSIiJQ3A/6U66Zjh5nQDU92QnWnlPNZ/F6Ex/afKbXc7RVLyl5DWDtCRErrJCChe6YP5lmIiEgd7nDxDzQfD6O8AWGxE9auqMaWCF/iw+qD36GZ+Lm+B2GtDl+KJSIldBKQ0JvdBqNN6CIi9eBAbQaaj8+Z0N2w6F2oRh/Cl1/diebul+Jn2iKx3hIiUkonAQl90qqIiMRjItrDIgHhQXijUd7+CO9yNFvojejUh/BntIg0WvceEBGRVLHOX5vQexe6TCUmoTthEZu4bIZyxsDmPK6/o9keQXgbQRO3IqV0EpDFISKSLnZzauKm2hBYlnQf2uN+hE9O50H5gwMtuivx0MEH0WwWyfWqLtaDiBTWSUDmg0j6XoCIjORRtGsP3hwXjyO8sisg2yC8p1w8iWaz+PmYcG4MESmsk4CMgkj6XoWIjKTpM+CDsfiZN0HxZynLrzZAeEzEnkez8ZBFi59xbYhIYXVuogrdm11ERP7TNLSPxc/M52nRshy2dl0V4U1GOzyD8NaEiBRWZwLShhaQIiKxmYL2sSo7Kno+BMt5FkB4D6MdLBKQdSEihamNnIg0wctZyMiaXoIzGKufeSMUU/R/l9cTaAeLe8FSUAMfkcKUgIhIE8yGDjft1bNon+dgY30Ua2tfdgN7rx5DO1hd7/EQkUKUgIiItEsbV4qs9hyukEUe88LvAbFgNTCvm9VnXGeBiBQ0L+rDpcunISIiltpYgjUVNph8jEO+vRacRbd6FrelAcFRLk5AeGr9LlJQ56ZXx4yYTl8XEbHFwxrfhITCqoK83azGwU5bBswzoEY3IlHrlGCpJa6IpGxOFjI8ngjexoHZC7AbfI9FPmvBhmbrRSQanQREmzdFJGXqgiWxWBH5rAQbOqhVRKLRSUDa2BVFRJpDKyC94QrIa2if/iwsjEY+Y2CjjXt/RCRSnQREM4ciIs3HPSCz0D58xlmVGi+NfPJ2zSrqdYiIRKKTgLSlNZ+IiLQPN95blRrnKalaNAsRkVbpJCB1tOarswWwiIhICHkSCnaDXAQ2tAldRKLRvQfEeoPaMhARqcabUHtZicOSOf4uE5DFYEOb0EUkGt0noVsd1CQiUjV1wZKY9LqqsSBUDSAiLdSdgEyBrfkhIlINyy5HIiPpdVWDCYj2gIhI63QnIE/AVp5lahERKU8rRSIiUrvuBORB2JoHIiJiaTZ08KyIiNSsOwF5FLaWgoiIiIiItEp3AnIXbA8qWggiItXQIWsiIiKJ6E5AnnTxFOzkPS1WRGQo0yG9YPMPlb+KiEitutv/cRP6Qy7GwoZKsKqzJGw39bOf/NMQkdR0zp14DiIiIjXpTkB4iNedLraHDSUg1TnSxb6w8ysXx0BERAbT66F/M6EDAkWkhQYegHQ77CzrYj4Xb0DKWsfFONjR7KmIyNBe6PHvce+SEhARaZ25B/zzP2GHJUOLQ8piEjkKtiZDREQGMzPH37U8l2VBiIhEYmACcoeLZ2GDg2ZtRC+PiZxlAvK8i8cQJyW07aVZZIlFnoYIL7l4BTZ0+K+IRGNgAjLHxW2wMQr2M/dNZL2S9EQWMVoY6ZobUkavJS/STlwptvqO5SlRZQnWNIiItMxgN+RrYYPtIMdDyrJeSXoYemCGsBxEwlsU7SzF4c9tNVHzOPKx6iioFRARicZgCcjVsNsYvhqkrGVcLAI7lvuERKRaXAnQXoCw8k7Q5E1YitJ1l1TMD2m8wRKQW2HXDUsrIOWtAltXQ0QkLXPDrgRrCvJ5FDa0AiKpUHl+Cwx2Q+aGuImwsQ6kLMsExHKPkIhUb9Es2sby586bUDwCG1wB0V6z9tAgXqI21M3oItjYCFoWLmtd2PkH4t7sm/I+iiUgZVi1Mk0dS7DaWN5gtQmdB/rmbVP+L9jRXrP2SPl7Pg+k8Ya6Id8Cm8Pm+AVZC1KG5T6a6xC3uZCuhSBlKAHpXRvbn1vNBnP/x1Tk8wx8O14Ly0DaIuVnilZvWmCoBIStAf8AG9tAiloAdgncbBdXIG4pP1zbWBYj9WjjapvV94tnJOUtwWJp6y2woRWQ9kj5e67KmBaYd5g/u9TFgQi/FLa5ix9CilgDw1/DKj0Af1BlEVZlWymfA6IERKy08cBOqxlVJh8zkB/vr9sjvOXRDke6eDvC+46LvyNOKa8iLAVpvOEGr5zt5pkg2yGsd7kYC7uNeE3yTthh96ui7SJfg42UZ/dWhIiNldA+K8BG0TblN7o4BOGNRjvs4WIrhHcc4pXyCkgby0RbZ7hNea+6uADh8WHYByliE9ixakxQhtUgIwTdcMWK9oCEcxOKYev7IisneVm3ba+LxfVm6VzehgP83/TDRsoTctqr1AIjdQU5G+E3x/E17AXJizPmm8MGN1VeheJehA3etFItw1oZUobVZ6wJxqJ9LJp1cHB5I4q518WdCI/vQxta8Y5BeLxmeVf3OZ6yulel+kzheTUpl1NLj0a6EU13cRnCY5mXZoDzYfvd1WHjQvhN6EXNhB2LB0/V2A1OMz7lzIL0qi1lON0sVkcfRvEJOw5kr0V449D8Awk5eLXYU3cvirG6V/F7nmKy2cYS0Vbq5cP5U4RvccmbxccheewN3wUrNJYFnINy8ralLCPFwy2ZSOqAMLHCz1ubusywkYrFZM3lKOfPCI8lWE1fARsPG9egGIsjDojf8TWRnrUhrdDLoIdnP1isgnADnjLf3rB5wO6wcQPKt4h8FnZSvOFaPTBFiPd9y/OD6sZSFItugWVXMLh/5FWExcm+DdFsFvtceJ3+gWKeh501kJ4UJxGlgF4SEJ4Jchp8fWtIHIQdDenFAbDbYHYKyi8ZT4OdTZHeaoLOwhFrG6M9tkR4bKNbdAN6B8u3yq6i9GIzNNtGCI+n19+FYop2kyxiU6SFhwlbtE+WCPQ6UOON1aLX9X5o18xcEeyP/VHYeNrFX1GeZQkWHz4pdf/gzGzTZyQlPm36zFkMaNh+9zGUV8X9diSpDUrzWh/h8Uysoiv7lhNybFQT+iy3KvGcmhRXbaSAXhMQrn58HeH3gvCArJ+5WBYylE8g/NksxFaBx6Pc5vOOB2GHCey2SAeXm9s0Gx2KZZLbBDz0bjE03yKwWQE5D9VUCfD/5wGExfbt49BMbOZhsYegzBEFD8POFi42QDr4LNQekJbIU6pypYvzEV6fixMhg2EnF6syNXb4uALV4ODwFdjgEu77kA4+INpyOnFIoUtEm4YP+fXQfG9D+AENy5Srulc+4+JihLcDmol7AENXUfB6T0RxliVYnNR9P9KxI2z2a0kE8iQg/NLx1M/QqyAcQH7MxX/DtycVj8nHb+BvKBa+ifyHLA3Hosd9x4eQxqGE/KwfDhF7bFW6N5rvPQjf4p2z4VWd7cCV518hfEL9YTTzrIU+hF/ZuxTlDo3kCkjocVS3A5FG1zt+Hj8GaY28m3U5IP01bHzDxZchxOt0AmxKr4gzNOeiWg/BDm+2+yF+rE1Xxw+pyy5o/mxj6PsAS1TPQ7U4WVN0g3OvtkJapaq92gPhlSm/6rgfdtjgZ2fEjwdSN/2MmqFUUeqenCLdgr6C4u3n8lg4+2+dijRms0Nha+LfwZ+TMhfC44FYn4Nf8arS3bDFUrWtEC/OyvKzbXFNRQbDszH2R3N9EOHLr25GuXKcwXD148cu3kQ4C7n4LJqFDUhCb7Dn2KeK81r+CVuc0LVoT1zUWi6OQntZHlUQjSIJCDs4HA87R8DPMK2F9mEtK1ci9oSdv7i4BNW7HbZ1+pxJ4U031jK+g11sDamK9oAUc5iLUWgeJviHIjzeK0Oc68BJp3sQVh/inqTJg2OZwxDen+C7Q5YVeoVrIO6F+ibi9SW0c4zXEfr8nw5+Txox6ckbZL9hcGaeHbIsTrStGzt5nORiOmzfY34JxiEMrmI9AKDfOH4C/37Ggi0R/wt+drO/hmD98WjYmAC7n8ui939IfP3W3/dO/BLpnZ0zEp5dFfp9Yx3/oghnPyD4z8AZ/TFI307wiWDI94pjkKpavPMsllcQ9vUOFtzHG9PeH76W78L+fejEJMRRhsrVWoufl5+5zdEA7DbBwYz1B4YHAH0baZ310Cs+zDiLwxrg/hriZITDAc7vAfQbB2sruWnQavP+SJh81DXQZPAhatUVZQLsfi4lIOU+E03akN4HX0Ia+n37McLi8+AJIOjPwJXDs5E2DiCvQ/jrfSGqwxX6Op7z/K6fgTgqA3jd2PGUr6m/pmCHzhjOHeFhxFaTkp9BQ/Shvg/PG/DZKw/lY51vqjN4nI3mw/+3qHdgyjbLobvFfBpAf03BBznLnkLOWA6HpQ4Xob6fvzsmwuYBNAGA1c+kBKRc8D7OPQGpr4QcAF8mHPr94uTb2xDeJ+GfdaF/nthmxnvF18wBdej3h5+pLVCtHwDBX/dQwT0o3LBfR3esubP/9g2o7+fvjtATCb3ghD5bcFv8vLx3NWaz/09R74eHMziPws9OfAG+s1DMLec4E8+NcqxPZunDZPhZ+jrfQw4+3oHwNgLQX2NwhuEq+FUIq4ftdvDldC8C6I8k+D58HuFPyJ0AwOpnUgJSPrg8z+YNCyA9vOdzgmEmbN6r78CmlprPi8sBhP55+AzgQCylBJSvlftRLSZBz0H1pTp7A8Ff93AxC37cxNdhMSHF94+d985EvaseA4P3Pct9toPhPrw7YPczs+yt9vt8FTdQdtPgQHovxIMDeh6kxxO4eVGnwCcpL8B3G2DtLj90VW784cXke8HMkrPsfHCsCL+nYqyLVeHb4cW2WsNSBS7JnQ4b3Hy3LurHa3+bi8vg66D5+eAMBD8fRTY088TlZeE7jfCAN86WcZP5eMSJN6FrXXwNvqxxsL70/Hdl2gNOgH/YWOAJuhbd+UJhAjIRccxMTYFfDWG3n5cQN95zeajeVxG+A1IHnyOrZr9a4KQaS4wsJtZ4zdny/WrErbOpeneEx2cFr3cVm8+7LZb9f8aw8sRzTbgiwU32bH7wCPyqT9HuTEvBD6rZSIcnsW8JXwUQa0dTTsr9Ab4zJY8MGNgFlGOClxG22QkbDlmWwrIzKTvNcjWsbCMNTvzk7pxa1QwOP2S8QcZ8ojMHXPwAdRIQzkjzDWMN4Jzs12788nXaIDKZGHiTWAL+4cesfpnszzmL0ElA+AUMPcNchU6LX6uDkZh5x3j4Hq/31OzX57NfZ+HfPwfdeHPl9WbSwWu9QvZ7Jp0pna3AhysfNrMG+bOhEpDz4csHRjIBdgnI+rDvLFOlmBIQ4r3x7/DlLUzSpyEu/P71wX/GmIBYDuJYrnQsbPFwwo/CBq81Kxt+BF+6GhNed052cuBk1Uzje/AHI4fAFfkdEReOh5gY8TnISbnnsl9ZCjh1iP8Nn3+cWOUYsPt5uDzSWlXjhMtj8D9rt+ESkK+jmtbMnEQ5DrY4tuHka9mDVGcgf9vwn6BCffAH2NW9nKboPbgJznpPBGdBZiDt963tcSJ6M8HwNaV+VlAMJVhDBR8s17v4losPwM/Ic2BhMcHCSTJO9nDVlOUbnPVmSVJdJRwT4QdW1rg/7xbY/qwchHFWdl/4ldy6JtSYlPPac9IjdKergXETwiY6B6G+joiKamIfVOPdCP9aY4ojqpyp5ZItZ7bZ6ahpLR2biLPe3OBotfLRwbKna1y8FyKSAt7Pt8yCWHrEWUIOBnkf4WxpZ+WQfzYzi17Lt1i+yHIUriiOyn7PVWUmlSxpXDH7lQPRunvYc7azjtUgzkLzrAQmX1bPV44P9s6CZSksab4RvmST5zpxwnEmqsXPAK83S6zYcp97EzfJ/rmOBIj790KuAl0MfwBfrKW6YodjI1YcpFRBUUqVPygzmgvgN7dyY1iKHTXagg8NLmPfDHss+TkTSkBEUrUkGtRFpUd8vrF8tIpSi6KuxFslrNaD8dWyeM+Af/9sFk/C39undv37ofaPsXR5iez3o7J/Zlt9lu7wTJJYJjC5Kf88hMXSJp5vFvMhgWKD3xlO5O+AlgiRaX0ffun2u5AYccWD3cLqSD46OIvHWdPUy2ZEpB044x/DM40bxLkysCvisEwWa6NZ2NAi5LlY3ZjksBlIa2a+ZUiT0KIEJMRMAzcvctPWMah+eVbKYa0pN5xbdbwaCpMgzi71Q0QkbpzZ56nkU1A/lrlNgO/yKGHwenPfy0OwwdK21A+DlGqw3fOTaImQS53cqHoUJBZMDHmC/O8RB3ZZuR8i1aiypbZIB7vedFpVx4JJCLsyle1cI/+Jz0lOnlpfb07Ixd7yWsJjR6oL0BIhE5DOSgjPmLDqly6D47XgjM6XEc+qw1PwN3qRKugeIyGw85JVKU4e3A+yGzRorRonTk+FPba8/jak7TjhwVLPVkyoWWz24p6QA6EZyrpwYxMPFePZDSEP0Snij/CdH9qMyeHfXJwCP9PKFarnICJ1473piyhwwJYR3jeORbyvLzU8k4NdzsocvloGm7O0/d7P8mwm19+Afx7y920bO7Ik7wpIpXj+g3Uf87YHN3pvhrhtB58kpfKeVhk8gXSdQd4TdpBjidqsCF8zI8ZzQFIX8zkgbQwO7sciDXtCZyuVDR70uAzq9wnEe98PGZwcvcjFSoO8J8tkfzY7wtfNqOockG5sO/0kgP4GxxEwtiaUhFgFl3S3RPy4Cnck0npvqwjWGG+IoS0I3/EmxteuBKR6SkDiCZ5tsgrSwta8bRy4VhFsfRrLsQG87/OE6JTevypiIobvism23/8byWsdGCESEJ539CkA/Q0O8wSEeNAQl7U1YxMmuFz5I6R1DguTkD8hrfe5TPAU580xMrZlnFTj6xwqlIBUTwlIHHGti7WQpm3hD4hM6f2uO85AHCsf3RZ1cQfSeh/LBO97K2FkTEL+VfNrHSxCJCDEcdHFAPobGkfUceBPpxvTx+BvllIdJh/caP4/SKsFMpdf2azgQTQfl5E5gL+px7/LbjcPQ4ajdt/FsaPSNfA1x7ej3fg9Y7OO+5Amlo1xv2Ub7qNl8ZnzWxeHwpcAx4T7IHig8ww0H5soHIbeWs+y0QirJdrwvlBnXNT2+3Iwi7v4pYtXkFbmFmNc6OIdSBvrHps+g3cs/CpgHmPh+/7H8jPEtgLyFNJnvQLSaU6x4IDXsS58G8j+lgWbP6yMZuBMMQ97jbVmvu7gRN1ByH8ftvY+NLtShJ/PfZEfV/qmGb3GXiLUCkjHaMT1/K8qainBGmgB+HaCWjouFvwifhP/OZBI1YfR3ISUA7uiD71t4GvTY/g5lIBUzzIB4YGk/J4NtQI+Cv505jlGr6fO4HvxG6RVstqLpeDP4eLPl9L1CB1c5foo0sFy9SYmkixDZqeruVAMDwZ90eB19hKhExDawsVdAPobFFEkIB0cQHNGTolIb8Gyk7NcjEHzcIajSR0gOJDjzXZRlMNa5Ymof1ChBKR6lgnId3p4PfPAPyCaPAPL8g/OwNZRimzlXfD7WlK6LiGCpd9MNEchLRyg8zPapO8hr8XBKP+9416t22HzmocLiwSEmrayGVUC0vF2F6dDMzfDBTPhvdGcVY/BvB/NSEI403Ma/ICuCsvCl3HV+f1QAlI9qwSE9eXboTccIExAPDONVQb3YO2EdmB3oc7hZildo6qCK+qfQ/kJoDr9F5pRGcBzTrivoejKx0Cro/6uYVYJCHFlkxP1r6H+a1k2okxAOliL/HP4TZIpvamh4g0XN7rYA81OPLrxwXk90i0F4Wd3V4SZYeV+nz+gntabSkCqZ5WAcIP1aOTDDjV/RTNm3liyytKk2Ov/QxgHf/hrW/ZcdiZ/VkczsG373UjrGnQHmyOE2qfK5yzvUXVMzFkmIB0cH7Mtccqtt6NOQIgDN9a+/wDt7nHOA+s+Cb8E1zYcLJ2EtK4Xgx1ptkFYTESZkF4OwPJniy0BSbVrUTerBIQlC0XuI0vDz1ymeh/mwOQ6+LORmlxyNRLudeFgLcZ2plXGRBcfRPOuNQee7N6VynXoBCfL1kRYXB34OOzPmqsjASG26ef+ae4tTbFiKPoEpBsfgGyZxwP2mrD8NFJMhV8B4nkRbX5gdvChyQFE7NeNs/FsnWt9zdZw8RUXN8DXtof8GWNLQJrQpjD2BKRjNfjOhanUpHdWjt8N/8AWj/cn7rVj++Wm7C/gtWY3yN3QfIcgjU3J97j4COxx0/ap8JO3oUsP60pAuq0K37qZY6RUqoaSSkA6uImM7enOR/iBVh3B7J0nYHO2oKp9A03BkqzjEeeBbZwZ5sOPrYSrqm8tYgkXW8HXPHPTJTtnVT07ogSkeqkkINSZebsK4V9vmbgT7V057hVXRLaHn0VNdXWLiQfHA1zxaFOSycmAXyDOCVnu9eDejOVQr+Xh97wd4+IiF8+g+p81hgSkYxEXm7o4HH6iaDLiLZ09os6BUhVYx7sLfELCpXXOAs+HtDCJYpbOweskF7dBRsLNhGxPyFWRDVAvrlTx4cfZllgPAGOpFhNa1vKPgx+QsaNW0Yf1n11c0sPf4yyUxc35cRcnI21MrvnQCN0O9mkX30N1hzcy2eUgnysMy6N+3ONxKfzAjKuBsyG94rlcbG/KZyqfpzEnbkyWmEyzHImnRU9Be/HecQz8d3A86sUJLw58mXz0crhgHTh+4PNwTBb83K+A4s6BnziOFcfJHBuvCP/5YKna0qh/H9yFaBDuFWBXk2/BP3g4KxJj1sfgoJUHX3HJbH0XC0GK4ICa7fzq2HzGzYDcm7I2VCIn7cbPPzeX8n72AOppGsHT3I+DVo6rwIEJJw+YEF+NuFZG+GznZA/Lx1LualU1TiZzkPkF1NOalteFJcAch6U+sS1GmvxB4azvevA3qnXgN2+tmIVV5sduIzzXZIqLW+E3/t2Q/fMcSJV4XZmA7g4/CGFUeZ25t4NJB2umeQ2vh4gMZhUXe8KXPqyb/fMCqA5bCTPR4azjJPhzLh6FhNJJSLZ2sRl8vfk4+HLPUDiByBn0++GrAniNeb2fhvSCz7+dXbwn+/04VFeexrELv2//gC/DZMOVuyCSU5syVdbGcZltZfgHIoPLb6yjHJX9GZel8j4on4Xvk88BKusLeYPkl5M3zsey33NT0JsQC/xMsxSEezF4UBFLtLjsyNkhnqGx2Aj/e5Zs8JryxFyW9vDGyi5LTCB5PV+HiPRqbBacDOJqIRMSrlzy/ttLuRm/g1wxZnkjv393wE8E8P46A2KN91eWb/Ka8vnJa8pryfsr6/15bfk87XVVmCXIfD7yOjPh4PPyIfhr/Ej27zVZVxxXAznm4bOQz0RWXKyaBSftRhrvcAM3v39T4PcT8FnIknF+Dznm0bhGCvv/Z+l03whN6KUAAAAASUVORK5CYII='
				alt='Curbcut'
				width='400'
				height='83'
			/>
			<div className='close-cta'>
				<Translate str='CLOSE' />
				<img
					src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNCAzNCI+CiAgPHBhdGggZmlsbD0iIzAwMCIgZD0iTTI2LjMxNSA5LjM0MyA5LjM0NCAyNi4zMTRsLTEuNzE4LTEuNzE4IDE2Ljk3MS0xNi45N3oiLz4KICA8cGF0aCBmaWxsPSIjMDAwIiBkPSJtOS4zNDQgNy42MjcgMTYuOTcgMTYuOTctMS43MTcgMS43MTgtMTYuOTctMTYuOTd6Ii8+Cjwvc3ZnPg=='
					alt=''
					width='34'
					height='34'
				/>
			</div>

			<nav className='categories-nav'>{themesMenu}</nav>
		</div>
	)
}

export default ThemesMenu
