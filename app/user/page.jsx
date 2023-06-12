"use client"

import ProfileComponent from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {
    const searchParams = useSearchParams()
    const userId = searchParams.get('id')

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({ name: "" })

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`)
            const data = await response.json()
            console.log(data)
            setUser({ name: data[0]?.creator.username })
            setPosts(data)
        }
        if (userId) fetchPosts()
    }, [userId])

    return (
        <ProfileComponent
            name={user.name}
            desc={`Welcome to ${user.name} profile page`}
            data={posts}
            handleEdit={() => { }}
            handleDelete={() => { }}
        />
    )
}

export default UserProfile
