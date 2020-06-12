import {withRouter} from 'next/router';
import Link from 'next/link';
import axios from 'axios';

/**
 * 接收路由中的query参数
 * 在 getInitialProps 中获取数据
 */

function Xiaojiejie(props) {
    return (
        <div>
            <div>小姐姐{props.router.query.name}</div>
            <div>{props.data}</div>
            <Link href="/"><a>返回首页</a></Link>
        </div>
    )
}

Xiaojiejie.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios('http://rap2.taobao.org:38080/app/mock/252798/XjjFuwu').then(
            (res) => {
                console.log('远程数据',res)
                resolve(res.data)
            }
        )
    })
    return await promise
}

export default withRouter(Xiaojiejie)