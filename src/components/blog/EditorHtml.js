import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

 export const EditorConvertToHTML = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const convertToHTML = () => {
        const contentState = editorState.getCurrentContent();
        const contentHTML = draftToHtml(convertToRaw(contentState));
        return contentHTML;
    };

    return (
        <div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            <textarea
                disabled
                value={convertToHTML()}
            />
        </div>
    );
}


