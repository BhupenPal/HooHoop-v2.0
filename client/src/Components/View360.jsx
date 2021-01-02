import React, { useEffect, useRef } from "react"
import { useState } from "react"

const PanoViewer = eg.view360.PanoViewer

function View360({ image }) {
	const interiorView = useRef(null)
	const panoSet = useRef(null)

	const [randomId2, setId2] = useState(
		(Math.floor(Math.random() * 100) + 1).toString()
	)

	useEffect(() => {
		var srcImage = new Image()
		srcImage.crossOrigin = "anonymous"
		srcImage.src = image
		const interiorViewContainer = document.getElementById("pano-adjustable")
		const pano = new PanoViewer(interiorViewContainer, {
			image: srcImage,
			projectionType: "equirectangular",
			gyroMode: "yawPitch",
		})
		const panoSetContainer = document.getElementById(randomId2)
		PanoControls.init(panoSetContainer, pano, {
			enableGyroOption: true,
			enableTouchOption: true,
		})
		PanoControls.showLoading()
	}, [])

	return (
		<div
			style={{ width: "100%", height: "100%" }}
			className="panoviewer-container viewer"
		>
			<div
				style={{
					width: "100%",
					position: "relative",
				}}
				id={randomId2}
				ref={panoSet}
			>
				<div
					id={"pano-adjustable"}
					style={{
						height: "100%",
						paddingTop: "56.25%",
					}}
					ref={interiorView}
				></div>
			</div>
		</div>
	)
}

export default View360