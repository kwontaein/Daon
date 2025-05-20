import { revalidatePath } from 'next/cache';
import './login.scss'

function Banner(){
    return(
        <section style={{ width:'400px'}}>
            <h1 style={{color:'#DB3D4E', fontSize:'32px', margin:'0'}}>
                Daon
            </h1>
            <h3 style={{margin:0}}>
                Management System
            </h3>
            <div>

            </div>
        </section>
    )   
}
export default Banner;