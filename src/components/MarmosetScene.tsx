"use client"

import Script from "next/script"
import { FC, useEffect, useRef, useState } from "react"

declare global {
	interface Window {
		marmoset: any
	}
}

type Marmoset = any

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MarmosetSceneProps {}

const MarmosetScene: FC<MarmosetSceneProps> = ({}) => {
	const [marmoset, setMarmoset] = useState<null | Marmoset>(null)
	const marmRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (window && window.marmoset) {
			setMarmoset(window.marmoset as Marmoset)
		}
		console.log("use effect", window.marmoset)
	}, [])

	useEffect(() => {
		if (marmoset) {
			initScene(marmoset)
		}
	}, [marmoset])

	const initScene = (m: Marmoset) => {
    const { clientWidth, clientHeight } = document.body;
		const url = "https://dl.dropboxusercontent.com/scl/fi/axven46o3k3mjyu2ix6eq/ness.mview?rlkey=jvj5or8jrbiz6euhy14lhptod&st=kqu28tud&raw=1"
		const viewer = new m.WebViewer(clientWidth, clientHeight * 0.8, url)
		console.log(viewer)

		marmRef.current?.append(viewer.domRoot)
	}

	return (
		<>
			<div>
				<div className="marmoset-container" ref={marmRef}></div>
				<Script
					src="https://viewer.marmoset.co/main/marmoset.js"
					strategy="afterInteractive"
					onLoad={() => {
						setMarmoset(window.marmoset)
					}}></Script>
			</div>
		</>
	)
}

export default MarmosetScene
