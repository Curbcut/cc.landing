// Create a component that will display the SVG icon
function SvgIcon({ theme_lowercased, size = '45px', color = 'black' }) {
	let svgData = null
	switch (theme_lowercased) {
		case 'climate':
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 45"><path d="M27.03 16.34V0h-9v16.34A1.66 1.66 0 0 1 16.37 18H.03v9h16.34c.916 0 1.66.743 1.66 1.66V45h9V28.66c0-.917.743-1.66 1.659-1.66h16.34v-9H28.69c-.918 0-1.66-.743-1.66-1.66Zm0 3.319v5.682A1.66 1.66 0 0 1 25.37 27h-5.682a1.66 1.66 0 0 1-1.659-1.66v-5.682c0-.916.743-1.66 1.66-1.66h5.681c.916 0 1.66.744 1.66 1.66ZM9.03 0h-9v9h9V0ZM9.03 36h-9v9h9v-9ZM45.03 0h-9v9h9V0ZM45.03 36h-9v9h9v-9Z" /></svg>`
			break
		case 'demographics':
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M28.795 18H36v-7.2c0-.928.843-1.8 1.775-1.8H45V0l-9.002.006v7.263c0 .93-.837 1.73-1.77 1.73h-6.093a.474.474 0 0 1-.337-.807l1.126-1.136-6.422-6.4-6.422 6.4 1.123 1.137c.295.3.082.807-.338.807h-6.027c-.932 0-1.84-.708-1.84-1.637V.006H0V9h7.292c.933 0 1.704.873 1.704 1.802v7.199h7.275c.933 0 1.726.91 1.726 1.84v5.412c0 .93-.793 1.747-1.726 1.747l-7.28-.012v7.198c0 .93-.767 1.813-1.699 1.813H0v8.994h8.995V37.73c0-.93.908-1.73 1.841-1.73h7.16v-7.216c0-.93.889-1.785 1.82-1.785h5.434c.933 0 1.747.856 1.747 1.785v7.215h7.232c.933 0 1.77.802 1.77 1.73V45H45v-9h-7.225C36.843 36 36 35.125 36 34.197V27h-7.203c-.933 0-1.799-.818-1.799-1.747v-5.506c0-.93.864-1.747 1.797-1.747Zm-3.545 0h-5.434c-.932 0-1.82-.764-1.82-1.693v-6.171c0-.42.51-.633.808-.337l3.696 3.655L26.189 9.8a.475.475 0 0 1 .808.337v6.17c0 .93-.815 1.693-1.747 1.693Z" /></svg>`
			break
		case 'ecology':
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="m35.999 26.98-7.204 14.424c-.448.895-1.797.576-1.797-.425V24.083c0-.422.511-.634.81-.335l.68.68 6.188-6.194-4.833-4.84a1.662 1.662 0 0 1 0-2.349l4.834-4.84L28.49.011l-4.812 4.817a1.658 1.658 0 0 1-2.346 0L16.509 0l-6.187 6.195 4.834 4.84c.648.648.648 1.7 0 2.349l-4.834 4.84 6.188 6.194.681-.68a.473.473 0 0 1 .808.336v16.904c0 1.001-1.348 1.32-1.796.425L9 26.98H0L9 45h27l9-18.02h-9.001Zm-8.864-13.586-3.458 3.461a1.658 1.658 0 0 1-2.346 0l-3.468-3.471a1.662 1.662 0 0 1 0-2.35l3.457-3.46a1.657 1.657 0 0 1 2.347 0l3.468 3.471a1.662 1.662 0 0 1 0 2.35Zm-3.468 6.208 2.02 2.023a.475.475 0 0 1-.335.81h-5.718a.475.475 0 0 1-.336-.81l2.021-2.023c.65-.648 1.7-.648 2.348 0Z" /></svg>`
			break
		case 'economy':
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M 36.214844 10.289062 L 42.855469 10.289062 L 42.855469 2.144531 L 34.710938 2.144531 L 34.710938 8.785156 C 34.710938 9.613281 34.039062 10.285156 33.210938 10.285156 L 26.570312 10.285156 L 26.570312 16.925781 C 26.570312 17.757812 25.898438 18.429688 25.070312 18.429688 L 18.429688 18.429688 L 18.429688 25.070312 C 18.429688 25.898438 17.757812 26.570312 16.925781 26.570312 L 10.289062 26.570312 L 10.289062 33.210938 C 10.289062 34.042969 9.613281 34.714844 8.785156 34.714844 L 2.144531 34.714844 L 2.144531 42.855469 L 10.289062 42.855469 L 10.289062 36.214844 C 10.289062 35.386719 10.960938 34.714844 11.789062 34.714844 L 16.929688 34.714844 C 17.757812 34.714844 18.429688 35.386719 18.429688 36.214844 L 18.429688 42.855469 L 26.574219 42.855469 L 26.574219 36.214844 C 26.574219 35.386719 27.246094 34.714844 28.074219 34.714844 L 33.214844 34.714844 C 34.042969 34.714844 34.714844 35.386719 34.714844 36.214844 L 34.714844 42.855469 L 42.859375 42.855469 L 42.859375 34.714844 L 36.214844 34.714844 C 35.386719 34.714844 34.714844 34.042969 34.714844 33.210938 L 34.714844 28.074219 C 34.714844 27.242188 35.386719 26.570312 36.214844 26.570312 L 42.859375 26.570312 L 42.859375 18.429688 L 36.214844 18.429688 C 35.386719 18.429688 34.714844 17.757812 34.714844 16.925781 L 34.714844 11.789062 C 34.710938 10.957031 35.386719 10.289062 36.214844 10.289062 Z M 25.070312 34.710938 L 19.929688 34.710938 C 19.101562 34.710938 18.429688 34.039062 18.429688 33.210938 L 18.429688 28.070312 C 18.429688 27.242188 19.101562 26.570312 19.929688 26.570312 L 25.070312 26.570312 C 25.898438 26.570312 26.570312 27.242188 26.570312 28.070312 L 26.570312 33.210938 C 26.570312 34.039062 25.898438 34.710938 25.070312 34.710938 Z M 34.710938 25.070312 C 34.710938 25.898438 34.039062 26.570312 33.210938 26.570312 L 28.074219 26.570312 C 27.242188 26.570312 26.570312 25.898438 26.574219 25.066406 L 26.578125 19.9375 C 26.574219 19.105469 27.246094 18.429688 28.078125 18.429688 L 33.210938 18.429688 C 34.039062 18.429688 34.710938 19.101562 34.710938 19.929688 Z M 34.710938 25.070312 " /></svg>`
			break
		case 'health':
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 46"><path d="M44.998 9.058h-7.341a1.66 1.66 0 0 1-1.66-1.659V.06h-9v7.34a1.66 1.66 0 0 1-1.659 1.66h-5.681a1.66 1.66 0 0 1-1.66-1.66V.06H9v7.34a1.66 1.66 0 0 1-1.66 1.66H0v17.999h7.34c.917 0 1.66.743 1.66 1.659v7.34h7.34c.917 0 1.66.744 1.66 1.66v7.341h9v-7.34c0-.917.743-1.66 1.66-1.66H36v-7.341c0-.916.743-1.66 1.66-1.66H45V9.059h-.002ZM25.34 36.057h-5.682a1.66 1.66 0 0 1-1.66-1.66v-7.34h-7.34a1.66 1.66 0 0 1-1.66-1.66v-14.68c0-.916.744-1.659 1.66-1.659h5.682c.916 0 1.659.743 1.659 1.66v7.34h9v-7.34c0-.917.743-1.66 1.659-1.66h5.682c.916 0 1.659.743 1.659 1.66v14.68a1.66 1.66 0 0 1-1.66 1.66H27v7.34a1.66 1.66 0 0 1-1.66 1.659Z" /></svg>`
			break
		case `housing`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M45 16.532 28.514.01l-4.808 4.818a1.652 1.652 0 0 1-2.34 0L16.545 0 0 16.581l5.034 5.045a.474.474 0 0 1-.334.81H.06v13.57h7.322c.914 0 1.655.742 1.655 1.658V45h8.976v-7.336c0-.916.741-1.658 1.655-1.658h5.666c.914 0 1.655.742 1.655 1.658V45h8.977v-7.336c0-.916.74-1.658 1.655-1.658h7.321v-13.57H40.25a.474.474 0 0 1-.334-.81L45 16.532ZM7.33 21.626 21.355 7.572a1.652 1.652 0 0 1 2.34 0L37.72 21.626a.474.474 0 0 1-.335.81h-1.422v11.911c0 .916-.74 1.659-1.654 1.659h-5.667a1.657 1.657 0 0 1-1.655-1.659V22.435h-8.976v11.912c0 .916-.741 1.659-1.655 1.659h-5.667a1.657 1.657 0 0 1-1.655-1.659V22.435h-1.37a.474.474 0 0 1-.334-.809Z" /></svg>`
			break
		case `land`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path  d="M 18.429688 18.429688 L 26.570312 18.429688 L 26.570312 26.570312 L 18.429688 26.570312 Z M 18.429688 18.429688 "/><path  d="M 34.710938 8.785156 L 34.710938 2.144531 L 18.429688 2.144531 L 18.429688 10.289062 L 33.210938 10.289062 C 34.039062 10.289062 34.710938 10.960938 34.710938 11.789062 L 34.710938 42.855469 L 42.855469 42.855469 L 42.855469 10.289062 L 36.214844 10.289062 C 35.386719 10.289062 34.710938 9.613281 34.710938 8.785156 Z M 34.710938 8.785156 "/><path  d="M 10.289062 33.210938 L 10.289062 2.144531 L 2.144531 2.144531 L 2.144531 34.710938 L 8.785156 34.710938 C 9.613281 34.710938 10.289062 35.386719 10.289062 36.214844 L 10.289062 42.855469 L 26.570312 42.855469 L 26.570312 34.710938 L 11.789062 34.710938 C 10.957031 34.710938 10.289062 34.039062 10.289062 33.210938 Z M 10.289062 33.210938 "/></svg>`
			break
		case `resources`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M 34.710938 16.925781 L 34.710938 10.285156 L 28.070312 10.285156 C 27.242188 10.285156 26.570312 9.613281 26.570312 8.785156 L 26.570312 2.144531 L 18.425781 2.144531 L 18.425781 8.785156 C 18.425781 9.613281 17.753906 10.285156 16.925781 10.285156 L 10.285156 10.285156 L 10.285156 16.925781 C 10.285156 17.757812 9.613281 18.429688 8.785156 18.429688 L 2.140625 18.429688 L 2.140625 34.714844 L 8.785156 34.714844 C 9.613281 34.714844 10.285156 35.386719 10.285156 36.214844 L 10.285156 42.855469 L 34.710938 42.855469 L 34.710938 36.214844 C 34.710938 35.386719 35.382812 34.714844 36.214844 34.714844 L 42.855469 34.714844 L 42.855469 18.429688 L 36.214844 18.429688 C 35.386719 18.429688 34.710938 17.757812 34.710938 16.925781 Z M 33.210938 34.710938 L 11.789062 34.710938 C 10.960938 34.710938 10.289062 34.039062 10.289062 33.210938 L 10.289062 19.929688 C 10.289062 19.101562 10.960938 18.425781 11.789062 18.425781 L 18.429688 18.425781 L 18.429688 11.785156 C 18.429688 10.957031 19.101562 10.285156 19.929688 10.285156 L 25.070312 10.285156 C 25.898438 10.285156 26.574219 10.957031 26.574219 11.785156 L 26.574219 18.425781 L 33.214844 18.425781 C 34.042969 18.425781 34.714844 19.101562 34.714844 19.929688 L 34.714844 33.210938 C 34.710938 34.039062 34.039062 34.710938 33.210938 34.710938 Z M 33.210938 34.710938 " /></svg>`
			break
		case `transport`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M44.999 17.999h-7.341a1.66 1.66 0 0 1-1.66-1.66V9h-7.34a1.66 1.66 0 0 1-1.66-1.66V0h-9v9h7.341c.916 0 1.66.743 1.66 1.66v5.68a1.66 1.66 0 0 1-1.66 1.66H0v9h25.34c.916 0 1.66.743 1.66 1.66v5.68A1.66 1.66 0 0 1 25.34 36H18v9h9v-7.34c0-.917.743-1.66 1.659-1.66h7.34v-7.34c0-.917.744-1.66 1.66-1.66H45v-9.001h-.001Zm-9 1.659v5.682a1.66 1.66 0 0 1-1.66 1.659h-5.681a1.66 1.66 0 0 1-1.66-1.66v-5.681c0-.916.743-1.66 1.66-1.66h5.681c.916 0 1.66.744 1.66 1.66Z" /></svg>`
			break
		case `urban`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M37.499 26.999h7.44v-9h-7.32a1.657 1.657 0 0 1-1.656-1.66V9h-7.321a1.657 1.657 0 0 1-1.655-1.66V0h-8.976v7.34c0 .917-.741 1.66-1.655 1.66h-7.32v7.34c0 .917-.74 1.66-1.654 1.66H.07v9H7.5c.705 0 1.16.744.844 1.375L0 44.987h9.032l7.189-14.398c.447-.895 1.79-.576 1.79.424V45h8.977V31.02c0-1 1.344-1.32 1.791-.424l7.177 14.366.012.023H45l-8.345-16.613A.946.946 0 0 1 37.499 27Zm-28.462-1.66v-5.681c0-.916.74-1.66 1.654-1.66h5.667c.914 0 1.655.744 1.655 1.66v5.682c0 .916-.741 1.659-1.655 1.659h-5.667a1.657 1.657 0 0 1-1.654-1.66ZM25.333 18h-5.666a1.657 1.657 0 0 1-1.655-1.66v-5.681c0-.916.741-1.66 1.655-1.66h5.666c.914 0 1.655.744 1.655 1.66v5.682c0 .916-.741 1.659-1.655 1.659Zm1.655 7.351v-5.692c0-.916.741-1.66 1.655-1.66h5.667c.913 0 1.654.744 1.654 1.66v5.692c0 .916-.74 1.66-1.654 1.66h-5.667a1.657 1.657 0 0 1-1.655-1.66Z" /></svg>`
			break
		case `explorer`:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 46"><path d="M26.954 18.081h-8.957v9.003h8.957V18.08Z" /><path d="M45 16.652 28.513.082l-4.811 4.836a1.645 1.645 0 0 1-2.336 0L16.546.072 0 16.702l4.673 4.696a1.665 1.665 0 0 1 0 2.347L0 28.442l16.547 16.63 4.82-4.846a1.645 1.645 0 0 1 2.336 0l4.812 4.834L45 28.493l-4.724-4.748a1.665 1.665 0 0 1 0-2.347L45 16.652Zm-23.643 20.83L7.69 23.744a1.665 1.665 0 0 1 0-2.347L21.357 7.662a1.645 1.645 0 0 1 2.335 0L37.36 21.398a1.665 1.665 0 0 1 0 2.347L23.692 37.481a1.645 1.645 0 0 1-2.335 0Z" /></svg>`
			break
		default:
			svgData = `<svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 45"><path d="M27.03 16.34V0h-9v16.34A1.66 1.66 0 0 1 16.37 18H.03v9h16.34c.916 0 1.66.743 1.66 1.66V45h9V28.66c0-.917.743-1.66 1.659-1.66h16.34v-9H28.69c-.918 0-1.66-.743-1.66-1.66Zm0 3.319v5.682A1.66 1.66 0 0 1 25.37 27h-5.682a1.66 1.66 0 0 1-1.659-1.66v-5.682c0-.916.743-1.66 1.66-1.66h5.681c.916 0 1.66.744 1.66 1.66ZM9.03 0h-9v9h9V0ZM9.03 36h-9v9h9v-9ZM45.03 0h-9v9h9V0ZM45.03 36h-9v9h9v-9Z" /></svg>`
	}

	return (
		<div
			id={`${theme_lowercased}-icon`}
			key={theme_lowercased}
			style={{ width: size, height: size }}
			dangerouslySetInnerHTML={{ __html: svgData }}
		/>
	)
}

export default SvgIcon
