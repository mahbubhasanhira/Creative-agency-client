import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Common/Sidebar/Sidebar';
import './Order.css';
import OrderForm from './OrderForm/OrderForm';

const Order = () => {
    const {loggedInUser} = useContext(UserContext);

    return (
        <section>
           <div className="row">
            <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-10 pl-5">
                    <div className=' d-flex align-items-center justify-content-between mt-3 mb-3 pl-3 pr-3'>
                        <h3>Order</h3>
                        <div className=' d-flex align-items-center justify-content-between'>
                            <h5>{loggedInUser.name}</h5>
                            <img className='user_photo for_large_div' src={loggedInUser.photo} alt=""/>
                        </div>
                    </div>
                    <div  className='dashboard_right_container'>
                       <OrderForm/>
                    </div>
                </div>
           </div>
        </section>
    );
};

export default Order;