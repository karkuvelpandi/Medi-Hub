import React, { Fragment, useEffect, useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { FaRegSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

// Functional component for the TextEditor
export const TextEditor = () => {
  // State for managing the editor content and focus
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isFocused, setIsFocused] = useState(false);

  // Fetch data from localStorage and set the initial editor state
  const fetchLocalStorage = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      const contentState = convertFromRaw(JSON.parse(savedData));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  };

  // useEffect hook to run the fetchLocalStorage function on component mount
  useEffect(() => {
    fetchLocalStorage();
  }, []);

  // Save handler function to store the current editor content in localStorage
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const data = JSON.stringify(rawContentState);
    localStorage.setItem("data", data);
  };

  // Apply styles to each block using the block's type property
  const blockStyleFn = (contentBlock) => {
    const textType = contentBlock.type;
    return textType ? `${textType}` : "";
  };

  // Handle changes in the editor content
  const handleChange = (state) => {
    const selection = state.getSelection();
    const contentState = state.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const symbolRules = ["# ", "* ", "** ", "*** "];
    let startSymbol;

    // Check for symbols at the beginning of the current block's text
    if (currentText.length < 5) {
      for (const symbol of symbolRules) {
        if (currentText.startsWith(symbol)) {
          startSymbol = symbol;
          break;
        }
      }
    }

    // Apply heading block conversion if a symbol is detected
    if (currentText.startsWith(startSymbol)) {
      const newContentState = convertHeadingBlock(
        currentBlock,
        contentState,
        startSymbol
      );

      // Use forceSelection to manage the cursor at the end of the block
      const newSelection = newContentState.getSelectionAfter();
      const newEditorState = EditorState.forceSelection(
        EditorState.createWithContent(newContentState),
        newSelection
      );

      // Set the updated editor state
      setEditorState(newEditorState);
    } else {
      // Set the editor state without changes
      setEditorState(state);
    }
  };

  // Function to convert a heading block based on the detected symbol
  const convertHeadingBlock = (block, contentState, startSymbol) => {
    const blockKey = block.getKey();
    const newText = block.getText().substring(startSymbol.length);
    let className;

    // Map symbols to corresponding block types or classes
    switch (startSymbol) {
      case "# ":
        className = "heading";
        break;
      case "* ":
        className = "subHeading";
        break;
      case "** ":
        className = "redText";
        break;
      case "*** ":
        className = "underlineText";
        break;
      default:
        className = "";
        break;
    }

    // Merge the new block with updated text and type
    const newBlock = block.merge({
      text: newText,
      type: className,
    });

    // Merge the updated block into the content state
    return contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });
  };

  // Function to reset the editor state
  const resetEditor = () => {
    setEditorState(() => EditorState.createEmpty());
    localStorage.removeItem("data");
  };

  // JSX rendering of the TextEditor component
  return (
    <Fragment>
      {/* Navigation bar with buttons */}
      <nav className="navigation">
        <p>Demo editor by Karkuvel Pandi</p>
        {/* Save button with save icon */}
        <button onClick={handleSave}>
          <FaRegSave className="saveIcon" />
          Save
        </button>
        {/* Reset button with reset icon */}
        <button onClick={resetEditor}>
          <RxCross2 className="resetIcon" />
          Reset
        </button>
      </nav>
      {/* Editor container with Draft.js Editor component */}
      <div
        className={isFocused ? "editor active" : "editor"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Editor
          editorState={editorState}
          onChange={handleChange}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </Fragment>
  );
};
