import { FC } from "react";

const Layout: FC<{}> = ({ children }) => {
    console.log('layout');
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;