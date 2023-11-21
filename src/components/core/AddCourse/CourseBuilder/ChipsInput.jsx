import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';

export default function ChipsInput(props) {
  const { name, placeholder, register, label, errors, setValue } = props
  const [chips, setChips] = useState([]);
  const { course } = useSelector((state) => state.course)
  useEffect(() => {
    // on first time render  we have to register it 
    if (course?.tags) {
      setChips(name, course.tags);
    }
    else {
      register(name, { required: true, validate: (value) => value.length > 0 })
    }

  }, [])
  useEffect(() => {
    // when ever chip get changes
    setValue(name,chips);
  }, [chips])

  function handleKeyDown(event) {
    if (event.key === ",") {
      event.preventDefault();
      const newChip = event.target.value;
      if (newChip && !chips.includes(newChip)) {
        const updatedChips = [...chips, newChip]
        setChips(updatedChips);
        event.target.value = "";

      }
    }
  }
  function handleDeleteChip(index) {
    // event.preventDefault(); 
    const updated = [];
    for (let i = 0; i < chips.length; i++) {
      if (i !== index)
        updated.push(chips[i]);

    }
    setChips(updated);
  }
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the chips and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the chips array and render each chip */}
        {chips && chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              id={index}
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Render the input for adding new chips */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
