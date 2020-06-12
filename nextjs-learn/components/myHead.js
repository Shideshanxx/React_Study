import Head from 'next/head'

function Header(props) {
    return (
        <div>
            <Head>
                {props.children}
            </Head>
        </div>
    )
}

export default Header