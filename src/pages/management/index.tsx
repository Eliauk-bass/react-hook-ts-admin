import React, { useState, useEffect } from 'react';
import request from "../../utils/request";
import { Button } from 'antd';
import './index.scss';


const Management: React.FC = () => {

   // const [isDisable]=useState(true);
   useEffect(() => {
    request('/httpServer/manageData', {
      method: "get",
      param: {}
    }).then((res: any) => {
    }).catch((err: any) => {
    })
  });

  return (
    <div className="management">
      <Button type="primary">hahha</Button>
      <div className='all'>test</div>
    </div>
  );
}

export default Management;
