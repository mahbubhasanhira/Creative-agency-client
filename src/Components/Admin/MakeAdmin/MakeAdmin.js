import React from 'react';
import Sidebar from '../../Common/Sidebar/Sidebar';
import MakeAdminForm from './MakeAdminForm';

const MakeAdmin = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-10 pl-5">
                    <div className=' d-flex align-items-center justify-content-between mt-3 mb-3 pl-3 pr-3'>
                        <h3>Make Admin</h3>
                        <h5>name</h5>
                    </div>
                    <div  className='dashboard_right_container'>
                        <MakeAdminForm/> 
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAdmin;