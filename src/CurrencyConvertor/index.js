import React, { useEffect, useState } from "react";
import {Card} from "antd";
import axios from "axios";

const Convertor=()=>{

const [initialState,setState]=useState({
    currency:["USD","SGD","PHP","EUR","INR"],
    base:"USD",
    amount:"",
    convertTo:"INR",
    result:"",
    date:"",
})
const apiKey = process.env.ae697dc691d85972e4351bf3

const {currency,base,amount,convertTo,result,date}=initialState

useEffect(()=>{
  if(amount == isNaN){
    return;
  }else{
    const getCurrencyConvertor=async ()=>{
      const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`,{
        params: {
          key: apiKey,
          // other parameters if needed
        }
      })
      console.log("response:"+response)
      const date=response.data.date
      const result=(response.data.rates[convertTo]*amount).toFixed(3);
      setState({
        ...initialState,
        result,date
      })
    }
    getCurrencyConvertor()
  }
},[])
const onChangeInput=(e)=>{
  setState({
    ...initialState,
    amount:e.target.value,
    result:null,
    date:null,
  })
}

const handleSelect=(e)=>{
  setState({
    ...initialState,
    [e.target.name]:e.target.value,
    result:null
  })
}
const handleSwap=(e)=>{
  e.prevetDefault();
  setState({
    ...initialState,
    convertTo:base,
    base:convertTo,
    result:null

  })
}



// useEffect(()=>{
//   const fetchData = async ()=>{
//     try{
//     const response =await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}`)
//     }
//     catch{

//     }
//   }
// })

    return (
        <div className=" flex justify-center items-center h-screen">
          <div className="border border-[#DCDCDC] border-[20px] ">
          <Card 
          title="CURRENCY CONVERTOR"
          bordered={false}
          style={{width:550}}>
            <h5>{amount} {base} is equivalent to {" "}</h5>
           <h3>
            {amount===""
            ?"0"
        :result ===null
        ?"Calculating..."
    :result}
    {convertTo}
            </h3> 
            <p>As of {amount ===""?"":date=== null? "":date}</p>
            <div >
               <div className="">
                    <form >
                        <input type="number" value={amount} onChange={onChangeInput} className="border border-black " placeholder="Enter currency"/>
                        <select name="base"
                        value={base}
                        onChange={handleSelect}
                        className="">
                          {currency.map((currency)=>(
                            // console.log(currency),
                            <option key={currency} value={currency}>{currency}</option>
                          ))}   
                          
                        </select>
                    </form>
                    <div>
                <h1
                onClick={handleSwap}
                style={{cursor:"pointer"}}>
                    &#8595;&#8593;</h1>
               </div>
                    <form className="">
                        <input
                        disabled={true}
                        value={
                            amount===""
                            ?"0"
                            :result ===null
                            ?"calculating..."
                            :result
                        }
                        />
                         <select name="convertTo"
                         value={convertTo}
                        onChange={handleSelect}
                        className="">
                          {currency.map((currency)=>(
                            // console.log(currency),
                            <option key={currency} value={currency}>{currency}</option>
                          ))}   
                          
                        </select>
                    </form>
               </div>
              
            </div>

          </Card>
          </div>
        </div>
    )
}
export default Convertor;