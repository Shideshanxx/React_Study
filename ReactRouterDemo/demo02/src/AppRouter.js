import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Index from './Pages/Index'
import Video from './Pages/Video'
import WorkPlace from './Pages/Workplace'
import './index.css'

function AppRouter() {
    // 模拟从后端获取的路由
    let routeConfig = [
        {
            path: '/',title:'博客首页',exact:true,component:Index
        },{
            path: '/video',title:'视频教程',exact:false,component:Video
        },{
            path: '/workplace',title:'职场技能',exact:false,component:WorkPlace
        }
    ]
    return (
        <Router>
            <div className="mainDiv">
                <div className="leftNav">
                    <h3>一级导航</h3>
                    <ul>
                        {
                            routeConfig.map((item,index)=>{
                                return (
                                    <li key={item.title+index}><Link to={item.path}>{item.title}</Link></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="rightMain">
                    {
                        routeConfig.map((item,index)=>{
                            return (
                                <Route key={item.path+index} path={item.path} exact={item.exact} component={item.component}></Route>
                            )
                        })
                    }
                </div>
            </div>
        </Router>
    )
}

export default AppRouter

/**
 * 1.嵌套路由
 * 2.动态路由
 * 3.switch
 */