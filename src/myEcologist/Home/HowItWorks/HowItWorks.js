import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import './HowItWorks.css';


function HowItWorks() {

    return (
        <div className='wd-how-it-works'>
            <h4 className='text-center pt-3'>How It Works</h4>

            <div className='row'>
                <div className='d-flex col-4 text-center count' style={{backgroundImage:"url(/Images/1.svg"}}>
                    <p>Record your Observations</p>
                </div>

                <div className='d-flex col-4 text-center count' style={{backgroundImage:"url(/Images/2.svg"}}>
                    <p>Share with community</p>
                </div>

                <div className='d-flex col-4 text-center count' style={{backgroundImage:"url(/Images/3.svg"}}>
                    <p>Discuss</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;