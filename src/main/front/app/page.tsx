import Banner from '@/components/login/banner';
import LoginCopyRight from '@/components/login/copyright';
import Login from '@/components/login/login';
import '@/components/login/login.scss';
import '@/styles/_global.scss';

export default function HomePage(){
    return(
        <section className='login-wrapper'>
            <Banner/>
            <Login/>
            <LoginCopyRight/>
        </section>
    )
}