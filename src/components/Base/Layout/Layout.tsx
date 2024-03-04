import Nav from "../Nav/Nav";

type Props = {
    children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default Layout;