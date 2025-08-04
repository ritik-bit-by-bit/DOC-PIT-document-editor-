"use client";
import React, { useState,useEffect } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CaseLowerIcon,
  ChevronDownIcon,
  CodeIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  ListCollapseIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
  WholeWordIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import useEditorStore from "@/store/use-editor-store";
import {type ColorResult,SketchPicker,CirclePicker} from 'react-color';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
const SeparaterIcon =()=>{
  return(
    <div className="text-gray-400">
      |
    </div>
  )
}
const CountCharacters: React.FC = () => {
  const { editor } = useEditorStore() // Assuming editor is stored in a store

  const [characterCount, setCharacterCount] = useState(0)
  const [wordCount, setWordCount] = useState(0)

  useEffect(() => {
    if (editor) {
      const updateCounts = () => {
        const characters = editor.storage.characterCount.characters()
        const words = editor.storage.characterCount.words()
        setCharacterCount(characters)
        setWordCount(words)
      }

      updateCounts() // Update counts initially

      // Add an event listener for updates to the editor content
      editor.on('update', updateCounts)

      // Cleanup listener on unmount
      return () => {
        editor.off('update', updateCounts)
      }
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-row items-center gap-x-3">
      <CaseLowerIcon className="size-5"/>
      <div className="size-4 mb-2">{characterCount}</div>
      <WholeWordIcon className="size-5"/>
      <div className="size-4 mb-2">{wordCount}</div>
    </div>
  )
}

const CodeBlockButton = () => {
  const { editor } = useEditorStore();

  const languages = [
    { label: "Press Ctrl+Enter to exit", value: "" },
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "HTML", value: "html" },
    { label: "CSS", value: "css" },
    { label: "Java", value: "java" },
    {label:"C++",value:"cpp"},
    {label:"C#",value:"csharp"},
    {label:"PHP",value:"php"},
    {label:"Ruby",value:"ruby"},
    {label:"Swift",value:"swift"},
    {label:"Go",value:"go"},
    // Add more languages as needed
  ];

  const insertCodeBlock = (language: string) => {
    console.log("Inserting code block with language:", language);

    // Ensure editor exists and then insert a code block with the selected language
    editor?.chain().focus().toggleCodeBlock({language}).run(); // Fixed here
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Code className="size-4" />
        </button> */}
        <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive('codeBlock') ? 'is-active' : ''}
          >
            <CodeIcon className="size-4" />
          </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {languages.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => insertCodeBlock(value)}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const LineHeightButton = () => {
  const { editor } = useEditorStore();
  const LineHeights=[{
    label:"Default",
    value:"normal"
  },
{
  label:"Singel",
  value:"1"
},{
  label:"1.15",
  value:"1.15"
},{
  label:"1.5",
  value:"1.5"
},{
  label:"Double",
  value:"2"
}]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ListCollapseIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
       {LineHeights.map(({label,value})=>(
        <button key={value}
          onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
          className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",editor?.getAttributes("paragraph").lineHeight ===value  &&"bg-neutral-200/80")}>
         <span className="text-sm">
          {label}
         </span>
        </button>
       ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontSizeButton=()=>{
  const {editor}= useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize?editor?.getAttributes("textStyle").fontSize.replace("px",""):"16";
  const [fontSize,setFontSize]=useState(currentFontSize);
  const[inputValue,setInputValue]=useState(fontSize);;
  const[isEditing,setIsEditing]=useState(false);
  
   
  const updateFontSize =(newSize:string)=>{
    const size = parseInt(newSize);
    if(!isNaN(size) && size >0){ // Check the available commands
       editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);  // Update inputValue state
  };
  
  const handleInputBlur = ()=>{
    updateFontSize(inputValue);
  }
  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  }
  
  const increment = ()=>{
    const newSize=parseInt(fontSize)+1;
    updateFontSize(newSize.toString());
  }
  const decrement = ()=>{
    const newSize = parseInt(fontSize)-1;
    if(newSize>0)
    {updateFontSize(newSize.toString())}
  }
  return(
  <div className="flex flex-row item-center gap-x-0.5">
    <button onClick={decrement} className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ">
    <MinusIcon className="size-4"/>
    </button>
    {
      isEditing?(
        <input type="text" value={inputValue} onChange={handleInputChange} onBlur={handleInputBlur} onKeyDown={handleKeyDown}
        className="h-7 w-10 text-sm text-center border-neutral-400  rounded-sm bg-transparent focus:outline-none focus:ring-0"/>
      ):(
        <button onClick={()=>{setIsEditing(true)
          setInputValue(currentFontSize)
          }
        }
         className="h-7 w-10 text-sm text-center border-neutral-400  rounded-sm hover:bg-neutral-200/80">
          {currentFontSize}
        </button>
      )}
       <button onClick={increment} className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 ">
    <PlusIcon className="size-4"/>
    </button>
  </div>
  )
}

const AlignButton = () => {
  const { editor } = useEditorStore();
  const Alignment=[{
    label:"Left",
    value:'left',
    icon:AlignLeftIcon
  },{
    label:"Center",
    value:'center',
    icon:AlignCenterIcon
  },{
    label:"Right",
    value:'right',
    icon:AlignRightIcon
  },{
    label:"Justify",
    value:'justify',
    icon:AlignJustifyIcon
  }]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <AlignLeftIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
       {Alignment.map(({label,value,icon:Icon})=>(
        <button key={value}
          onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
          className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",editor?.isActive("textAlign",{align:value})&&"bg-neutral-200/80")}>
         <Icon className="size-4"/>
         <span className="text-sm">
          {label}
         </span>
        </button>
       ))}
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
const ImageButton = ()=>{
  const {editor}=useEditorStore();
  const [isDialogueOpen , setIsDialogueOpen]=useState(false);
  const [imageUrl,setImageUrl] = useState("");
   
  const onChange = (src:string)=>{
     editor?.chain().focus().setImage({src}).run();
  }
  const onUpload =()=>{
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e)=>{
      const file = (e.target as HTMLInputElement).files?.[0];
      if(file){
      const imageUrl = URL.createObjectURL(file);
      onChange(imageUrl);
      }
    }
    input.click(); 
  };
  const HandleImageUrlSubmit =()=>{
    if(imageUrl){
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogueOpen(false);
    }
  };
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <ImageIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onUpload} className="flex items-center">
          <UploadIcon className="size-4 mr-2"/>
          Upload 
        </DropdownMenuItem>
        <DropdownMenuItem onClick={()=>setIsDialogueOpen(true)} className="flex items-center">
          <SearchIcon className="size-4 mr-2"/>
          Paste Image Url        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={isDialogueOpen} onOpenChange={()=>setIsDialogueOpen(false)}>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Paste Image Url</DialogTitle>
        </DialogHeader>
        <input placeholder="insert image url"
        value={imageUrl}
        onChange={(e)=>setImageUrl(e.target.value)}
      onKeyDown={(e)=>{
        if(e.key==="Enter"){
          HandleImageUrlSubmit();
        }
      }}
        ></input>
      </DialogContent>
      {/* <DialogFooter>
        <button onClick={HandleImageUrlSubmit}>Insert</button>
      </DialogFooter> */}
      </Dialog>
    </>
  )
}
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
        <DropdownMenuContent className="">
        <SketchPicker color={value} onChange={onChange}/>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
const HighLightColourButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes('highlight').color|| "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setMark('highlight', { color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <HighlighterIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="p-0">
        <CirclePicker color={value} onChange={onChange}/>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
interface Heading {
  label: string;
  value: number;
  fontSize: string;
}
const HeadingLevelButton=()=>{
  const {editor}=useEditorStore();
  const heading:Heading[] =[
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
    <div className="bg-[#d5dae0] px-2.5 py-0.5 rounded-[14px] min-h-[40px] flex items-center gap-x-4.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      <SeparaterIcon/>
      <FontFamilyButton />
      <SeparaterIcon/>
      <HeadingLevelButton/>
      <SeparaterIcon/>
      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      <SeparaterIcon/>
      <FontSizeButton/>
      <SeparaterIcon/>
      <TextColourButton/>
      <HighLightColourButton/>
      <ImageButton/>
      <AlignButton/>
      <LineHeightButton/>

      
      <SeparaterIcon/>
      {sections[2].map((item) => (
        <ToolbarButton
          key={item.label}
          label={item.label} // Avoid overwriting here
          icon={item.Icon}
          onClick={item.onClick}
          isActive={item.isActive}
        />
      ))}
      <SeparaterIcon/>
      <CodeBlockButton/>
      <SeparaterIcon/>
      <CountCharacters/>
    </div>
  );
};

export default ToolBar;
