'use client';

import MarmosetScene from "@/components/MarmosetScene";
import Script from "next/script"
import { FC, useEffect } from "react"

type PageProps = object

declare global {
  interface Window {
    marmoset: any;
  }
}

const Page: FC<PageProps> = ({}) => {
  
	return (
		<div>
			<section>place here</section>

      <MarmosetScene />
		</div>
	)
}

export default Page
