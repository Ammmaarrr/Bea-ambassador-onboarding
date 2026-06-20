"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface PostItem {
    id: string;
    title: string;
    body: string;
    author: string;
    time: string;
    avatar: string;
    likes: number;
    comments: number;
    liked: boolean;
}

export default function ForumPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeScopeTab, setActiveScopeTab] = useState<'campus' | 'market' | 'national'>('campus');
    const [posts, setPosts] = useState<PostItem[]>([
        {
            id: 'post-1',
            title: 'Title of message goes here.',
            body: 'Be kind and have fun.',
            author: 'Emily R.',
            time: '15m ago',
            avatar: '/images/ron-avatar-new.png',
            likes: 0,
            comments: 0,
            liked: false
        },
        {
            id: 'post-2',
            title: 'Title of message goes here.',
            body: 'Be kind and have fun.',
            author: 'Emily R.',
            time: '15m ago',
            avatar: '/images/ron-avatar-new.png',
            likes: 12,
            comments: 3,
            liked: false
        }
    ]);

    const handleLike = (id: string) => {
        setPosts(prev => prev.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                    liked: !post.liked
                };
            }
            return post;
        }));
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex-1 flex flex-col gap-6 md:gap-8">

            {/* HEADER */}
            <div className="space-y-1.5">
                <h1 className="text-[22px] md:text-[36px] font-canela font-medium tracking-tight text-neutral-900 leading-tight">
                    Forum
                </h1>
                <p className="text-[12px] md:text-[18px] font-sfpro font-medium text-neutral-500">
                    Get to know the community.
                </p>
            </div>

            {/* TABS SELECTOR (SEGMENTED CONTROL) & START POST BUTTON */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full mt-2">

                {/* Independent Tabs Control Row */}
                <div className="flex items-center gap-2 w-full sm:max-w-md md:max-w-lg">
                    <button
                        onClick={() => setActiveScopeTab('campus')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeScopeTab === 'campus'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        Campus
                    </button>
                    <button
                        onClick={() => setActiveScopeTab('market')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeScopeTab === 'market'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        Market
                    </button>
                    <button
                        onClick={() => setActiveScopeTab('national')}
                        className={`flex-1 text-center font-lato font-black text-[9px] md:text-[12px] uppercase tracking-wider py-2.5 rounded-[4px] transition-all duration-200 cursor-pointer shadow-sm ${activeScopeTab === 'national'
                            ? 'bg-[#584939] text-white border border-[#584939]'
                            : 'bg-white text-neutral-500 border border-neutral-200/80 hover:bg-neutral-50 hover:text-neutral-800'
                            }`}
                    >
                        National
                    </button>
                </div>

                {/* + Start post Button */}
                <button className="bg-black hover:bg-neutral-900 text-white font-lato text-[9px] md:text-[12px] font-bold py-2.5 px-14 rounded-[4px] flex items-center justify-center gap-1.5 shrink-0 select-none cursor-pointer transition-colors shadow-sm">
                    <span className="text-[12px] md:text-[16px] font-black -mt-0.5">+</span> Start post
                </button>
            </div>

            {/* PARTICIPANTS CARD */}
            <div className="bg-[#fcfbf8] border border-neutral-200/60 rounded-[8px] px-5 py-3 w-full max-w-[260px] md:max-w-[400px] flex flex-col justify-center relative hover:opacity-95 transition-opacity shadow-[0_2px_12px_rgba(0,0,0,0.01)] mt-2">
                <div className="flex items-center justify-between">
                    <span className="font-sfpro font-bold text-[12px] md:text-[18px] uppercase tracking-widest text-[#908343]">
                        Northeastern University
                    </span>
                    <svg className="w-3.5 h-3.5 text-[#908343]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <span className="font-sfpro text-[9px] md:text-[12px] font-semibold text-neutral-400 mt-1">
                    1273 participants
                </span>
            </div>

            {/* MAIN FORUM CONTAINER CARD */}
            <div className="bg-[#fcfbf8] border border-neutral-200/40 rounded-[12px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col gap-6 w-full">

                {/* SEARCH AND SORT ROW */}
                <div className="flex items-center gap-4 w-full justify-between">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-xl">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg className="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search posts"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#fcfbf8] border border-neutral-200/80 rounded-[4px] pl-10 pr-4 py-2.5 font-lato font-semibold text-[11px] md:text-[14px] text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 transition-all shadow-sm"
                        />
                    </div>

                    {/* Sort Selector */}
                    <div className="relative shrink-0">
                        <select className="appearance-none bg-[#fcfbf8] border border-neutral-200/80 rounded-[4px] pl-4 pr-9 py-2.5 font-lato font-bold text-[11px] md:text-[14px] text-neutral-700 focus:outline-none focus:border-neutral-400 transition-all cursor-pointer shadow-sm">
                            <option>Latest</option>
                            <option>Popular</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* PINNED SECTION */}
                <div className="space-y-3.5">
                    {/* Header */}
                    <div className="flex items-center gap-1.5 pl-1">
                        <svg className="w-3 h-3 text-[#86795f] fill-current" viewBox="0 0 24 24">
                            <path d="M16 12V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v8l-2 2v2h5.2v6l.8.8.8-.8v-6H18v-2l-2-2z" />
                        </svg>
                        <span className="font-sfpro text-[11px] md:text-[14px] font-bold tracking-[0.12em] text-[#86795f] uppercase">
                            Pinned
                        </span>
                    </div>

                    {/* Pinned Posts List */}
                    <div className="rounded-[10px] border border-neutral-300/40 p-2.5 divide-y divide-neutral-300/70">
                        {/* Pinned Item 1 */}
                        <div className="flex items-center gap-4 py-3.5 px-3">
                            <div className="w-7 h-7 rounded-full bg-[#efebe5] flex items-center justify-center shrink-0 shadow-sm border border-neutral-200/30">
                                <svg className="w-4 h-4 text-[#665746]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[12px] md:text-[18px] font-bold text-neutral-800 font-lato leading-none">
                                    Welcome to Northeastern Forum
                                </h4>
                                <p className="text-[11px] md:text-[14px] font-lato font-medium text-neutral-400 mt-1.5 leading-none">
                                    Be kind and have fun.
                                </p>
                            </div>
                        </div>

                        {/* Pinned Item 2 */}
                        <div className="flex items-center gap-4 py-3.5 px-3">
                            <div className="w-7 h-7 rounded-full bg-[#efebe5] flex items-center justify-center shrink-0 shadow-sm border border-neutral-200/30">
                                <svg className="w-4 h-4 text-[#665746]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[12px] md:text-[18px] font-bold text-neutral-800 font-lato leading-none">
                                    Welcome to Northeastern Forum
                                </h4>
                                <p className="text-[11px] md:text-[14px] font-lato font-medium text-neutral-400 mt-1.5 leading-none">
                                    Be kind and have fun.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RECENT POSTS SECTION */}
                <div className="space-y-4 pt-1">
                    {/* Header */}
                    <span className="font-sfpro text-[11px] md:text-[14px] font-bold tracking-[0.12em] text-neutral-500 uppercase pl-1 block">
                        Recent Posts
                    </span>

                    {/* Recent Posts List */}
                    <div className="rounded-[10px] border border-neutral-300/40 p-2.5 divide-y divide-neutral-300/70">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="flex items-center justify-between py-4 px-3 hover:bg-[#efebe5]/10 transition-all duration-150">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="relative w-7.5 h-7.5 rounded-full overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100 flex items-center justify-center shrink-0">
                                            <Image
                                                src={post.avatar}
                                                alt={`${post.author} avatar`}
                                                fill
                                                sizes="30px"
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Post Text */}
                                        <div>
                                            <h4 className="text-[12px] md:text-[18px] font-lato font-bold text-neutral-900 leading-tight">
                                                {post.title}
                                            </h4>
                                            <p className="text-[11px] md:text-[14px] font-lato font-medium text-neutral-500 mt-1 leading-none">
                                                {post.body}
                                            </p>
                                            <p className="text-[11px] md:text-[14px] font-lato font-semibold text-neutral-400 mt-2.5 leading-none">
                                                {post.author} &bull; <span className="opacity-90">{post.time}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Icons */}
                                    <div className="flex items-center gap-5 pr-2">
                                        {/* Comment Icon Button */}
                                        <div className="flex items-center gap-1.5 text-neutral-400 hover:text-neutral-600 transition-colors cursor-default select-none">
                                            {post.comments > 0 && (
                                                <span className="font-lato text-[12px] md:text-[18px] font-bold text-neutral-600 mt-0.5">
                                                    {post.comments}
                                                </span>
                                            )}
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.92 1.637 10.902 10.902 0 002.93-.983c.615-.17 1.247.1 1.755.378a8.889 8.889 0 004.376.983z" />
                                            </svg>
                                        </div>

                                        {/* Like Icon Button */}
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className="flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all cursor-pointer select-none"
                                        >
                                            {post.likes > 0 && (
                                                <span className={`font-lato text-[12px] md:text-[18px] font-bold mt-0.5 ${post.liked ? 'text-[#752a31]' : 'text-neutral-600'}`}>
                                                    {post.likes}
                                                </span>
                                            )}
                                            <svg
                                                className={`w-4 h-4 transition-colors ${post.liked ? 'fill-[#752a31] stroke-[#752a31]' : 'fill-none stroke-neutral-400'}`}
                                                strokeWidth={2.2}
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-[13px] md:text-[20px] text-neutral-400 font-semibold font-lato">
                                No posts match your search query.
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
