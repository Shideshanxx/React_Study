import Link from 'next/link';
import Router from 'next/router';
import { useCallback } from 'react';

/**
 * 路由的6个钩子事件
 * 路由跳转与传参
 */

import Shideshan from '../components/shideshan';

function Home() {
  const gotoXiaojiejie = useCallback(() => {
    Router.push({
      pathname: '/xiaojiejie',
      query: {
        name: '苍井空'
      }
    })
  }, [])

  Router.events.on('routeChangeStart',(...args)=>{
    console.log('1.routeChangeStart->路由开始变化,参数为:',...args)
  })

  Router.events.on('routeChangeComplete',(...args)=>{
    console.log('2.routeChangeComplete->路由结束变化,参数为:',...args)
  })

  Router.events.on('beforeHistoryChange',(...args)=>{
    console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:',...args)
  })

  Router.events.on('routeChangeError',(...args)=>{
    console.log('4,routeChangeError->跳转发生错误,参数为:',...args)
  })

  Router.events.on('hashChangeStart',(...args)=>{
    console.log('5,hashChangeStart->hash跳转开始时执行,参数为:',...args)
  })

  Router.events.on('hashChangeComplete',(...args)=>{
    console.log('6,hashChangeComplete->hash跳转完成时,参数为:',...args)
  })

  return (
    <>
      <div>我是首页</div>
      <Shideshan>shideshan</Shideshan>
      <div>
        <Link href="/xiaojiejie?name=苍井空">
          <a>去找小姐姐</a>
        </Link>
      </div>
      <button onClick={gotoXiaojiejie}>去找小姐姐</button>
      <div>
         <Link href="#jspang"><a>选JSPang</a></Link>
      </div>
    </>
  )
}

export default Home;