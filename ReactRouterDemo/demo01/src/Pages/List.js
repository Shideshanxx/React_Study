import React, { Component } from 'react';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <h2>list-page->{this.state.id}</h2> );
    }
    componentDidMount() {
        let tempId = this.props.match.params.id
        this.setState({id:tempId})
    }
}
 
export default List;

/**
 * 在componentDidMount里面通过 this.props.match.params.id 获取到路由传递过来的id
 */