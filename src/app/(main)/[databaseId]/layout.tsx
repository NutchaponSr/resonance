import { Header } from "@/modules/databases/ui/components/header";

import { Main } from "../main";

const Layout = async (props: LayoutProps<"/[databaseId]">) => {
  const { databaseId } = await props.params;

  return (
    <>
      <Header databaseId={databaseId} />
      <Main>
        {props.children}
      </Main>
    </>
  );
}

export default Layout;