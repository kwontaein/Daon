import MainAside from "@/components/aside/aside";
import { Fragment } from "react";


type SearchParamProps = {
    searchParams: Promise<{
        nav: string | undefined,
    }>
  };

export default async function MainPage({searchParams}:SearchParamProps){
    const { nav } = await searchParams;
    const navLink = nav || 'schedule';

    return (
        <section className={'flex-row'}>
            <MainAside nav={navLink}/>
        </section>
    )
}