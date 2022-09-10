import { UserAvatarProps } from "../interfaces"



export const UserAvatar = (props: UserAvatarProps) => {
    return (
        <div className="flex justify-center align-center mx-auto">
            <img src={props.src} alt={props.alt} className="rounded-full max-h-10" />
        </div>
    )
}