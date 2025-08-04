'use client'
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';


const templates = [
  {
    id: "blank",
    label: "Blank",
    imageUrl: "/blank-document.svg"
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/software-proposal.svg"
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/project-proposal.svg"
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/business-letter.svg"
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg"
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/cover-letter.svg"
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg"
  }
];

const TemplateGallery = () => {
  const isCreating = false;
  const router = useRouter();

  const handleTemplateClick = (templateId) => {
    // Navigate to the editor page with the selected template's ID
    router.push(`/documents/editor?templateId=${templateId}`);
  };

  return (
    <div className='bg-[#F1F3F4]'>
      <div className='max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4'>
        <h3 className='text-base font-medium'> Start a new Document</h3>
        <Carousel>
          <CarouselContent className='-ml-4'>
            {templates.map((template) => (
              <CarouselItem key={template.id} className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg-basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4'>
                <div className={cn("aspect-[3/4] flex flex-col gap-y-2.5", isCreating && "pointer-events-none opacity-50")}>
                  <button
                    disabled={isCreating}
                    onClick={() => handleTemplateClick(template.id)} // Trigger the click handler
                    style={{
                      background: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    }}
                    className='size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white'
                  />
                  <p className='text-sm font-medium truncate'>{template.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplateGallery;
