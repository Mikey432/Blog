import React, { useState, useEffect } from 'react'
import styles from '../../styles/Blog.module.css'
import * as fs from 'fs';

const slug = (props) => {
  let [blog, setBlog] = useState(props.myblogs)
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <main className={styles.main}>
      <h1>{blog && blog.title}</h1><hr />
      {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
    </main>
  )
}

export async function getStaticPaths() {
  let blogdata = await fs.promises.readdir('blogdata');
  blogdata = blogdata.map((item) => {
    return {
      params: { slug: item.slice('.')[0] }
    }
  })
  return {
    paths: blogdata,
    fallback: true, // false or "blocking"
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  let myblogs = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8')
  return {
    props: { myblogs: JSON.parse(myblogs) }, // will be passed to the page component as props
  }
}

export default slug