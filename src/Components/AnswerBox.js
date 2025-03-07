

import React from 'react'

function AnswerBox(props) {
  return (
    <div class={`flex items-start ${props.sender? "justify-end" : "justify-start" } gap-2.5`}>
        {
            props.sender ? "" :  <img src={'/assets/logo_gt.png'} width={20}/>

        }
          <div class="flex flex-col gap-1 w-full max-w-[600px]">      
            <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
              <p class="text-sm font-normal text-gray-900 dark:text-white">{props.message}</p>
            </div>
          </div>
    </div>
  )
}

export default AnswerBox
