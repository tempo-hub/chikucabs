import Link from 'next/link';
import { ParsedRouteData } from '@/lib/urlParser';
import ObjectRouteData from '@/data/routeData.json';

// Helper to format a url into a human-readable title
function generateTitleFromSlug(url: string) {
    const parts = url.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1] || '';
    const cleanSlug = lastPart.replace(/\.php$/, '');
    
    const words = cleanSlug.split('-');
    
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getIconForRoute(url: string) {
    const l = url.toLowerCase();
    if (l.includes('tempo') || l.includes('traveller')) return '🚐';
    if (l.includes('innova')) return '✨';
    if (l.includes('bus')) return '🚍';
    if (l.includes('airport')) return '✈️';
    if (l.includes('local')) return '🏙️';
    return '🚘';
}

export default function InternalLinks({ parsedData }: { parsedData: ParsedRouteData }) {
    const { origin, destination } = parsedData;
    const allRoutes = ObjectRouteData as { url: string }[];
    const currentUrlParts = parsedData.slugs ? parsedData.slugs.join('/') : '';
    
    const possibleRoutes = allRoutes.filter(r => !r.url.endsWith(currentUrlParts));
    
    const sameOriginRoutes = [];
    const sameDestRoutes = [];
    const localServices = [];
    
    const oLower = origin?.toLowerCase();
    const dLower = destination?.toLowerCase();

    for (const r of possibleRoutes) {
        const lowerUrl = r.url.toLowerCase();
        
        if (oLower && lowerUrl.includes(oLower)) {
            if (dLower && lowerUrl.includes(dLower)) {
                sameOriginRoutes.push(r);
            } else if (lowerUrl.includes('-to-')) {
                sameOriginRoutes.push(r);
            } else {
                localServices.push(r);
            }
        } else if (dLower && lowerUrl.includes(dLower)) {
            sameDestRoutes.push(r);
        }
    }
    
    const selected = [
        ...sameOriginRoutes.slice(0, 6),
        ...sameDestRoutes.slice(0, 3),
        ...localServices.slice(0, 3)
    ];
    
    if (selected.length < 6) {
        const excludeHrefs = new Set(selected.map(s => s.url));
        const fallbacks = allRoutes.filter(r => !excludeHrefs.has(r.url) && !r.url.endsWith(currentUrlParts)).slice(0, 12 - selected.length);
        selected.push(...fallbacks);
    }
    
    const uniqueSelected = Array.from(new Map(selected.map(item => [item.url, item])).values()).slice(0, 12);
    
    if (uniqueSelected.length === 0) return null;
    
    const displayCity = origin || destination || "India";

    return (
        <section className="py-24 border-t">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="section-badge mx-auto" style={{ display: 'inline-flex' }}>EXPLORE MORE</div>
                    <h2 className="section-title">Popular Routes & Services from {displayCity}</h2>
                    <p className="section-subtitle mx-auto">Discover other top cab rental options and outstation routes.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uniqueSelected.map((item, i) => {
                        const title = generateTitleFromSlug(item.url);
                        const icon = getIconForRoute(item.url);
                        return (
                            <Link key={i} href={item.url.startsWith('/') ? item.url : `/${item.url}`} className="route-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <div className="route-card-icon">{icon}</div>
                                <span className="font-semibold text-sm line-clamp-2" style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{title}</span>
                                <span style={{ opacity: 0.3, fontWeight: 'bold' }}>→</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
