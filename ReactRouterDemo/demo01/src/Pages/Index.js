import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[
                {cid:123,title:'石德山的个人博客-1'},
                {cid:456,title:'石德山的个人博客-2'},
                {cid:789,title:'石德山的个人博客-3'},

            ]
        }
        // 编程式重定向
        this.props.history.replace("/home/")
        // this.props.history.push("/home/")
    }
    render() { 
        return (
            <div>
                {/* <Redirect to="/home/" /> 标签式重定向  */}
                <h2>shideshan</h2>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                <li key={item+index}>
                                    <Link to={'/list/'+item.cid}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
 
export default Index;