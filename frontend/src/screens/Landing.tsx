import { useNavigate } from "react-router-dom"
import { Button } from "../components/button"
export const Landing = () =>{
    const navigate = useNavigate()
    return <div className = 'flex justify-center'>
        <div className="pt-4 max-w-screen-lg">
            <div className = "grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className='flex justify-center'>
                    <img src={"/image.png"} className="max-w-96"/>
                </div>
               <div>
                    <h1 className="mt-7 text-4xl font-bold text-white">
                        Play Chess Online on the #2 Site
                    </h1>
                    <div className="mt-4 flex justify-center">
                        <Button onClick={() => {navigate("/game")}}>
                             Play
                        </Button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
}