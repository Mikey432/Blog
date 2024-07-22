import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs';
import InfiniteScroll from 'react-infinite-scroll-component';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.AllBlogs);
  const [count, setCount] = useState(2)
  const fetchData = async () => {
    let d = await fetch(`http://localhost:3000/api/blogs/?count=${count+1}`)
    setCount(count+1)
    let data = await d.json()
    setBlogs(data)
  }
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <InfiniteScroll
            dataLength={blogs.length} 
            next={fetchData}
            hasMore={props.allCount !== blogs.length}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {blogs.map((blogitems) => {
              return <div key={blogitems.slug}>
                <Link className={styles.blogh3} href={`/blogpost/${blogitems.slug}`}>
                  <h3 >{blogitems.title}</h3></Link>
                <p className={styles.blogp}>{blogitems.metadesc}...</p>
                <button className={styles.btn}>Read more</button>
              </div>
            })}
          </InfiniteScroll>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps(context) {
  let data = await fs.promises.readdir("blogdata");
  let allCount = data.length;
  let AllBlogs = [];
  let myfile;
  for (let index = 0; index < 3; index++) {
    const item = data[index];
    myfile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    AllBlogs.push(JSON.parse(myfile))
  }
  return {
    props: { AllBlogs, allCount } 
  }
}


export default Blog