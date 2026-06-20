"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface LeaderboardItem {
    rank: number;
    name: string;
    sublabel?: string;
    avatar: string;
    prompts: number | null;
    invites: number | null;
    total: number;
    rankChange: 'up' | 'down' | 'none';
    changeValue?: number;
}

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<'campus' | 'market' | 'national'>('campus');
    const [selectedSchool, setSelectedSchool] = useState('University of Connecticut');

    const leaderboardData: LeaderboardItem[] = [
        {
            rank: 1,
            name: 'Ron',
            sublabel: 'University of Connecticut',
            avatar: '/images/ron-avatar-new.png',
            prompts: 200,
            invites: 400,
            total: 600,
            rankChange: 'up',
            changeValue: 2
        },
        {
            rank: 2,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'down',
            changeValue: 2
        },
        {
            rank: 3,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'none'
        },
        {
            rank: 4,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'none'
        },
        {
            rank: 5,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'none'
        },
        {
            rank: 6,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'none'
        },
        {
            rank: 7,
            name: 'Ron',
            avatar: '/images/ron-avatar-new.png',
            prompts: null,
            invites: null,
            total: 1102,
            rankChange: 'none'
        }
    ];

    return (
        <main className="flex-1 flex flex-col gap-6 md:gap-8">

            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-[22px] md:text-[36px] font-canela font-medium tracking-[0.03em] text-neutral-900 leading-tight">
                    Leaderboard
                </h1>
                <p className="text-[12px] md:text-[18px] font-lato font-medium tracking-[0.03em] text-neutral-500">
                    See who&apos;s leading the waitlist experience.
                </p>
            </div>

            {/* TABS & SCHOOL SELECTOR ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mt-1">
                {/* Independent Tabs Control Row */}
                <div className="flex items-center gap-2 w-full sm:max-w-md md:max-w-lg">
                    <button
                        onClick={() => setActiveTab('campus')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeTab === 'campus'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        Campus
                    </button>
                    <button
                        onClick={() => setActiveTab('market')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeTab === 'market'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        Market
                    </button>
                    <button
                        onClick={() => setActiveTab('national')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeTab === 'national'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        National
                    </button>
                </div>

                {/* School Dropdown */}
                <div className="relative shrink-0 w-full sm:w-auto">
                    <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full sm:w-64 appearance-none bg-[#fbfbf9] border border-neutral-200/80 rounded-[8px] pl-4 pr-10 py-2.5 font-lato font-medium text-[11px] md:text-[18px] text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer shadow-sm"
                    >
                        <option value="University of Connecticut">University of Connecticut</option>
                        <option value="Northeastern University">Northeastern University</option>
                        <option value="Boston University">Boston University</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* SUMMARY COMPETITION CARD */}
            <section className="bg-[#fbfbf9] border border-neutral-200/50 rounded-[12px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col gap-6 w-full">
                {/* Header portion */}
                <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-[#efebe5] flex items-center justify-center shrink-0">
                        {/* columns building pillars icon */}
                        <svg className="w-5.5 h-5.5 text-[#584939]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.5M4.5 21V10.5M2.25 21h19.5" />
                        </svg>
                    </div>
                    <div className="min-w-0">
                        <span className="font-lato text-[16px] md:text-[24px] font-medium text-neutral-800 block leading-none">
                            {selectedSchool}
                        </span>
                        <span className="font-lato text-[12px] md:text-[18px] font-medium text-neutral-500 mt-1.5 block leading-none">
                            Campus Competition
                        </span>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-[1px] bg-neutral-200/60 w-full" />

                {/* Stats Columns Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-start w-full">
                    {/* Your Rank */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-medium text-neutral-500 leading-none">
                            Your Rank
                        </span>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="font-minion text-[40px] md:text-[60px] font-bold text-[#054d5a] leading-none">
                                #3
                            </span>
                            <div className="flex flex-col">
                                <span className="font-lato text-[11px] md:text-[15px] font-bold text-emerald-600 leading-tight">
                                    Γåæ 2
                                </span>
                                <span className="font-lato text-[9px] md:text-[13px] font-medium text-neutral-400 leading-none mt-0.5">
                                    since yesterday
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Total Participants */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-medium text-neutral-500 leading-none">
                            Total Participants
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-[#000000] mt-2.5 leading-none">
                            450
                        </span>
                    </div>

                    {/* Top Prize */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-medium text-neutral-500 leading-none">
                            Top Prize
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-[#000000] mt-2.5 leading-none">
                            $240
                        </span>
                    </div>

                    {/* Competition Ends */}
                    <div className="flex flex-col">
                        <span className="font-lato text-[12px] md:text-[18px] font-medium text-neutral-500 leading-none">
                            Competition Ends
                        </span>
                        <span className="font-lato text-[16px] md:text-[24px] font-bold text-neutral-800 mt-2.5 leading-none">
                            4d 6h 5m
                        </span>
                    </div>
                </div>
            </section>

            {/* AMBASSADOR RANKINGS TABLE */}
            <section className="bg-[#fbfbf9] border border-neutral-200/40 rounded-[12px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] w-full">
                <div className="overflow-x-auto no-scrollbar w-full">
                    <div className="min-w-[640px] md:min-w-[800px] flex flex-col gap-0.5">
                        {/* Table Header Row */}
                        <div className="grid grid-cols-[60px_1fr_100px_100px_120px] md:grid-cols-[100px_1fr_150px_150px_180px] gap-4 items-center pb-3 border-b border-neutral-200/60 font-sfpro text-[11px] md:text-[18px] font-bold text-[#402b23] uppercase tracking-widest">
                            <span>Rank</span>
                            <span>Name</span>
                            <span>Prompts</span>
                            <span>Invites</span>
                            <span>Total</span>
                        </div>

                        {/* List Items */}
                        {leaderboardData.map((item) => (
                            <div key={item.rank} className="grid grid-cols-[60px_1fr_100px_100px_120px] md:grid-cols-[100px_1fr_150px_150px_180px] gap-4 items-center py-4 border-b border-neutral-200/30 last:border-0 hover:bg-neutral-50/40 transition-colors duration-150">
                                {/* Rank cell */}
                                <div className="flex items-center pl-1">
                                    {item.rank === 1 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#caa138" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#dfb33e" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#e5c158" stroke="#caa138" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#dfb33e" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">1</text>
                                        </svg>
                                    )}
                                    {item.rank === 2 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#8d8d8d" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#a8a8a8" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#c0c0c0" stroke="#8d8d8d" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#a8a8a8" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">2</text>
                                        </svg>
                                    )}
                                    {item.rank === 3 && (
                                        <svg className="w-7 h-7 md:w-11 md:h-11 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 13.5V21L12 19.5L15 21V13.5" fill="#935b30" opacity="0.85" />
                                            <path d="M12 13.5V21L15 19.5L18 21V13.5" fill="#af6f3b" opacity="0.85" />
                                            <circle cx="12" cy="10" r="7" fill="#cd7f32" stroke="#935b30" strokeWidth="1.2" />
                                            <circle cx="12" cy="10" r="5.2" fill="#af6f3b" />
                                            <text x="12" y="13" fontFamily="var(--font-sans), sans-serif" fontSize="9" fontWeight="950" fill="white" textAnchor="middle">3</text>
                                        </svg>
                                    )}
                                    {item.rank > 3 && (
                                        <span className="font-sfpro text-[12px] md:text-[18px] font-bold text-neutral-500 pl-2">
                                            {item.rank}
                                        </span>
                                    )}
                                </div>

                                {/* Name & Avatar cell */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="relative w-7.5 h-7.5 rounded-full overflow-hidden border border-neutral-200/70 shadow-sm bg-neutral-100 flex items-center justify-center shrink-0">
                                        <Image
                                            src={item.avatar}
                                            alt={`${item.name} avatar`}
                                            fill
                                            sizes="30px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-lato text-[15px] md:text-[24px] font-medium text-[#000000] truncate">
                                            {item.name}
                                        </span>
                                        {item.sublabel && (
                                            <span className="font-lato text-[11px] md:text-[18px] font-medium text-neutral-400 truncate mt-0.5">
                                                {item.sublabel}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Prompts cell */}
                                <span className="font-lato text-[15px] md:text-[24px] font-medium text-[#000000]">
                                    {item.prompts !== null ? item.prompts : ''}
                                </span>

                                {/* Invites cell */}
                                <span className="font-lato text-[15px] md:text-[24px] font-medium text-[#000000]">
                                    {item.invites !== null ? item.invites : ''}
                                </span>

                                {/* Total cell & Rank Change indicator */}
                                <div className="flex items-center justify-between pr-4">
                                    <span className="font-lato text-[15px] md:text-[24px] font-medium text-[#000000]">
                                        {item.total.toLocaleString()}
                                    </span>
                                    
                                    {/* Rank Change Indicator */}
                                    <div className="flex items-center w-8 justify-end">
                                        {item.rankChange === 'up' && (
                                            <span className="font-lato text-[14px] md:text-[21px] font-medium text-[#4b9e57] flex items-center gap-0.5">
                                                <span>Γåæ</span>
                                                <span>{item.changeValue}</span>
                                            </span>
                                        )}
                                        {item.rankChange === 'down' && (
                                            <span className="font-lato text-[14px] md:text-[21px] font-medium text-[#dc443e] flex items-center gap-0.5">
                                                <span>Γåô</span>
                                                <span>{item.changeValue}</span>
                                            </span>
                                        )}
                                        {item.rankChange === 'none' && (
                                            <span className="font-lato text-[14px] md:text-[21px] font-medium text-neutral-400">
                                                ΓÇö
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer text */}
                <span className="font-minion text-[10px] md:text-[14px] text-neutral-400 mt-6 text-center block w-full">
                    you are ranked <span className="font-bold text-[#5576ee]">#10</span> on your campus
                </span>
            </section>
        </main>
    );
}
