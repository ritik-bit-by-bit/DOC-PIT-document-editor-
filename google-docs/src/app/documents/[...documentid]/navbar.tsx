"use client"
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
// import DocumentInput from './document-input';
import{BsFilePdf} from "react-icons/bs"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { MenubarSubContent, MenubarSubTrigger } from "@/components/ui/menubar";
import { BoldIcon, FileJson2Icon, FilePenIcon, FilePlusIcon, FilesIcon, FileTextIcon, GlobeIcon, ItalicIcon, Menu, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, Trash2Icon, Underline, Undo2Icon } from "lucide-react";
import useEditorStore from "@/store/use-editor-store";
const Navbar = () => {
    const {editor} = useEditorStore();
    const InsertTable = ({rows,cols}:{rows:number,cols:number})=>{
        editor?.chain().focus().insertTable({rows,cols,withHeaderRow:true}).run();
    }
    const onDownload = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    };

    const onSaveJSON = () => {
        if(!editor) return;
        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        onDownload(blob, `document.json`);
    };
    const onSaveHTML = () => {
        if(!editor) return;
        const content = editor.getHTML();
        const blob = new Blob([content], { type: "text/html" });
        onDownload(blob, `document.html`);
    };
   const onSaveText = () => {
        if(!editor) return;
        const content = editor.getText();
        const blob = new Blob([content], { type: "text/plain" });
        onDownload(blob, `document.txt`);
    };
    
  return (
    <nav className="flex items-center justify-between ">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image
            src="/doc-pit-logo.png"
            alt="logo"
            width={36}
            height={36}
            className="rounded-lg"
          />
        </Link>
        <div className="flex flex-col">
          DocumentInput
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FilesIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJson2Icon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={()=>window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                   <FilePlusIcon className="size-4 mr-2"/> 
                   New Document
                  </MenubarItem>
                  <MenubarSeparator/>
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2"/>
                        Rename
                  </MenubarItem>
                  <MenubarItem>
                    <Trash2Icon className="size-4 mr-2"/>
                        Remove
                  </MenubarItem>
                  <MenubarSeparator/>
                  <MenubarItem onClick={()=>window.print()}>
                    <PrinterIcon className="size-4 mr-2"/>
                     Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Undo2Icon className="size-4 mr-2"/>
                        Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={()=>editor?.chain().focus().undo().run()}>
                        <Redo2Icon className="size-4 mr-2"/>
                        Redo<MenubarShortcut onClick={()=>editor?.chain().focus().redo().run()}>Ctrl+Y</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            Table
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem onClick={()=>InsertTable({rows:1,cols:1})}>
                                1 x 1
                            </MenubarItem>
                            <MenubarItem onClick={()=>InsertTable({rows:2,cols:2})}>
                                2 x 2
                            </MenubarItem>
                            <MenubarItem onClick={()=>InsertTable({rows:3,cols:3})}>
                                3 x 3
                            </MenubarItem>
                            <MenubarItem onClick={()=>InsertTable({rows:4,cols:4})}>
                                4 x 4
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <TextIcon className="size-4 mr-2"/>
                            Text
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem onClick={()=>editor?.chain().focus().toggleBold().run()}>
                                <BoldIcon className="size-4 mr-2"/>
                                Bold <MenubarShortcut>Ctrl+B</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={()=>editor?.chain().focus().toggleItalic().run()}>
                                <ItalicIcon className="size-4 mr-2"/>
                                Italic <MenubarShortcut>Ctrl+I</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={()=>editor?.chain().focus().toggleUnderline().run()}>
                                <Underline className="size-4 mr-2"/>
                                Underline <MenubarShortcut>Ctrl+U</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem onClick={()=>editor?.chain().focus().toggleStrike().run()}>
                                <StrikethroughIcon className="size-4 mr-2"/>
                                Strikethrough <MenubarShortcut>Ctrl+S</MenubarShortcut>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarItem onClick={()=>editor?.chain().focus().unsetAllMarks().run()}>
                        <RemoveFormattingIcon className="size-4 mr-2"/>
                        Clear formatting
                    </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
