import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import FinanceTopNavBar from './FinanceTopNavBar'
import  "../../Styles/FinanceComponentStyles/mainFinance.css"
import PaymentsPage from './PaymentPage';
import ExpensesPage from './ExpensesPage';
import StaffFinance from './StaffFinance';
import InventoryPage from './InventoryPage';
import BankFinancePage from './BankFinancePage';
import FinanceStatementPage from './FinancialStatementPage';


const FinanceWorkPage = ()  => {
    return (
        <div>
            <switch>
            <Routes>
                <Route index element={<StaffFinance/>}/>
                <Route path="/payments" element={<PaymentsPage/>}/>  
                <Route path="/expenses" element={<ExpensesPage/>}/> 
                <Route path='/stafffinance' element={<StaffFinance/>}/>  
                <Route path='/inventoriesManagement' element={<InventoryPage/>}/> 
                <Route path='/Bankfinance' element={<BankFinancePage/>}/> 
                <Route path='/FinancialStatement' element={<FinanceStatementPage/>}/>    
            </Routes>
            </switch>
        </div>
    )

}


const FinancePage = ()  =>  {
        return (
            
            <div className='landingpage'>
                
                <div className='top-bar'>
                    <FinanceTopNavBar/>
                </div>

                <div className='workpage'>
                    <FinanceWorkPage/>
                    <Outlet/>           
                </div>

            </div>
        )    
}

export default FinancePage;