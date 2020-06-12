import App from 'next/app';
// 因为引入antd之后，配置了.babelrc文件使得可以按需引入antd的css样式和组件
// 但是这样一来，build时报错了，现在删掉了.babelrc的css按需引入，在_app.js中一次性引入所有的antd样式
import 'antd/dist/antd.css';

export default App;