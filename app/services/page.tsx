'use client';

import { Suspense } from 'react';
import Services from '@/components/Services';

export default function ServicesPageWrapper() {
    return (
        <Suspense>
        <Services />
        </Suspense>
    );
}
