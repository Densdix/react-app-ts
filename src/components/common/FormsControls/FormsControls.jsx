import React from "react";
import s from "./FormControls.module.css"

export const FormControl = ({input, meta, ...restProps}) => {
    //let {input, meta, ...restProps} = props
    //const CustomTag = typefield ? typefield : "input"
    // console.log({input, meta, ...restProps})
    return (
        <div>
            <div className={meta.visited && meta.error && s.error}><restProps.typefield {...input}{...restProps} /></div>
            {meta.visited && meta.error && <div><span className={s.errorText}>{meta.error}</span></div>}
        </div>
    )
}

// export const Textarea = ({input, meta, ...props}) => {
//     debugger
//     return (
//         <div>
//             <div className={meta.visited && meta.error && s.error}><textarea {...input}{...props} /></div>
//             {meta.visited && meta.error && <div><span className={s.errorText}>{meta.error}</span></div>}
//         </div>
//     )
// }
//
// export const Input = ({input, meta, ...props}) => {
//     return (
//         <div>
//             <div className={meta.visited && meta.error && s.error}><input {...input}{...props} /></div>
//             {meta.visited && meta.error && <div><span className={s.errorText}>{meta.error}</span></div>}
//         </div>
//     )
// }