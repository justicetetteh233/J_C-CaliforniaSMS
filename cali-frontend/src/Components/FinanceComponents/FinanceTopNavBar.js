import React from "react";
import  {Link } from 'react-router-dom';
import  "../../Styles/FinanceComponentStyles/FinanceTopNavBar.css"


const  FinanceTopNavBar = () =>{




    return(
            <div  className="topbar">

                <div className="topbar-item-box">
                    <center><Link to="/dashboard/finance/payments "  style={{ color: 'white', textDecoration: 'none' }}><span >PAYMENTS</span></Link></center>
                </div>

                <div className="topbar-item-box" >
                <center><Link to="/dashboard/finance/expenses" style={{ color: 'white', textDecoration: 'none' }}><span>EXPENSES</span></Link></center>
                </div>


                <div   className="topbar-item-box" >
                <center><Link to="/dashboard/finance/stafffinance" style={{ color: 'white', textDecoration: 'none' }} ><span>STAFF FINANCE</span></Link></center>
                </div>


                <div className="topbar-item-box">
                <center><Link to="/dashboard/finance/inventoriesManagement" style={{ color: 'white', textDecoration: 'none' }}><span>INVENTORY</span></Link></center>
                </div>


                <div className="topbar-item-box"  >
                <center><Link to="/dashboard/finance/Bankfinance" style={{ color: 'white', textDecoration: 'none' }}><span>BANK FINANCE</span></Link></center>
                </div>

                <div  className="topbar-item-box">
                <center><Link to="/dashboard/finance/FinancialStatement" style={{ color: 'white', textDecoration: 'none' }}> <span>STATEMENTS</span></Link></center>
                </div>

            </div>
    )
}

export default FinanceTopNavBar;