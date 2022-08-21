import { useSearchParams } from "react-router-dom";

export const Vk = () => {
    const [ queryParams ] = useSearchParams();
    const code = queryParams.get('code');
    
    return (
        <>
            <div className="container p-12">
                напиши нашему боту вконтакте <strong>[СКОРО БУДЕТ]</strong> и сообщи ему код: <strong>{code}</strong> (птсс. только тихо, только ему)
            </div>
        </>
    )
}