import { Clock2Icon, TagIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NepaliDateTime from './NepaliDate'
import NepaliTimeDisplay from './NepaliTime'
import Link from 'next/link'
import { categoryOptions } from '@/types/Post'

interface Author {
    firstName: string
    lastName: string
    avatar?: string
    clerkId: string
    username?: string
}

interface ImageData {
    url: string
    public_id: string
}

interface HeroPost {
    title: string
    excerpt: string
    category: string
    categoryId: string
    authors: Author[]
    readingTime: string
    heroBanner?: ImageData,
    createdAt?: string,
    updatedAt?: string
}

interface HeroProps {
    data: HeroPost | null
}

export const getNepaliCategory = (englishCategory: string) => {
    const foundCategory = categoryOptions.find(
        option => option.value === englishCategory.toLowerCase()
    );
    return foundCategory ? foundCategory.np : englishCategory;
};

function Hero({ data }: HeroProps) {
    const author = data?.authors?.[0]
    const username = author?.username
    const authorName = author ? `${author.firstName} ${author.lastName}` : 'अज्ञात लेखक'
    const authorAvatar = author?.avatar || ''
    const heroBannerUrl = data?.heroBanner?.url

    return (
        <>
            {/* Mobile Layout (stacked) */}
            <div className="md:hidden w-full flex flex-col">
                {heroBannerUrl ? (
                    <div className="relative w-full h-64">
                        <Image
                            src={heroBannerUrl}
                            alt={data?.title || 'Hero banner'}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>
                ) : (
                    <div className="w-full h-64 bg-gray-300" />
                )}

                <div className="bg-gray-50 w-full px-4 py-3 text-text-color font-jost flex flex-col items-start gap-2">
                    <Link href={`/${data!.category}/${data!.categoryId}`} className="text-xl font-bold leading-tight cursor-pointer hover:underline text-start">
                        {data!.title}
                    </Link>

                    <p className="text-base leading-relaxed line-clamp-2 text-start">
                        {data?.excerpt}
                    </p>

                    <div className="flex flex-wrap justify-start items-start gap-3 text-xs font-normal w-full">
                        <Link href={`/author/${username}`} className="flex items-start gap-1">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={authorAvatar} alt={authorName} />
                                <AvatarFallback>{authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            {authorName}
                        </Link>

                        <p className="flex items-center gap-1">
                            <Clock2Icon className="w-3 h-3" />
                            <NepaliTimeDisplay timeText={data!.readingTime!} />
                        </p>

                        <p className="flex items-center gap-1">
                            <TagIcon className="w-3 h-3" />
                            {getNepaliCategory(data!.category!)}
                        </p>
                    </div>

                    <div className="flex justify-center items-center gap-1 text-[#808080] font-roboto text-sm">
                        अपडेट गरिएको :
                        <NepaliDateTime updatedAt={data!.updatedAt!} />
                    </div>
                </div>
            </div>

            {/* Desktop Layout (original) */}
            <div className="hidden md:block relative w-full h-[85vh] overflow-hidden">
                {heroBannerUrl ? (
                    <Image
                        src={heroBannerUrl}
                        alt={data?.title || 'Hero banner'}
                        fill
                        className="object-cover w-full h-full"
                        priority
                        sizes="80vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300" />
                )}

                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center">
                    <div className="bg-white w-[90%] max-w-6xl mx-auto md:px-12 lg:mx-32 rounded-t-xl md:rounded-t-2xl py-3 md:py-4 xl:py-5 text-text-color text-center font-jost flex flex-col items-center gap-3">
                        <Link href={`/${data!.category}/${data!.categoryId}`} className="text-3xl font-bold leading-tight cursor-pointer hover:underline">
                            {data!.title}
                        </Link>

                        <p className="text-base leading-relaxed max-w-4xl line-clamp-2 px-2">
                            {data?.excerpt}
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-4 text-sm font-normal">
                            <Link href={`/author/${username}`} className="flex items-center gap-1">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={authorAvatar} alt={authorName} />
                                    <AvatarFallback>{authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {authorName}
                            </Link>

                            <p className="flex items-center gap-1">
                                <Clock2Icon className="w-4 h-4" />
                                <NepaliTimeDisplay timeText={data!.readingTime!} />
                            </p>

                            <p className="flex items-center gap-1">
                                <TagIcon className="w-4 h-4" />
                                {getNepaliCategory(data!.category!)}
                            </p>
                        </div>

                        <div className="flex justify-center items-center gap-1 text-[#808080] font-roboto text-sm">
                            अपडेट गरिएको :
                            <NepaliDateTime updatedAt={data!.updatedAt!} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero