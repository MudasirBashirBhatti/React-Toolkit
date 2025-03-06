"use client";
import React, { useState } from "react";
import styles from "@/app/Components/(liteComponents)/Dropdown/Dropdown.module.css";
import { FaChevronDown } from "react-icons/fa6";

// TypeScript Types for Props
type DropdownProps = {
    optionsArr: string[]; // Expecting an array of strings for options
    placeHolder: string; // Placeholder text for the dropdown
    initialActiveVal?: string;
    fieldName: string;
    label: string;
    onChange: (fieldName: string, value: string) => void; // Function that handles value change
    className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
    label,
    optionsArr,
    fieldName,
    initialActiveVal,
    placeHolder,
    onChange,
    className,
}) => {
    const [isActive, setIsActive] = useState(false); // Dropdown active state
    const [selected, setSelected] = useState<string>(placeHolder); // Selected value, default to placeholder

    // Function that handles selection
    const onSelect = (value: string) => {
        setSelected(value);
        // const updatedName = fieldName.split(" ").join(""); // Remove spaces in field name
        onChange(fieldName, value); // Call the onChange function passed as prop
    };

    return (
        <div className={`${styles.outerContainer} ${className}`}>
            <label htmlFor="">{label || "label"}</label>

            <div
                className={styles.parent}
                onClick={() => setIsActive((prev) => !prev)}
                style={{
                    borderColor: isActive
                        ? "var(--homeIconText)"
                        : "var(--homeIconText)",
                }}
            >
                <div
                    style={{ opacity: placeHolder !== selected ? "1" : "0.3" }}
                    className={styles.selected}
                >
                    {initialActiveVal || selected}
                </div>
                <FaChevronDown
                    style={{
                        transform: `rotate(${isActive ? "180deg" : "0deg"})`,
                        color: isActive
                            ? "var(--homeIconText)"
                            : "var(--homeIconText)",
                    }}
                    className={styles.chevron}
                />

                <ul
                    className={styles.options}
                    style={{
                        maxHeight: isActive ? "150px" : "0px",
                        opacity: isActive ? "1" : "0",
                    }}
                >
                    <li style={{ opacity: "0.5" }}>--- {placeHolder} ---</li>
                    {optionsArr.map((e, index) => (
                        <li key={index} onClick={() => onSelect(e)}>
                            {e}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
