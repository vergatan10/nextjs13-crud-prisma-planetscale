import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Item from "./item";

const prisma = new PrismaClient()

const getPosts = async() => {
  const res = await fetch(process.env.BASE_URL+'/api/post',{next:{revalidate:0}})
  const json = await res.json()
  return json
}


const Home = async() => {
  const posts = await getPosts()

  return (
    <>
    <div className="w-[1000px] mx-auto p-20 ">
      <Link href="/create" className="px-3 py-2 bg-zinc-900 hover:bg-black rounded-md text-white">Create</Link>
      <div className=" flex flex-col mt-8 gap-4">
      {posts?.posts?.map((post:any, index:number) => (
        <Item key={index} post={post}/>
      ))}
      </div>
    </div>
    </>
  )
}
export default Home