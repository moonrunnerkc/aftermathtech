import dynamic from 'next/dynamic';

const Services = dynamic(() => import('@/components/Services'), { ssr: false });

export default function Page() {
    return <Services />;
}
