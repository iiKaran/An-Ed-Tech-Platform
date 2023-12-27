import React, { useEffect, useState } from "react";
import { queriesAskedByMe } from "../services/operations/CourseApi";
import { useSelector } from "react-redux";

export default function QueriesAsked() {
  const { token } = useSelector((state) => state.auth);
  async function FetchQueries() {
    const response = await queriesAskedByMe({}, token);
    setQueries(response);
  }
  const [queries, setQueries] = useState(null);
  useEffect(() => {
    FetchQueries();
  }, []);
  return (
    <div className=" rounded-lg py-4 w-[80%] mx-auto  section1 mt-12 bg-richblack-800">
      {queries ? (
        <div className="relative  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-[100%] mx-auto  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b ">
              <tr className="mb-12">
                <th scope="col" className="px-6 py-3 text-bold">
                 Question
                </th>
                <th scope="col" className="px-6 py-3 text-bold">
                  Answer
                </th>
                <th scope="col" className="px-6 py-3 text-bold">
                  Responded BY
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
                      {query.answer ? query.answer : "Not Yet Answered"}
                    </td>
                    <td className="px-6 capitalize py-4 dark:text-richblack-25">
                      {query.answer?
                        `${query.askTo?.firstName + " " +query.askTo?.lastName}`
                        : "Not Respond"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // <table className="flex w-[80vw] flex-col items-start justify-items-start  gap-x-6">
        //   <thead className="border flex items-center justify-around gap-4 mb-6 mt-4 rounded-md font-bold py-3 w-full">
        //     <tr className="flex items-center justify-around gap-4 mb-6 mt-4 rounded-md font-bold py-3 w-full">
        //       <th>Question</th>
        //       <th>Answer</th>
        //       <th>Responded By</th>
        //     </tr>
        //   </thead>
        //   <tbody className=" w-full flex flex-col !items-start !justify-start">
        //     {queries.map((query, index) => {
        //       return (
        //         <tr
        //           key={index}
        //           className="flex items-center justify-around gap-4 w-full"
        //         >
        //           <td>{query.question}</td>
        //           <td className="text-left">{query.answer?query.answer:"Not Yet Answered"}</td>
        //           <td className="text-left">{query.respondBy?.name ?query.respondBy?.name:"Not Respond"}</td>
        //         </tr>
        //       );
        //     })}
        //   </tbody>
        // </table>
        <div className="text-white"> No Queries Asked Yet</div>
      )}
    </div>
  );
}
