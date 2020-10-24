import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideSideBar } from "../actions/sideBarActions";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref) {
    const dispatch = useDispatch();

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                dispatch(hideSideBar());
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    if(!props.isActive){
        return <div>{props.children}</div>
    }
    return <div ref={wrapperRef}>{props.children}</div>;
}