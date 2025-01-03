import MainAside from "@/components/aside/aside";


type SearchParamProps = {
    searchParams: Promise<{
        nav: string | undefined,
    }>
  };

export default async function MainPage({searchParams}:SearchParamProps){
    const { nav } = await searchParams;
    const navLink = nav || 'schedule';

    return (
        <MainAside nav={navLink}/>
    )
}