import { useState } from "react"
import { Weather } from "../types/type";
import { Link } from 'react-router-dom'
const key = import.meta.env.VITE_KEY



const Search = () => {

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [weatherData, setWeatherData] = useState<Weather | null>(null);

    const handleClick = async () => {
        setWeatherData(null)
        setError('')
        if (query) {
            setLoading(true)
            const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${query}&aqi=no`
            try {
                const response = await fetch(url)
                const data = await response.json()
                setLoading(false)
                if (response.ok) {
                    setWeatherData({
                        city: data?.location?.name,
                        country: data?.location?.country,
                        region: data?.location?.country,
                        timezone: data?.location?.tz_id,
                        localtime: data?.location?.localtime,
                        temp: data?.current?.temp_c,
                        humadity: data?.current?.humidity,
                        wind: data?.current?.wind_kph,
                        wind_dir: data?.current?.wind_dir,
                        condition_icon: data?.current?.condition?.icon,
                        condition_text: data?.current?.condition?.text
                    })
                } else {
                    setError(data?.error?.message)
                }
            } catch (error: any) {
                console.log(error);
                setLoading(false)
                setError(error?.error?.message)
            }
        }
    }

    return (
        <section className="mt-10">
            <div className="flex justify-center gap-2">
                <input type="text"
                    className="p-2 md:w-[600px] w-full ms-5 md:ms-0 rounded-lg placeholder:text-[#5F5F5F] shadow-lg bg-[#BFD5C7] outline-none "
                    placeholder="Search for a city...." onChange={(e) => setQuery(e.target.value)} />
                <button
                    className="p-2  me-5 md:me-0 rounded-lg bg-[#85D6A0] hover:bg-[#5f9972]"
                    onClick={handleClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white
                    ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </button>
            </div>
            {loading && <h1 className="text-center text-3xl mt-10 font-bold text-[#85D6A0]">Loading....</h1>}
            {weatherData &&
                <>
                    <div className="flex gap-2 justify-center items-center mt-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-[#004519]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        <h1 className="text-lg font-bold">{weatherData.city}</h1>
                    </div>
                    <div className="flex gap-2 justify-center items-center mt-5">
                        <img src={weatherData.condition_icon} />
                        <h1 className="text-lg font-bold">{weatherData.temp}℃</h1>
                    </div>
                    <div className="flex justify-center mt-5 mb-20 text-center">
                        <Link to={`/details/${weatherData.city}`} className="md:w-44 w-full mx-5 md:mx-0 text-white p-2 rounded-lg bg-[#85D6A0] hover:bg-[#5f9972]">
                            More Details
                        </Link>
                    </div>
                </>
            }
            {error && <h1 className="text-center text-3xl mt-10 font-bold text-[#85D6A0]">{error}</h1>}
        </section>
    )
}

export default Search