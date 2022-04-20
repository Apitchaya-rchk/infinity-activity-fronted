import React, { Component, useState, useEffect } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './TextEditor.css';
import { EditorState, convertToRaw, convertFromHTML, ContentState, } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftjsToHtml from 'draftjs-to-html';


export default function TextEditor(props) {
    const [focused, setFocused] = useState(false);

    const [editorState, setEditorState] = useState(() => {
        const blocksFromHTML = convertFromHTML(props.stateValue)
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        )
        return EditorState.createWithContent(contentState)
    }
    )

    const handleFocus = (params) => {
        setFocused(true);
    }
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };
    const handleOnChange = (params) => {
        props.setState(draftjsToHtml(convertToRaw(editorState.getCurrentContent())));
    }

    return (
        <div className=''>
            <label className="h-8 w-full ">
                How are your workouts?
            </label>
            <div className="  rounded-md border-2 border-gray-300 "
                onBlur={handleFocus}
                focused={focused.toString()}>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName "
                    onEditorStateChange={onEditorStateChange}
                    onChange={handleOnChange}
                />

            </div>
            {focused && !{ editorState } && <span className=" text-red-400 text-sm">{props.errMessage}</span>}
        </div>
    )
}
