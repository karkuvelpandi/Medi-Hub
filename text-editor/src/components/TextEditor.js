import React, { Fragment, useEffect, useState } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isFocused, setIsFocused] = useState(false);

  // Fetch localStorage data
  const fetchLocalStorage = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      const contentState = convertFromRaw(JSON.parse(savedData));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  // Save handler
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const data = JSON.stringify(rawContentState);
    localStorage.setItem("data", data);
  };

  // Apply styles to each blocks
  const blockStyleFn = (contentBlock) => {
    // For more customized approach with extra information about the block we can go for data approach.
    // const textStyle = contentBlock.getData().get("text-style");
    // For current requirement This approach is suitable
    const textType = contentBlock.type;
    return textType ? `${textType}` : "";
  };

  // Check for symbols
  const handleChange = (state) => {
    const selection = state.getSelection();
    const contentState = state.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentText = currentBlock.getText();
    const symbolRules = ["# ", "* ", "** ", "*** "];
    let startSymbol;
    if (currentText.length < 5)
      for (const symbol of symbolRules) {
        if (currentText.startsWith(symbol)) {
          startSymbol = symbol;
          break;
        }
      }
    if (currentText.startsWith(startSymbol)) {
      const newContentState = convertHeadingBlock(
        currentBlock,
        contentState,
        startSymbol
      );
      // const newEditorState = EditorState.createWithContent(newContentState);
      // Instead of direct editorState creation here we are using forceSelection() function
      // to manage the cursor at the end of the block
      const newSelection = newContentState.getSelectionAfter();
      const newEditorState = EditorState.forceSelection(
        EditorState.createWithContent(newContentState),
        newSelection
      );
      setEditorState(newEditorState);
    } else {
      setEditorState(state);
    }
  };

  const convertHeadingBlock = (block, contentState, startSymbol) => {
    const blockKey = block.getKey();
    const newText = block.getText().substring(startSymbol.length); // Remove the special character
    let className;
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
    const newBlock = block.merge({
      text: newText,
      type: className,
      // data: block.getData().merge({ "text-style": className }), This is for more customized approach.
    });
    return contentState.merge({
      blockMap: contentState.getBlockMap().set(blockKey, newBlock),
    });
  };

  return (
    <Fragment>
      <nav className="navigation">
        <p>Demo editor by Karkuvel Pandi</p>
        <button onClick={handleSave}>Save</button>
      </nav>
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
