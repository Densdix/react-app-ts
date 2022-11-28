import React from "react";
import {create} from "react-test-renderer"
import Status from "./Status";

describe("ProfileStatus component", () => {
    test("status from props", ()=> {
        const comp = create(<Status profileUserStatus="test" />)
        expect(comp.getInstance().state.tempText).toBe("test")
    })

    test("find <span>", ()=> {
        const comp = create(<Status profileUserStatus="test" />)
        const root = comp.root
        const span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("find <input>", ()=> {
        const comp = create(<Status profileUserStatus="test" />)
        const root = comp.root

        expect(()=>{
            const span = root.findByType("input")
        }).toThrow()
    })

})
