import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './error-box.scss';

export default function ErrorBox({children}:{children:React.ReactNode}){

    return(
        <div className='error-box'> 
            <FontAwesomeIcon icon={faExclamation} className='error-icon-wrapper' /> 
            {children}
        </div>
    )
}