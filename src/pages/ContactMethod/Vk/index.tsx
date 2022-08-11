export const Vk = () => {
    const code = Math.round(Math.random() * 100) + '' + Math.round(Math.random() * 100);
    
    return (
        <>
            <div className="container p-12">
                напиши нашему боту вконтакте <strong>[СКОРО БУДЕТ]</strong> и сообщи ему код: <strong>{code}</strong> (птсс. только тихо, только ему)
            </div>
        </>
    )
}