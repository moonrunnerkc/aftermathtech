'use client';

import { Suspense } from 'react';
import Services from 'components/services';

export default function ServicesPageWrapper() {
    return (
        <Suspense>
        <Services />
        </Suspense>
    );
}
