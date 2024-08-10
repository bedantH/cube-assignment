/*
  A common layout component that will wrap around each page
  Usage:
    - Set page title
    - Authentication checks and other middleware actions
    - Defining a uniform layout to be used throughout the app  
*/

import root from "./layout.module.css";

const Layout: React.FC<{
  title?: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <>
      <header className={root.layout_header}>
        <h1 className={root.header__title}>{title}</h1>
      </header>
      <main>
        <title>{title && `${title} | `} Cube AI</title>
        {children}
      </main>
    </>
  );
};

export default Layout;
