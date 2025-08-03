'use client'
import React, { ReactNode } from 'react'
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageResize from 'tiptap-extension-resize-image'
import Image from '@tiptap/extension-image'
import {TableKit} from '@tiptap/extension-table' 
import { BulletList, TaskItem, TaskList } from '@tiptap/extension-list'
import CodeBlock from '@tiptap/extension-code-block'
import useEditorStore from '@/store/use-editor-store'
import Underline from '@tiptap/extension-underline'
import { TextStyle, FontFamily } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'
const Editor = () => {
  const {setEditor} = useEditorStore();
  const editor = useEditor({
      onCreate({editor}){
        setEditor(editor);
      },
      onDestroy(){
        setEditor(null);
      },
      onUpdate({editor}){
        setEditor(editor);
      },
      onSelectionUpdate({editor}){
        setEditor(editor);
      },
      onTransaction({editor}){
        setEditor(editor);
      },
      onFocus({editor}){
        setEditor(editor);
      },
      onBlur({editor}){
        setEditor(editor);
      },
      onContentError({editor}) {
          setEditor(editor);
      },
        editorProps:{
            attributes:{
                style:"padding-left:56px , padding-right:56px",
                class:"focus:outline-none border print:border-0 bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },
        extensions: [StarterKit,BulletList,TaskList,CodeBlock,TableKit,Image as any,ImageResize,Underline,TextStyle,FontFamily,Color,
          LineHeightExtension.configure({
            types:['heading','paragraph'],
            defaultLineHeight:"normal"
          }),
          FontSizeExtension,Highlight.configure({
        multicolor: true,
        }),
          TaskItem.configure({
            nested: true,
          }),Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
          }),TextAlign],
        content: '<p>Hello World! 🌎️</p>',

        immediatelyRender: false,
      })
  return (
    <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
      {/* {<EditorWithRuler/>} */}
        <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
        <EditorContent editor={editor}/>
        </div>
        
    </div>
  )
}

export default Editor;
 