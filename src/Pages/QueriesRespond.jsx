import React,{useState,useEffect} from 'react'
import { useSelector } from "react-redux";

import { queriesAskedToMe } from '../services/operations/CourseApi';
import QueryRespondModal from './QueryRespondModal';
export default function QueriesRespond() {
  const { token } = useSelector((state) => state.auth);
  async function FetchQueries() {
    const response = await queriesAskedToMe({}, token);
    setQueries(response);
  }
  const [responseModalData, SetRespondModalData] = useState(null);

  const [queries, setQueries] = useState(null);
  useEffect(() => {
    FetchQueries();
  }, []);
  
  return (
    <div className=" rounded-lg py-4 w-[80%] mx-auto  section1 mt-12 bg-richblack-800">
      {queries?.length>0? (
        <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-[100%] mx-auto  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b ">
              <tr className="mb-12">
                <th scope="col" className="px-6 py-3 text-bold">
                 Question
                </th>
                <th scope="col" className="px-6 py-3 text-bold">
                  Asked By
                </th>
                <th scope="col" className="px-8 py-3 text-bold">
                  Action
                </th>
              
               
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => {
                return (
                  <tr className="  !border-b border-richblack-400 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 capitalize dark:text-richblack-25 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {query.question}
                    </th>
                    <td className="px-6 capitalize py-4 dark:text-richblack-25">
                      {`${query.askBy?.firstName+ " " + query.askBy?.lastName}`}
                    </td>
                    <td className="px-6 capitalize py-4 dark:text-richblack-25">
                      <button className='section px-3 py-2 text-md text-richblack-900 bg-yellow-25 rounded-md' onClick={()=>{
                         SetRespondModalData({
                          question:query.question,
                          heading:"Answer Form", 
                          actionBtn:"Submit",
                          id:query._id ,
                         }
                         )
                      }} >
                        Respond
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
          
        <div className="text-white"> No Queries Asked  by Students Yet</div>
      )}
      {responseModalData && <QueryRespondModal setModalData={SetRespondModalData} responseData ={responseModalData}/>}
    </div>
  )
}
