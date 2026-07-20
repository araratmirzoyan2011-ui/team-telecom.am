import { db } from '../firebase.js';
import { Link } from 'react-router-dom';
import { header } from '../Components/header.jsx';
import { footer } from '../Components/footer.jsx';
import { share } from '../Components/Share.jsx';
import { text } from '../Components/paymanner-text.jsx';
function Paym() {
    return(
        <>
        {header()}
        {text()}
        <div className="w-[200px] h-[60px] ml-[10%] flex flex-row items-center justify-around text-[rgb(44,43,43)] mb-[60px]">
            {share()}
        </div>
        {footer()}
        </>
    )
}
export default Paym