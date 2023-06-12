'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'

const PromptCardList = ({ data, handleTagClick, handleProfile }) => {
    return <div className="mt-16 prompt_layout">
        {data.map((post) => <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
            handleProfile={handleProfile}
        />)}
    </div>
}


const Feed = () => {
    const router = useRouter()

    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [filterPosts, setFilterPosts] = useState([])

    const handleFilter = () => {
        const updatedData = posts.filter((post) => {
            let lowerSearch = searchText.toLowerCase()
            let lowerCaseTag = post.tag.toLowerCase()
            let lowerUserName = post.creator.username.toLowerCase()
            let lowerPrompt = post.prompt.toLowerCase()

            return lowerUserName.includes(lowerSearch) || lowerCaseTag.includes(lowerSearch) || lowerPrompt.includes(lowerSearch)
        })

        setFilterPosts(updatedData)
    }

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const handleTagClick = (e) => {
        setSearchText(e)
    }

    const handleProfile = (userId) => {
        router.push(`/user?id=${userId}`)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()

            setPosts(data)
            setFilterPosts(data)
        }
        fetchPosts()
    }, [])

    useEffect(() => {
        handleFilter()
    }, [searchText])
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer" />
            </form>
            <PromptCardList data={filterPosts} handleTagClick={handleTagClick} handleProfile={handleProfile} />

        </section>
    )
}

export default Feed
