import '@/styles/_global.scss';

type ParamsProps={
    params :Promise<{
        nav : string
        aside : string
    }>
}
export default async function MainScreen({params}:ParamsProps){
    const {nav, aside} = await params;
    return(
        <div>
        </div>
    )
}