import Preloader from "../components/common/Preloader/Preloader";
import React, {Suspense} from "react";

const withSuspense = (Component) => {
    return (
        <Suspense fallback={<Preloader/>}><Component/></Suspense>
    )
}

export default withSuspense