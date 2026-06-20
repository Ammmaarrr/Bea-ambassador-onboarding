"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock response interface matching high-fidelity layout
interface ResponseItem {
    id: string;
    rank: string;
    subtitle: string;
    promptTitle: string;
    text: string;
    likes: number;
    userName: string;
    school: string;
    commentsCount: number;
    trophyText: string;
    avatarSrc: string;
}

export default function DashboardPage() {
    // Search and filters state
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'most-liked' | 'recent'>('most-liked');
    const [scopeTab, setScopeTab] = useState<'school' | 'market' | 'national'>('school');

    // Interactive states for mock data to allow Liking responses
    const [likedState, setLikedState] = useState<Record<string, { count: number; active: boolean }>>({});

    // Mock data for responses based on the layout screenshots
    const responsesData: Record<'school' | 'market' | 'national', ResponseItem[]> = {
        school: [
            {
                id: 'school-1',
                rank: '#1 UConn',
                subtitle: 'Your campus',
                promptTitle: 'A random fact I love is..',
                text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
                likes: 512,
                userName: 'Ron',
                school: 'Northeastern',
                commentsCount: 0,
                trophyText: 'Top School Response wins 3 months of Bea Premium',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'school-2',
                rank: '#2 UConn',
                subtitle: 'Your campus',
                promptTitle: 'A random fact I love is..',
                text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
                likes: 512,
                userName: 'Ron',
                school: 'Northeastern',
                commentsCount: 0,
                trophyText: 'Top School Response wins 3 months of Bea Premium',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'school-3',
                rank: '#3 UConn',
                subtitle: 'Your campus',
                promptTitle: 'A random fact I love is..',
                text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh',
                likes: 512,
                userName: 'Ron',
                school: 'Northeastern',
                commentsCount: 0,
                trophyText: 'Top School Response wins 3 months of Bea Premium',
                avatarSrc: '/images/ron-avatar.png'
            }
        ],
        market: [
            {
                id: 'market-1',
                rank: '#1 BU',
                subtitle: 'Boston market',
                promptTitle: 'My favorite local spot is..',
                text: 'Tatte Bakery on a Sunday morning. The shakshuka is incredible and the vibes are unmatched.',
                likes: 342,
                userName: 'Dan K.',
                school: 'Boston University',
                commentsCount: 4,
                trophyText: 'Top Market Response wins a free dinner date',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'market-2',
                rank: '#2 Harvard',
                subtitle: 'Boston market',
                promptTitle: 'A random fact I love is..',
                text: 'Harvard Yard was once used to graze cattle. Now it is just students grazing on coffee.',
                likes: 289,
                userName: 'Julia R.',
                school: 'Harvard',
                commentsCount: 2,
                trophyText: 'Top Market Response wins a free dinner date',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'market-3',
                rank: '#3 BC',
                subtitle: 'Boston market',
                promptTitle: 'My weekend plans include..',
                text: 'Going down to the Reservoir and hoping to pet at least five golden retrievers.',
                likes: 156,
                userName: 'Tim O.',
                school: 'Boston College',
                commentsCount: 1,
                trophyText: 'Top Market Response wins a free dinner date',
                avatarSrc: '/images/ron-avatar.png'
            }
        ],
        national: [
            {
                id: 'national-1',
                rank: '#1 NYU',
                subtitle: 'National ranking',
                promptTitle: 'What\'s your ideal first date',
                text: 'A ride on the ferry at sunset, then getting street tacos. Dynamic views and delicious food make conversations flow so easily.',
                likes: 1245,
                userName: 'Ethan G.',
                school: 'NYU',
                commentsCount: 18,
                trophyText: 'National Winner gets featured on the App Store frontpage',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'national-2',
                rank: '#2 UCLA',
                subtitle: 'National ranking',
                promptTitle: 'A random fact I love is..',
                text: 'The Hollywood sign originally said "Hollywoodland" and was just a temporary real estate billboard.',
                likes: 982,
                userName: 'Chloe V.',
                school: 'UCLA',
                commentsCount: 12,
                trophyText: 'National Winner gets featured on the App Store frontpage',
                avatarSrc: '/images/ron-avatar.png'
            },
            {
                id: 'national-3',
                rank: '#3 Stanford',
                subtitle: 'National ranking',
                promptTitle: 'My absolute go-to snack is..',
                text: 'Frozen grapes rolled in lime juice and sugar. It literally tastes like Sour Patch Kids but healthy.',
                likes: 843,
                userName: 'Marcus Y.',
                school: 'Stanford',
                commentsCount: 8,
                trophyText: 'National Winner gets featured on the App Store frontpage',
                avatarSrc: '/images/ron-avatar.png'
            }
        ]
    };

    // Toggle heart like state helper
    const handleLike = (id: string, initialLikes: number) => {
        setLikedState(prev => {
            const current = prev[id] || { count: initialLikes, active: false };
            if (current.active) {
                return { ...prev, [id]: { count: current.count - 1, active: false } };
            } else {
                return { ...prev, [id]: { count: current.count + 1, active: true } };
            }
        });
    };

    // Filtered & Sorted items
    const getFilteredResponses = () => {
        let list = [...responsesData[scopeTab]];

        // Handle Search
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            list = list.filter(item =>
                item.text.toLowerCase().includes(query) ||
                item.userName.toLowerCase().includes(query) ||
                item.school.toLowerCase().includes(query) ||
                item.promptTitle.toLowerCase().includes(query) ||
                item.rank.toLowerCase().includes(query)
            );
        }

        // Handle Sorting
        list.sort((a, b) => {
            const aLikes = likedState[a.id]?.count ?? a.likes;
            const bLikes = likedState[b.id]?.count ?? b.likes;
            if (sortBy === 'most-liked') {
                if (bLikes !== aLikes) {
                    return bLikes - aLikes;
                }
            }
            // Secondary sort: compare ranks so #1 is always before #2, and #2 before #3
            return a.rank.localeCompare(b.rank);
        });

        return list;
    };

    const currentResponses = getFilteredResponses();

    return (
        <>
            {/* MAIN DASHBOARD PANEL */}
            <main className="flex-1 flex flex-col gap-6 md:gap-8">

                {/* TODAY'S PROMPT CARD (fbf6f3) */}
                <section className="bg-[#fbf6f3] rounded-[12px] p-6 md:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.11)] border border-neutral-200/40 relative overflow-hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                    {/* Left Side Info */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                        <div className="flex items-center gap-2">
                            {/* Today's Prompt label text color (4c3b34) - SF Pro Display style 9px */}
                            <span className="font-sfpro text-[12px] md:text-[18px] font-bold tracking-[0.05em] text-[#4c3b34] uppercase">
                                Today&apos;s Prompt
                            </span>
                            {/* 12hr left badge (efebe5) - Lato 7px */}
                            <span className="bg-[#efebe5] text-[#9f947e] font-lato text-[10px] md:text-[14px] font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                                12h left
                            </span>
                        </div>

                        <div className="space-y-2.5">
                            {/* Today's prompt main heading text color (332822) - Canela 24px */}
                            <h2 className="text-[20px] md:text-[24px] font-canela text-[#332822] tracking-tight leading-tight">
                                What&apos;s your<br />ideal first date
                            </h2>
                            {/* Share description - Lato 10px */}
                            <p className="text-[12px] md:text-[18px] font-lato font-semibold text-neutral-500 max-w-sm leading-relaxed">
                                Share your best response and<br className="hidden sm:inline" />see what your community thinks
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-1">
                            {/* Submit your response box (1b1b1b) - Lato 9px */}
                            <button className="bg-[#1b1b1b] hover:bg-black text-white font-lato text-[12px] md:text-[18px] font-bold px-5 py-2.5 rounded-[8px] shadow-sm hover:shadow transition-all duration-200 active:scale-[0.98] cursor-pointer">
                                Submit your response
                            </button>
                            {/* See all responses - Lato 9px */}
                            <button className="font-lato text-[12px] md:text-[18px] font-bold text-neutral-800 hover:text-black flex items-center gap-1 group py-2 cursor-pointer">
                                <span>See all responses</span>
                                <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Side Sketch Art Illustration */}
                    <div className="w-full sm:w-56 h-36 flex items-center justify-center shrink-0 relative bg-gradient-to-tr from-[#faf8f5] to-transparent rounded-[8px] overflow-hidden self-center sm:self-auto border border-neutral-100/40">
                        <Image
                            src="/images/assets/chairs.png"
                            alt="Chairs and table"
                            fill
                            sizes="(max-width: 640px) 100vw, 224px"
                            className="object-contain p-2 select-none"
                        />
                    </div>
                </section>

                {/* TOP RESPONSES SECTION */}
                <section className="space-y-5">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[16px] md:text-[24px] font-sfpro font-bold uppercase tracking-[0.05em] text-neutral-500">
                            Top Responses
                        </h3>

                        {/* SEARCH & FILTERS ROW */}
                        <div className="flex flex-col sm:flex-row gap-3.5 justify-between items-stretch sm:items-center">
                            {/* Search schools or markets */}
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search schools or markets"
                                    className="w-full bg-[#faf9f6] border border-neutral-200 rounded-[8px] pl-10 pr-4 py-2.5 font-lato text-[11px] md:text-[14px] text-neutral-800 placeholder:font-lato placeholder:text-[11px] md:placeholder:text-[14px] placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all font-medium"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Right filter elements */}
                            <div className="flex items-center justify-between sm:justify-start gap-4">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as 'most-liked' | 'recent')}
                                        className="appearance-none bg-[#faf9f6] border border-neutral-200 rounded-[8px] pl-4 pr-9 py-2.5 font-lato text-[11px] md:text-[14px] font-bold text-neutral-700 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all cursor-pointer"
                                    >
                                        <option value="most-liked" className="font-lato text-[14px] md:text-[18px]">Most liked</option>
                                        <option value="recent" className="font-lato text-[14px] md:text-[18px]">Recent responses</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Link */}
                                <button className="text-[14px] md:text-[18px] font-bold text-neutral-800 hover:text-black flex items-center gap-1 group py-2 whitespace-nowrap cursor-pointer">
                                    <span>See all responses</span>
                                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.8}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TABS SELECTOR ROW */}
                    <div className="flex items-center gap-2 w-full sm:max-w-md md:max-w-lg">
                        <button
                            onClick={() => setScopeTab('school')}
                            className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${scopeTab === 'school'
                                ? 'bg-[#584939] text-white border border-[#584939]'
                                : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                                }`}
                        >
                            Your School
                        </button>
                        <button
                            onClick={() => setScopeTab('market')}
                            className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${scopeTab === 'market'
                                ? 'bg-[#584939] text-white border border-[#584939]'
                                : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                                }`}
                        >
                            Your Market
                        </button>
                        <button
                            onClick={() => setScopeTab('national')}
                            className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${scopeTab === 'national'
                                ? 'bg-[#584939] text-white border border-[#584939]'
                                : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                                }`}
                        >
                            National
                        </button>
                    </div>

                    {/* LIST OF DYNAMIC RESPONSES (MATCHING SCREENSHOT) */}
                    <div className="grid grid-cols-1 gap-5 pt-2">
                        {currentResponses.length > 0 ? (
                            currentResponses.map((item) => {
                                const userLikeState = likedState[item.id] || { count: item.likes, active: false };
                                return (
                                    /* UConn response card background (efebe5) */
                                    <div
                                        key={item.id}
                                        className="bg-[#efebe5] rounded-[10px] p-6 border border-neutral-200/40 flex flex-col gap-4.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-200 relative"
                                    >
                                        {/* Rank and Like Row */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-[22px] md:text-[36px] font-sfpro font-normal text-neutral-900 leading-none tracking-[0.08em]">
                                                    {item.rank}
                                                </h4>
                                                {/* Subtitle text color (93908c) */}
                                                <span className="text-[11px] md:text-[18px] font-minion text-[#93908c] mt-1 uppercase tracking-wider block">
                                                    {item.subtitle}
                                                </span>
                                            </div>

                                            {/* Like count box background (f6f6f6) and text color/heart stroke (752a31), empty heart */}
                                            <button
                                                onClick={() => handleLike(item.id, item.likes)}
                                                className="px-3 py-1.5 rounded-[6px] font-lato text-[11px] md:text-[14px] font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer bg-[#f6f6f6] border border-neutral-200/30 text-[#752a31] hover:opacity-85"
                                            >
                                                <span>{userLikeState.count} likes</span>
                                                <svg
                                                    className="w-3.5 h-3.5 stroke-[#752a31] fill-none"
                                                    strokeWidth={2.5}
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Quote and Response Body */}
                                        <div className="flex gap-2.5 items-start pl-1">
                                            {/* Double Quote Mark (cbc2bf) */}
                                            <span className="text-[40px] md:text-[60px] font-serif text-[#cbc2bf] leading-none select-none -mt-1 opacity-85">
                                                ΓÇ£
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                <h5 className="text-[16px] md:text-[24px] font-canela font-bold text-neutral-600 leading-tight max-w-[240px]">
                                                    {item.promptTitle}
                                                </h5>
                                                <p className="text-[11px] md:text-[14px] font-lato font-semibold text-neutral-500 max-w-[320px] leading-relaxed mt-1">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Profile and Comment Row */}
                                        <div className="flex items-center justify-between border-t border-neutral-300/35 pt-4 pl-1">
                                            <div className="flex items-center gap-2.5">
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100 flex items-center justify-center">
                                                    <Image
                                                        src={item.avatarSrc}
                                                        alt={`${item.userName} avatar`}
                                                        fill
                                                        sizes="28px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <p className="text-[12px] md:text-[18px] font-lato text-neutral-800">
                                                    <span className="font-bold">{item.userName}</span>
                                                    <span className="text-neutral-400 font-medium">, {item.school}</span>
                                                </p>
                                            </div>

                                            <button className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-700 text-[11px] md:text-[14px] font-semibold cursor-pointer">
                                                <span>{item.commentsCount} comments</span>
                                                {/* Speech Bubble Icon */}
                                                <svg className="w-4.5 h-4.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.92 1.637 10.902 10.902 0 002.93-.983c.615-.17 1.247.1 1.755.378a8.889 8.889 0 004.376.983z" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Trophy Gold/Olive Line (top school response wins text color - 86795f) */}
                                        <div className="flex items-center gap-2 mt-1 pl-1">
                                            <span className="text-sm select-none">≡ƒÅå</span>
                                            <span className="text-[12px] md:text-[18px] font-minion text-[#86795f]">
                                                {item.trophyText}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="bg-white/40 rounded-[22px] p-8 text-center border border-dashed border-neutral-300/60">
                                <p className="text-[16px] md:text-[24px] font-semibold text-neutral-500">No responses match your search query.</p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-[16px] md:text-[24px] font-bold text-neutral-800 hover:underline mt-2 cursor-pointer"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>

                    {/* EST 2 WEEKS UNTIL LAUNCH CARD (f9f5f2) & GET THE APP BUTTON (8a8886) */}
                    <div className="bg-[#f9f5f2] rounded-[10px] p-5 border border-neutral-200/40 flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                        <div className="flex items-center gap-4">
                            {/* Calendar icon container background (f6dedc) */}
                            <div className="w-11 h-11 rounded-full bg-[#f6dedc] flex items-center justify-center text-[#df8b6b] flex-shrink-0">
                                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[16px] md:text-[24px] font-sfpro font-normal text-neutral-800 leading-tight tracking-[0.03em]">
                                    Est 2 weeks until launch
                                </h4>
                                <p className="text-[12px] md:text-[18px] font-lato font-medium text-neutral-500 mt-1">
                                    You&apos;ll be notified by email
                                </p>
                            </div>
                        </div>

                        <button className="bg-[#8a8886] hover:bg-[#727170] active:scale-[0.98] text-white font-lato text-[12px] md:text-[18px] font-bold px-6 py-2.5 rounded-[8px] select-none flex-shrink-0 shadow-sm transition-all cursor-pointer">
                            Get the app
                        </button>
                    </div>
                </section>
            </main>

            {/* SIDEBAR WIDGETS (RIGHT COLUMN) */}
            <aside className="w-full md:w-72 shrink-0 flex flex-col gap-6 self-start">

                {/* YOUR PROGRESS CARD (f6f4f1) */}
                <div className="bg-[#f6f4f1] rounded-[12px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] border border-neutral-200/100 flex flex-col">
                    <div className="space-y-4">
                        <div>
                            {/* Your Progress label text color (695b54) */}
                            <span className="text-[11px] md:text-[14px] font-sfpro font-bold tracking-[0.15em] text-[#695b54] uppercase">
                                Your Progress
                            </span>
                            {/* Progress percentage text color (2b2b2b) */}
                            <h3 className="text-[32px] md:text-[48px] font-sfpro font-normal text-[#2b2b2b] leading-none tracking-[0.03em] mt-1">
                                50%
                            </h3>
                            {/* Lets get to 100 text color (c1bebc) */}
                            <p className="text-[11px] md:text-[14px] font-lato font-semibold text-[#c1bebc] mt-1">
                                Lets get to 100!
                            </p>
                        </div>

                        {/* Progress bar background (ece8e4) */}
                        <div className="w-full h-[7.5px] bg-[#ece8e4] rounded-full overflow-hidden">
                            {/* Progress bar filled color (4a3428) */}
                            <div className="w-1/2 h-full bg-[#4a3428] rounded-full transition-all duration-500 ease-out" />
                        </div>
                    </div>

                    {/* How it works section */}
                    <div className="mt-8 space-y-4">
                        <span className="text-[11px] md:text-[14px] font-lato font-bold tracking-[0.15em] text-neutral-500 uppercase block">
                            How it works
                        </span>

                        <div className="space-y-3.5">
                            {/* Item 1: Completed */}
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    {/* Number circle background (e1dad7) */}
                                    <div className="w-5.5 h-5.5 rounded-full bg-[#e1dad7] flex items-center justify-center text-[14px] md:text-[20px] font-bold text-neutral-700">
                                        1
                                    </div>
                                    <span className="font-lato text-[11px] md:text-[14px] font-bold text-neutral-700 group-hover:text-black transition-colors">
                                        Participate in daily prompts
                                    </span>
                                </div>
                                {/* Green ticks background (427c49) */}
                                <div className="w-4.5 h-4.5 rounded-full bg-[#427c49] flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Item 2: Completed */}
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    {/* Number circle background (e1dad7) */}
                                    <div className="w-5.5 h-5.5 rounded-full bg-[#e1dad7] flex items-center justify-center text-[14px] md:text-[20px] font-bold text-neutral-700">
                                        2
                                    </div>
                                    <span className="font-lato text-[11px] md:text-[14px] font-bold text-neutral-700 group-hover:text-black transition-colors">
                                        Invite friends
                                    </span>
                                </div>
                                {/* Green ticks background (427c49) */}
                                <div className="w-4.5 h-4.5 rounded-full bg-[#427c49] flex items-center justify-center text-white shrink-0 shadow-sm">
                                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Item 3: Empty */}
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {/* Number circle background (e1dad7) */}
                                    <div className="w-5.5 h-5.5 rounded-full bg-[#e1dad7] flex items-center justify-center text-[14px] md:text-[20px] font-bold text-neutral-700">
                                        3
                                    </div>
                                    <span className="font-lato text-[11px] md:text-[14px] font-bold text-neutral-700">
                                        Earn rewards
                                    </span>
                                </div>
                                <div className="w-4.5 h-4.5 rounded-full border-[1.5px] border-neutral-300 shrink-0" />
                            </div>

                            {/* Item 4: Empty */}
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity">
                                    {/* Number circle background (e1dad7) */}
                                    <div className="w-5.5 h-5.5 rounded-full bg-[#e1dad7] flex items-center justify-center text-[14px] md:text-[20px] font-bold text-neutral-700">
                                        4
                                    </div>
                                    <span className="font-lato text-[11px] md:text-[14px] font-bold text-neutral-700">
                                        Unlock your city
                                    </span>
                                </div>
                                <div className="w-4.5 h-4.5 rounded-full border-[1.5px] border-neutral-300 shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* Invite Friends Action Button (eaeaea) */}
                    <button className="mt-8 bg-[#eaeaea] hover:bg-[#dfdfdf] active:scale-[0.98] text-neutral-800 font-lato text-[13px] md:text-[18px] font-bold py-3.5 rounded-[8px] text-center transition-all duration-200 cursor-pointer shadow-sm">
                        Invite friends
                    </button>
                </div>

                {/* RECENT ACTIVITY CARD (f6f4f1) */}
                <div className="bg-[#f6f4f1] rounded-[12px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] border border-neutral-200/40 flex flex-col gap-5">
                    {/* Recent Activity label text color (493932) */}
                    <span className="text-[11px] md:text-[14px] font-sfpro font-bold tracking-[0.15em] text-[#493932] uppercase">
                        Recent Activity
                    </span>

                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3.5 group">
                                {/* Gray circle icon inside recent activity (d4d4d4) */}
                                <div className="w-7 h-7 rounded-full bg-[#d4d4d4] flex-shrink-0 shadow-inner" />
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <p className="font-lato text-[11px] md:text-[14px] font-bold text-neutral-900 leading-none">
                                        Northeastern
                                    </p>
                                    <p className="font-lato text-[11px] md:text-[14px] text-neutral-700 leading-none mt-1">
                                        Took the lead in Boston
                                    </p>
                                    <p className="font-lato text-[9px] md:text-[12px] font-semibold text-neutral-400 mt-1.5 leading-none">
                                        2 min ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-neutral-200/60 pt-4 mt-2">
                        <button className="w-full font-minion text-[11px] md:text-[14px] font-bold text-neutral-700 hover:text-black text-center transition-all cursor-pointer">
                            See all activity
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
