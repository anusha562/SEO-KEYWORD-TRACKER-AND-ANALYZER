import React, {useState} from "react";
import Dropdown  from "react-dropdown";

const Dropdown_react = () => {
    const [value, setValue] = useState("");

    return (
        <div>
            <Dropdown
                options = {["Rabin-Karp", "KMP", "Suffix Tree", "Suffix Array", "Naive"]}
                value = {value}
                onChange={setValue}
                />
        </div>
    );

};

export default Dropdown_react