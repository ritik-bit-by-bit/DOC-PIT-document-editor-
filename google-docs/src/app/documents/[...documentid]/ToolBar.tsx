"use client";
import React, { useState } from "react";
import {
  BoldIcon,
  ChevronDownIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import Underline from "@tiptap/extension-underline";
import {type ColorResult,SketchPicker} from 'react-color';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontSize } from "@tiptap/extension-text-style";
const TextColourButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").textColor|| "#000000";
  const onChange = (color:ColorResult)=>{
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">
            A
          </span>
          <div className="h-0.5 w-full" style={{backgroundColor:value}}></div>
        </button>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="pr-2.5 ">
        <SketchPicker color={value} onChange={onChange}/>
        </DropdownMenuContent>
        
    </DropdownMenu>
  );
}

const HeadingLevelButton=()=>{
  const {editor}=useEditorStore();
  const heading =[
    {label:"Normal text",value:0,fontSize:"16px"},
    {label:"Heading 1",value:1,fontSize:"24px"},
    {label:"Heading 2",value:2,fontSize:"20px"},
    {label:"Heading 3",value:3,fontSize:"18px"},
    {label:"Heading 5",value:5,fontSize:"14px"},
    {label:"Heading 6",value:6,fontSize:"12px"},
  ];
  const getCurrentHeading = ()=>{
    for(let level = 1 ; level <=5 ;level++){
      if(editor?.isActive(`heading`,{level})){
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
           { getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="p-1 flex flex-col gap-1">
      {heading.map(({label,value,fontSize})=>(
        <button
        key={value}
        style={{fontSize}}
        className={cn(
          "flex itmes-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
          (value===0 && !editor?.isActive("heading"))|| editor?.isActive("heading",{level:value}) && 'bg-neutral-200/80'
        )}
        onClick={()=>editor?.chain().focus().setHeading({level:value as any}).run()}
      >
  {label}
        </button>
      ))} </DropdownMenuContent>
    </DropdownMenu>
   )
};
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Verdana", value: "Verdana" },
    { label: "Georgia", value: "Georgia" },
    { label: "Garamond", value: "Garamond" },
    { label: "Courier New", value: "Courier New" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Impact", value: "Impact" },
    { label: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
    { label: "Lucida Sans", value: "Lucida Sans" },
    { label: "Lucida Console", value: "Lucida Console" },
    { label: "Lucida Sans Typewriter", value: "Lucida Sans Typewriter" },
    { label: "Lucida Serif", value: "Lucida Serif" },
    { label: "Lucida Bright", value: "Lucida Bright" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").FontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-1">
        {fonts.map(({ label, value }) => (
          <button
          onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            key={value}
            className={cn(
              "flex itmes-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").FontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string; // Change Label to label to match the prop name
}

const ToolbarButton = ({
  onClick,
  isActive = false, // Default to false if undefined
  icon: Icon,
  label, // Rename this to match the prop name
}: ToolbarButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
          isActive && "bg-neutral-200/80"
        )}
      >
        <Icon className="size-4" />

        <span
          className={`absolute top-[-25px] text-sm text-gray-700 transition-opacity duration-500 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

const ToolBar = () => {
  const { editor } = useEditorStore();
  console.log("ToolBar editor :", { editor });
  const sections: {
    label: string;
    Icon: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        Icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        Icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        Icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        Icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "true" ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        Icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        Icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        Icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        Icon: MessageSquarePlusIcon,
        onClick: () => console.log("Comment"),
        isActive: false,
      },
      {
        label: "List Todo",
        Icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        Icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="bg-[#d5dae0] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-2 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      {/* <Separator orientation="vertical" /> */}|
      <FontFamilyButton />
      {/* <Separator orientation="vertical" /> */}|
      <HeadingLevelButton/>
      {/* <Separator orientation="vertical" /> */}|
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      <TextColourButton/>
      {/* TODO Font Family*/}|
      {sections[2].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      {/* TODO Heading*/}|{/* TODO Font Size*/}|
    </div>
  );
};

export default ToolBar;
