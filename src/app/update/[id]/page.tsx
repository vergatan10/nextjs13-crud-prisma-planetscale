"use client"
import { useRouter } from 'next/navigation'
import React,{ useEffect, useState } from 'react'

const Page = ({params}: {params: {id: string}}) => {
    const id = params.id
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()

    const handleSubmit = async(e:any) => {
        e.preventDefault()

        await fetch('/api/post/',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            id
          })
        }).then((res) => {
          // console.log(res)
        }).catch((err) => {
          console.error(err)
        }) 

        router.push('/')
    }

    useEffect(()=> {
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async() => {
      const res = await fetch('/api/post/'+id)
      const json = await res.json()
      if(!json){
        router.push('/404')
        return;
      }
      setTitle(json.post.title)
      setContent(json.post.content)
    }

  return (
    <form onSubmit={handleSubmit} className='w-[500px] mx-auto mt-20 flex flex-col gap-2'>
      <input type='text' value={title} className='border w-full p-2 rounded-md' placeholder='Masukkan Judul...' onChange={(e) => setTitle(e.target.value)} />
      <input type='text' value={content} className='border w-full p-2 rounded-md' placeholder='Masukkan Konten...' onChange={(e) => setContent(e.target.value)} />
        <button>Update</button>
    </form>
  )
}

export default Page
