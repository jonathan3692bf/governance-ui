// import { useRef, useEffect, useState } from 'react'
// import { NewButton as Button } from '@components/Button'
import Text from '@components/Text'

// export function ImageUploader({
//   title,
//   description,
//   optional = false,
//   error = '',
//   defaultValue,
//   onSelect,
// }) {
//   const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer>(
//     defaultValue
//   )
//   const [validationError, setValidationError] = useState('')
//   const inputElement = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     if (defaultValue) {
//       setSelectedFile(defaultValue)
//     }
//   }, [defaultValue])

//   function triggerInput() {
//     inputElement?.current?.click()
//   }

//   function handleFileRead(file) {
//     setSelectedFile('')
//     setValidationError('')
//     const reader = new FileReader()
//     reader.onloadend = function () {
//       // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
//       // e.g replace(/^data:.+;base64,/, '');
//       if (reader.result instanceof ArrayBuffer) return

//       if (reader.result) {
//         const b64 = reader.result //.replace(/^data:.+;base64,/, '');
//         setSelectedFile(b64)
//         onSelect(b64)
//       }
//     }

//     if (file?.size <= 1000000) {
//       reader.readAsDataURL(file)
//     } else {
//       onSelect()
//       setValidationError('File size exceeds 1MB')
//     }
//   }

//   function handleChange(ev) {
//     setValidationError('')
//     const file = ev.target.files[0]
//     handleFileRead(file)
//   }

//   function handleDrag(ev) {
//     ev.stopPropagation()
//     ev.preventDefault()
//     // Style the drag-and-drop as a "copy file" operation.
//     ev.dataTransfer.dropEffect = 'copy'
//   }

//   function handleDrop(ev) {
//     ev.stopPropagation()
//     ev.preventDefault()
//     const fileList = ev.dataTransfer.files
//     handleFileRead(fileList[0])
//   }

//   return (
//     <div
//       className="flex flex-row flex-wrap items-center md:flex-row-reverse"
//       onDragOver={handleDrag}
//       onDrop={handleDrop}
//     >
//       <div className="flex flex-col grow md:ml-8">
//         <div className="flex items-baseline space-x-1 md:space-x-3">
//           <div className="text-lg md:text-xl">{title}</div>
//           {optional && <div className="opacity-60">(optional)</div>}
//         </div>
//         <div className="hidden pt-5 pb-4 text-base opacity-60 md:text-lg md:block">
//           {description}
//         </div>
//         {(!validationError || !error) && selectedFile && (
//           <div className="hidden md:block w-fit">
//             <Button withBorder type="button" onClick={triggerInput}>
//               <div className="px-2">Select new image</div>
//             </Button>
//           </div>
//         )}
//         <div
//           className={`${
//             validationError || error ? 'md:visibile' : 'hidden md:invisible'
//           } pt-2 pb-4 md:pb-0 text-base md:text-lg text-red min-h-[2rem]`}
//         >
//           {validationError || error}
//         </div>
//       </div>
//       <div className="w-full pb-4 md:w-fit md:pb-0">
//         {selectedFile && !validationError ? (
//           <div className="flex-col">
//             <div className="flex flex-col items-center w-[112px] h-[112px] md:w-[173px] md:h-[173px]">
//               <div className="w-[112px] h-[112px] md:w-36 md:h-36">
//                 {selectedFile instanceof ArrayBuffer ? (
//                   <div />
//                 ) : (
//                   <img src={selectedFile} />
//                 )}
//               </div>
//             </div>
//             {selectedFile && (
//               <div className="block pt-4 md:hidden w-fit">
//                 <Button withBorder type="button" onClick={triggerInput}>
//                   <div className="px-2">Select new image</div>
//                 </Button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Button type="button" withBorder onClick={triggerInput}>
//             <div className="flex flex-col px-6 py-4 md:px-12 md:py-10">
//               <img
//                 src="/1-Landing-v2/icon-arrow-blue.png"
//                 className="w-6 h-6 mx-2 -rotate-90"
//               />
//               <div>Add</div>
//             </div>
//           </Button>
//         )}
//         <input
//           type="file"
//           className="hidden"
//           ref={inputElement}
//           onChange={handleChange}
//           accept="image/png, image/jpeg"
//         />
//       </div>
//     </div>
//   )
// }

export default function FormField({
  title,
  description,
  optional = false,
  advancedOption = false,
  disabled = false,
  className = '',
  children,
}) {
  const splitTitle = title.split(' ')
  return (
    <div className={className}>
      <Text
        level="1"
        className={disabled ? 'opacity-30 cursor-not-allowed' : ''}
      >
        <span>
          {splitTitle
            .slice(0, splitTitle.length - (optional || advancedOption ? 1 : 0))
            .join(' ')}
        </span>
        {(optional || advancedOption) && (
          <Text level="1" as="span" className="whitespace-nowrap">
            {` ${splitTitle[splitTitle.length - 1]} `}
            {optional && (
              <Text level="2" as="span" className="ml-1 opacity-50">
                (optional)
              </Text>
            )}
            {advancedOption && (
              <Text
                level="2"
                as="span"
                className="px-2 ml-2 rounded bg-night-grey text-white/50"
              >
                Advanced Option
              </Text>
            )}
          </Text>
        )}
      </Text>

      <Text
        level="2"
        className={`pt-1 ${
          disabled ? 'opacity-10 cursor-not-allowed' : 'opacity-50'
        }`}
      >
        {description}
      </Text>
      <div className="mt-2">{children}</div>
    </div>
  )
}