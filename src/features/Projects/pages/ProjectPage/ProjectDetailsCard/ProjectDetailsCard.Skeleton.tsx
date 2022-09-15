import { motion } from 'framer-motion'
import { MdClose, } from 'react-icons/md';
import { ModalCard, modalCardVariants } from 'src/Components/Modals/ModalsContainer/ModalsContainer';
import Skeleton from 'react-loading-skeleton';
import Badge from 'src/Components/Badge/Badge';
import { useMediaQuery } from 'src/utils/hooks';
import { MEDIA_QUERIES } from 'src/utils/theme';


interface Props extends ModalCard {
}

export default function ProjectDetailsCardSkeleton({ onClose, direction, ...props }: Props) {



    const isMdScreen = useMediaQuery(MEDIA_QUERIES.isMedium)




    return (
        <motion.div
            custom={direction}
            variants={modalCardVariants}
            initial='initial'
            animate="animate"
            exit='exit'
            className={`modal-card max-w-[768px] ${props.isPageModal && !isMdScreen && 'rounded-0 w-full min-h-screen'}`}

        >
            <div className="relative h-[80px] lg:h-[152px]">
                <Skeleton height='100%' className='!leading-inherit' />
                <button className="w-40 h-40 md:w-48 md:h-48 bg-white z-10 absolute top-1/2 left-32 -translate-y-1/2 rounded-full hover:bg-gray-200 text-center" onClick={onClose}><MdClose className=' inline-block text-body2 lg:text-body1' /></button>
            </div>
            <div className="p-24">
                <div className="flex gap-24 items-center h-[93px]">
                    <div className="flex-shrink-0 w-[93px] h-[93px] rounded-md overflow-hidden">
                        <Skeleton height='100%' />
                    </div>
                    <div className='flex flex-col items-start justify-between self-stretch'>
                        <h3 className="text-h3 font-regular"> <Skeleton width='13ch' /></h3>
                        <span className="text-blue-400 font-regular text-body4"  > <Skeleton width='6ch' /></span>
                        <div className='flex gap-8'>
                            <Badge size='sm' isLoading />
                            <Badge size='sm' isLoading />
                        </div>
                    </div>

                </div>
                <p className="mt-40 text-body4 leading-normal h-[120px]">

                    <Skeleton width='98%' />
                    <Skeleton width='90%' />
                    <Skeleton width='70%' />
                    <Skeleton width='40%' />
                </p>

                <div className="mt-40">
                    <h3 className="text-h5 font-bold mb-16">Screenshots</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                        {
                            Array(4).fill(0).map((_, idx) => <div key={idx} className="w-full relative pt-[56%] cursor-pointer bg-gray-200 shadow-sm rounded-10 overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full object-cover"></div>
                            </div>)
                        }
                    </div>
                </div>
                <hr className="my-40" />
                <div className="text-center h-[100px]">

                </div>
            </div>
        </motion.div>
    )
}
