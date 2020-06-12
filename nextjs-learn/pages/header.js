import MyHead from '../components/myHead';
import '../public/style/test.css';
import {Button} from 'antd';

/**
 * 自定义Head部分，更友好的SEO
 */

function Header() {
    return (
        <div>
            <MyHead>
                <title>shideshan.com</title>
            </MyHead>
            <div>shideshan.com</div>
            <Button>antd按钮</Button>
        </div>
    )
}

export default Header