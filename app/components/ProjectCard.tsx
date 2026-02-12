'use client';

import { useState } from 'react';
import NextImage from 'next/image';
import { ArrowLeftRight } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    location: string;
    beforeImage: string;
    afterImage: string;
    alt: string;
    accentColor: string;
    actionColor: string;
    index?: number;
}

export function ProjectCard({
    title,
    location,
    beforeImage,
    afterImage,
    alt,
    accentColor,
    actionColor,
    index = 0,
}: ProjectCardProps) {
    const [showAfter, setShowAfter] = useState(true);

    return (
        <div className="snap-center shrink-0 w-[85vw] md:w-auto flex flex-col group relative overflow-hidden rounded-lg bg-slate-900 border border-slate-700/50 hover:border-blue-500/40 transition-all duration-300">
            {/* Image Area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: showAfter ? 0 : 1 }}>
                    <NextImage
                        src={beforeImage}
                        alt={`Before - ${alt}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
                <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: showAfter ? 1 : 0 }}>
                    <NextImage
                        src={afterImage}
                        alt={`After - ${alt}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>

                {/* Before/After Label */}
                <div className="absolute top-3 left-3 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${showAfter ? 'bg-blue-600/90 text-white' : 'bg-white/90 text-slate-800'}`}>
                        {showAfter ? 'After' : 'Before'}
                    </span>
                </div>

                {/* Toggle Button */}
                <div className="absolute bottom-3 right-3 z-20">
                    <button
                        onClick={(e) => { e.preventDefault(); setShowAfter(!showAfter); }}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-white/90 hover:bg-white text-slate-800 rounded-full backdrop-blur-sm transition-all shadow-md"
                    >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        {showAfter ? 'See Before' : 'See After'}
                    </button>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Info */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-slate-400">
                    {location}, TX
                </p>
            </div>
        </div>
    );
}
