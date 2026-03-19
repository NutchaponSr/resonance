const Page = async (props: PageProps<"/[databaseId]">) => {
  const { databaseId } = await props.params;

  return (
    <div className="mt-11">
      {databaseId}
    </div>
  );
}

export default Page;