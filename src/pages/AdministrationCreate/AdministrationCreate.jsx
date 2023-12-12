import React from 'react';
import CreateProduct from '../../components/CreateProduct/CreateProduct';
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';
import style from './AdministrationCreate.module.css';


import AdminListProducts from '../../components/AdminListProducts/AdminListProducts';


const AdministrationCreate = () => {
  return (
    <div className={style.container}>
      <SecondaryHeader />
      <CreateProduct />
      
      {/* <AdminListProducts /> */}

    </div>
  );
};

export default AdministrationCreate;
