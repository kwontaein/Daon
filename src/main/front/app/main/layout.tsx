import { Fragment } from "react";
import MainHeader from "@/components/main-layout/header";
import Navigation from "@/components/main-layout/navigation";
import MainAside from "@/components/aside/aside";

import '@/styles/_global.scss';

export default function MainLayout({children}){
    return(
        <Fragment>
            <Navigation/>
            {children}
        </Fragment>
    )
}