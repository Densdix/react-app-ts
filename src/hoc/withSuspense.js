import Preloader from "../components/common/Preloader/Preloader";
import React, {Suspense} from "react";


const withSuspense = (WrappedComponent) => {
        return <Suspense fallback={<Preloader/>}>
            <WrappedComponent/>
        </Suspense>

}

export default withSuspense