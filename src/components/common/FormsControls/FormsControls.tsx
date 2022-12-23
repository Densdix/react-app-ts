import React from "react";
import s from "./FormControls.module.css"
import {WrappedFieldProps} from "redux-form/lib/Field";

type TagType = {
    typefield: keyof JSX.IntrinsicElements
}

export const FormControl: React.FC<WrappedFieldProps & TagType> = ({input, meta, ...restProps}) => {
    //let {input, meta, typefield, ...restProps} = props

   //const CustomTag = typefield ? typefield : "input"

    console.log("FormControl", {input, meta, ...restProps})
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