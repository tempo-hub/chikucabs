import { MetadataRoute } from 'next';
import routeData from '@/data/routeData.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://chikucabs.com';

    const dynamicRoutes = routeData.map((route: { url: string }) => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        priority: route.url.includes('-to-') ? 0.9 : 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            priority: 1.0,
        },
        ...dynamicRoutes,
    ];
}
