import Avatar from 'src/features/Profiles/Components/Avatar/Avatar';
import dayjs from 'dayjs'
import { UnionToObjectKeys } from 'src/utils/types/utils';
import { trimText } from 'src/utils/helperFunctions';
import { Link } from 'react-router-dom';
import { createRoute } from 'src/utils/routing';

interface Props {
    author: {
        id: number,
        name: string,
        avatar: string
    }
    date: string;
    size?: 'sm' | 'md' | 'lg';
    showTimeAgo?: boolean;
}

const avatarSize: UnionToObjectKeys<Props, 'size', number> = {
    sm: 32,
    md: 40,
    lg: 48
}

const nameSize: UnionToObjectKeys<Props, 'size'> = {
    sm: 'text-body5',
    md: 'text-body4',
    lg: 'text-body4'
}

export default function Header({
    size = 'md',
    showTimeAgo = false,
    ...props }: Props) {

    const passedTime = dayjs().diff(props.date, 'hour');

    const dateToShow = () => {
        const passedTime = dayjs().diff(props.date, 'hour');
        if (passedTime === 0) return 'now';
        if (passedTime < 24) return `${dayjs().diff(props.date, 'hour')}h ago`
        return dayjs(props.date).format('MMMM DD');
    }


    return (
        <div className='flex gap-8'>
            <Link to={createRoute({ type: 'profile', id: props.author.id, username: props.author.name })}>
                <Avatar width={avatarSize[size]} src={props.author.avatar} />
            </Link>
            <div className='overflow-hidden'>
                <p className={`${nameSize[size]} text-black font-medium overflow-hidden text-ellipsis`}>{trimText(props.author.name, 30)}</p>
                <p className={`text-body6 text-gray-600`}>{dateToShow()}</p>
            </div>
            {/* {showTimeAgo && <p className={`${nameSize[size]} text-gray-500 ml-auto `}>
                {dayjs().diff(props.date, 'hour') < 24 ? `${dayjs().diff(props.date, 'hour')}h ago` : undefined}
            </p>} */}
        </div>
    )
}
