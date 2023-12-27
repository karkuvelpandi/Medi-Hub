import React, { Fragment, useEffect } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";

export function TextEditor() {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const fetchLocalStorage = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      const contentState = convertFromRaw(JSON.parse(savedData));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      console.log("Retrieved and replaced successfully!");
    }
  };

  useEffect(() => {
    fetchLocalStorage();
  }, []);

  // Save handler
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const styledContentState = applyBlockStyle(contentState);
    const rawContentState = convertToRaw(styledContentState);
    const data = JSON.stringify(rawContentState);
    localStorage.setItem("data", data);
    fetchLocalStorage();
    // console.log("Save");
  };

  // Apply styles to each blocks
  const blockStyleFn = async (contentBlock) => {
    const contentState = editorState.getCurrentContent();
    const styledContentState = await applyBlockStyle(contentState);
    console.log(styledContentState);
    console.log(contentBlock);
    const textStyle = contentBlock.getData().get("text-style");
    return textStyle ? `heading ${textStyle}` : "";
  };

  // Test
  const applyBlockStyle = (contentState) => {
    const blockMap = contentState.getBlockMap();
    let newContentState = contentState;

    blockMap.forEach((contentBlock) => {
      const text = contentBlock.getText();
      if (text.startsWith("# ")) {
        const blockKey = contentBlock.getKey();
        const newText = text.substring(2); // Remove the special character
        const newBlock = contentBlock.merge({
          text: newText,
          data: contentBlock.getData().merge({ "text-style": "heading" }),
        });
        newContentState = newContentState.merge({
          blockMap: blockMap.set(blockKey, newBlock),
        });
      }
    });

    return newContentState;
  };

  //Apply styles onChange
  // const handleChange = () => {
  //   const contentState = editorState.getCurrentContent();
  //   const styledContentState = applyBlockStyle(contentState);
  //   console.log("Onchange");
  //   // Create a new EditorState with the modified content
  //   const newEditorState = EditorState.createWithContent(styledContentState);
  //   setEditorState(newEditorState);
  // };

  //
  // const handleKeyCommand = (command) => {
  //   if (command === "split-block") {
  //     const newEditorState = EditorState.set(editorState, {
  //       currentContent: applyBlockStyle(editorState.getCurrentContent()),
  //     });
  //     setEditorState(newEditorState);
  //     return "handled";
  //   }
  //   return "not-handled";
  // };

  // const keyBindingFn = (e) => {
  //   if (e.key === "Enter") {
  //     return "split-block";
  //   }
  //   return getDefaultKeyBinding(e);
  // };

  return (
    <Fragment>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={blockStyleFn}
        // handleKeyCommand={handleKeyCommand}
        // keyBindingFn={keyBindingFn}
      />
      <button onClick={handleSave}>Save</button>
    </Fragment>
  );
}
