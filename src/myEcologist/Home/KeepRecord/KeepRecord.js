import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import './KeepRecord.css';
import { GiSeaTurtle, GiTreeBranch, GiCottonFlower} from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
function KeepRecord() {

    return (
        <div className='wd-keep-record d-flex'>
            <div className='row'>
                <div className='d-flex flex-column col-xs-12 col-sm-6 pt-4'>
                    <p className='icon-and-text'> <GiSeaTurtle /> Keep Record</p>
                    <p className='icon-and-text'> <BsGraphUp /> Contribute Value</p>
                    <p className='icon-and-text'> <GiTreeBranch /> Learn More About Ecology</p>
                    {/* <p className='icon-and-text'> <GiCottonFlower /> Create Useful Data</p> */}
                </div>
                <div className ='col-xs-12 col-sm-6'>
                <img className = "natureResponsive" src="Images/hemlock.svg" />
                </div>
            </div>
        </div>
    );
}

export default KeepRecord;