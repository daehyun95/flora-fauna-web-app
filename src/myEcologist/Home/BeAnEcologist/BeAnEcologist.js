import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import './BeAnEcologist.css';

function BeAnEcologiist() {

    return (
        <div className='wd-be-an-ecologist d-flex'>

            <div className='row'>
                <div className='col-xs-12 col-sm-6'>
                    <img className="natureResponsive" src="Images/deer.svg" />
                </div>

                <div className='d-flex flex-column col-xs-12 col-sm-6 pt-4 ps-4'>
                    <h4>Be an Ecologist</h4>

                    <p>
                        Every observation contributes to biodiversity science, 
                        from the rarest lizard to the most common bird. 
                        Sharing your observations provides data to the scientific community. 
                        All you have to do is observe and record it.
                        Together, everyone can learn more about different species.

                    </p>
                </div>
            </div>



        </div>
    );
}

export default BeAnEcologiist;