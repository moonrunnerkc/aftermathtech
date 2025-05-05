import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'LunarBeacon AI – Aftermath Technologies',
    description:
    'Signal authentication via lunar reflection modeling, GPS telemetry, and GPT-4 intelligence. Built for zero-trust satellite verification during outages or spoofing.',
    openGraph: {
        title: 'LunarBeacon AI – Aftermath Technologies',
        description:
        'Signal authentication via lunar reflection modeling, GPS telemetry, and GPT-4 intelligence. Built for zero-trust satellite verification during outages or spoofing.',
        url: 'https://aftermathtech.com/portfolio/lunarbeacon',
        siteName: 'Aftermath Technologies',
        images: [
            {
                url: '/lunarbeacon-og.png',
                width: 1200,
                height: 630,
                alt: 'LunarBeacon AI – Satellite Signal Authentication',
            },
        ],
        locale: 'en_US',
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LunarBeacon AI – Aftermath Technologies',
        description:
        'Satellite signal verification under jamming or spoofing. Powered by orbital physics, GPT-4, and FastAPI.',
        images: ['/lunarbeacon-og.png'],
    },
};
