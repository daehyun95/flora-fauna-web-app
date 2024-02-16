import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import './DontMissOut.css';
import { Link } from "react-router-dom";

function DontMissOut() {

    return (
        <div className='wd-dont-miss-out d-flex p-4'>
            <div className='row w-100'>
                <div className='col-6'>
                    <h4>Don't Miss Out</h4>
                </div>

                <div className='col-6'>
                    <Link to={`/Signup`}><button className='btn btn-success join-now-btn float-end'>Join Now</button></Link>
                </div>
            </div>
        </div>
    );
}

export default DontMissOut;