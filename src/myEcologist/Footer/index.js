import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {Link} from "react-router-dom";

function Footer() {

    return (
        <div className='wd-footer w-100'>
                <div className="row">

                    <div className="col-md-3 mx-auto text-center">
                        <p>
                            <Link to="/about">About</Link>
                        </p>
                        <p>
                            <Link to="#!">Help</Link>
                        </p>
                        <p>
                            <Link to="#!">Terms of Use</Link>
                        </p>
                    </div>

                    <div className="col-md-3 mx-auto text-center">
                        <p>
                            <Link to="#!">Community</Link>
                        </p>
                        <p>
                            <Link to="#!">Guidelines</Link>
                        </p>
                        <p>
                            < Link to="#!">Privacy</Link></p>
                    </div>

                    <div className="col-md-3 mx-auto text-center">
                        <p>Boston, MA 02115</p>
                        <p>info@myecologist.com</p>
                        <p>+1 617 867 5309</p>
                    </div>

                    <div className="col mx-auto text-center">
                        <div className="d-flex justify-content-center">
                            <img src="Images/world.svg" height="80px" />
                        </div>
                    </div>
                </div>

            <div className="text-center p-2">
                © 2023 Copyright
            </div>
        </div>
    );

}

export default Footer;