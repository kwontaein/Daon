import { Fragment } from "react";

import '@/styles/_global.scss';
import MainHeader from "@/components/nav/header";
import Navigation from "@/components/nav/navigation";
import MobileNavBar from "@/components/nav/mobile/mobile-nav-bar";

export default function MainLayout({main, nav, aside}){

    return(
        <Fragment>
            <header>
                <MainHeader/>
            </header>
            <nav>{nav}</nav>
            <main className={'flex-row'}>
                <aside>{aside}</aside>
                <section>{main}</section>
            </main>               
        </Fragment>
    )
}