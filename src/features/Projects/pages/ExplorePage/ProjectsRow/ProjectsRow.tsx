import { ReactNode, useCallback, useLayoutEffect, useEffect, useRef, useState } from "react";
import { ProjectCard } from "src/utils/interfaces";
import Carousel from 'react-multi-carousel';
import { MdDoubleArrow, } from 'react-icons/md';
import { useAppDispatch } from "src/utils/hooks";
import { openModal } from "src/redux/features/modals.slice";
import { useResizeListener } from 'src/utils/hooks'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import './style.css';
import { Link } from "react-router-dom";
import { openProject } from "src/redux/features/project.slice";
import ProjectCardMini from "src/features/Projects/Components/ProjectCardMini/ProjectCardMini";

interface Props {
    title: string | ReactNode,
    link?: string;
    projects: ProjectCard[]
}

const responsive = {
    all: {
        breakpoint: { max: 5000, min: 0 },
        items: calcNumItems(),
        slidesToSlide: Math.floor(calcNumItems())
    }
}

// const calcNumItems = () => {
//     const items = (((window.innerWidth - 32 - 296) / (296 + 20)));
//     return items;
// }

function calcNumItems(width = window.innerWidth) {
    const items = ((width / (296 + 20)));
    return items;
}



export default function ProjectsRow({ title, link, projects }: Props) {

    const dispatch = useAppDispatch()
    let drag = useRef(false);
    const rowRef = useRef<HTMLDivElement>(null!);


    useEffect(() => {
        const mousedownListener = () => drag.current = false
        const mousemoveListener = () => drag.current = true

        document.addEventListener('mousedown', mousedownListener);
        document.addEventListener('mousemove', mousemoveListener);

        return () => {
            document.removeEventListener('mousedown', mousedownListener);
            document.removeEventListener('mousemove', mousemoveListener);
        }
    }, [])



    const handleClick = (projectId: number) => {

        if (!drag.current) {
            dispatch(openModal({ Modal: "ProjectDetailsCard", props: { projectId } }))
        }
    }

    const recalcItemsCnt = useCallback(
        () => {
            if (rowRef.current) {
                responsive.all.items = calcNumItems(rowRef.current.clientWidth)
                responsive.all.slidesToSlide = Math.floor(responsive.all.items);
            }
        },
        [],
    );

    useLayoutEffect(recalcItemsCnt, [recalcItemsCnt]);


    useResizeListener(recalcItemsCnt)

    if (projects.length === 0)
        return <></>


    return (
        <div className='mb-48'>
            <h3 className="font-bolder text-body3 mb-24">
                <span className="align-middle">{title}</span>
                {link && <Link to={link}>
                    <MdDoubleArrow className='text-gray-200 ml-8 hover:cursor-pointer transform scale-y-110 scale-x-125 origin-left' />
                </Link>}
            </h3>
            <div ref={rowRef} className="">
                <Carousel
                    showDots={false}
                    autoPlay={false}
                    // arrows={false}
                    responsive={responsive}
                    // centerMode
                    itemClass='pb-[1px]'
                    containerClass='group'
                    customLeftArrow={
                        <button className='carousel-btns opacity-0 group-hover:opacity-100 transition-opacity  w-64 h-full absolute top-0 left-0 rounded-l-12 bg-gradient-to-r from-gray-700 text-white' >
                            <IoIosArrowBack className='scale-150' />
                        </button>
                    }
                    customRightArrow={
                        <button className='carousel-btns opacity-0 group-hover:opacity-100 transition-opacity  w-64 h-full absolute top-0 right-0 rounded-r-12 bg-gradient-to-l from-gray-700 text-white' >
                            <IoIosArrowForward className='scale-150' />
                        </button>
                    }
                >
                    {projects.map((project, idx) =>
                        <div key={project.id} className='max-w-[296px]' >
                            <ProjectCardMini project={project} onClick={handleClick} />
                        </div>
                    )}
                </Carousel>
            </div>


        </div>
    )
}
