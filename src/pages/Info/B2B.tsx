


export const B2B = () => {
    
    const email = 'brief@much-match.fun'

    return (
        <div className="p-4">
            <h2 className="text-4xl leading-loose mb-16 pb-16 border-b">уникальный нетворкинг-инструмент для <span className="underline">эффективного</span> сегментирования команд</h2>
            
            <div className="ml-auto w-fit">
                расскажите нам о своем проекте: <a className="ml-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-2xl py-1" href={`mailto:${email}`}>{email}</a>
            </div>
        </div>
    )
}