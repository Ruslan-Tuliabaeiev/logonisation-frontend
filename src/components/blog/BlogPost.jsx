import React, {useState, useMemo, Fragment} from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import "./BlogPost.css";
import {Form, Label} from "reactstrap";

export const BlogPost = () => {
    const [content, setContent] = useState('');
    const [titleData, setTitleData] = useState( '');
    const [articleData, setArticleData] = useState({ article: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    const handleTitleChange = (e) => {
        setTitleData(e.target.value);
    };
    const postData = () => {
        axios
            .post('http://localhost:5000/article', articleData)
            .then((response) => {
                console.log('Successfully posted article:', response.data);
                setContent('');
                setArticleData({ article: '' });
                setTitleData( '');
            })
            .catch((error) => {
                console.error('Post article error:', error);
            });
    };

    const onContentChange = useMemo(() => {
        return (event, editor) => {
            const newContent = editor.getData();
            setContent(newContent);
            setArticleData({ article: newContent.slice(3, -4)});
            // setArticleData({title: titleData})

        };
    }, []);

    console.log(titleData)
    return (
        <Fragment>
            <Form className="blog-form">
                <h3 className='blog-form-title'>Post Edit</h3>
                <div>
                    <Label for="validation" >Title:
                    <input className="blog-control" id="validation" type="text" value={titleData} onChange={handleTitleChange}/>
                    </Label>
                </div>
                    <div className="editor-form">
                        <h2>Editor 5</h2>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onReady={editor => {
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={onContentChange}
                        />
                        <button className='blog-button' onClick={handleSubmit}>Post Article</button>
                </div>
            </Form>
        </Fragment>

    );
}
