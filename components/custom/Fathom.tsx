'use client'

import { load, trackPageview } from 'fathom-client'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
// const MY_FATHOM_ID = process.env.FATHOM_API_TOKEN
const MY_FATHOM_ID = process.env.FATHOM_SITE_ID

function TrackPageView () {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        load(MY_FATHOM_ID!, {
            auto: true
        })
    }, [])

    useEffect(() => {
        if (!pathname) return;

        trackPageview({
            url: pathname + searchParams?.toString(),
            referrer: document.referrer
        })
    }, [pathname, searchParams])

    return null
}

export default function Fathom() {
    return (
        <Suspense fallback={null}><TrackPageView /></Suspense>
    )
}