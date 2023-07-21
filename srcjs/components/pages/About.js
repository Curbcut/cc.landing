import Translate from '../Translate.js'

function About() {
	return (
		<main>
			<div className='hero'>
				<h1 className='h1 main-title'>
					<div className='main-title__first-part'>
						<Translate str={'About&nbsp; Curbcut'} />
					</div>
				</h1>

				{[...Array(5)].map((e, i) => (
					<span key={i} className='dot'></span>
				))}
			</div>

			<section className='section section-about'>
				<div>
					<span className='section__title'>
						<Translate str='Our mission' />
					</span>
				</div>
				<div>
					<div>
						<Translate str='Curbcut’s mission is to generate and mobilize the knowledge needed to make cities more socially inclusive and less impactful on the environment, while improving the well-being of residents.' />
					</div>
				</div>
			</section>

			<section className='section section-about'>
				<div>
					<span className='section__title'>
						<Translate str='About' />
					</span>
				</div>
				<div>
					<div>
						<Translate str='Curbcut is a platform for exploring urban sustainability across multiple spatial and temporal scales. It offers a justice- and inclusivity-focused approach to urban issues which integrates the widest possible range of information to help inform interested citizens, communities, researchers and policymakers.' />
					</div>
				</div>
			</section>

			<section className='section section-about'>
				<div>
					<span className='section__title'>
						<Translate str='Data availability, transparency and usability' />
					</span>
				</div>
				<div>
					<div>
						<Translate str='At Curbcut, we acknowledge that data can be incomplete, fragmented and biased. Whether it be missing values or sampling strategies, data never provides the entirety of the picture. Data is usually collected over short periods of time or at given time intervals (such as the Canadian census), making it impossible to capture information on a continual basis. This can cause groups of people to be over or underrepresented. Curbcut recognizes the importance of questioning data, methods and analyses to not perpetuate inequalities or omissions.' />
					</div>
				</div>
			</section>

			<section className='section section-about'>
				<div>
					<span className='section__title'>
						<Translate str='About our name' />
					</span>
				</div>
				<div>
					<div>
						<Translate str='A curb cut is the small slope connecting the sidewalk to the road, making it easier for people to move through the city - especially those with wheelchairs or strollers. We’re inspired by this simple design feature that exists in our everyday environment which evokes the importance we place on promoting inclusive mobility planning, accessible urban design, and quality of life.' />
					</div>
				</div>
			</section>
		</main>
	)
}

export default About
