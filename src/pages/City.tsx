import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Weather } from '../types/type';
const key = import.meta.env.VITE_KEY

const City = () => {

    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [weatherData, setWeatherData] = useState<Weather | null>(null);

    const getCity = async () => {
        setLoading(true)
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${params?.city}&aqi=no`
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
                setLoading(true)
                setError(data?.error?.message)
            }
        } catch (error: any) {
            console.log(error);
            setLoading(false)
            setError(error?.error?.message)
        }
    }
    useEffect(() => {
        getCity()
    }, [params.city])

    console.log(weatherData);

    return (
        <>
            {error && <h1 className="text-center text-3xl mt-10 font-bold text-[#85D6A0]">{error}</h1>}
            {!loading ?
                <div className='p-10 m-10 shadow-lg bg-[#DAEAE0]'>

                    <h1 className='text-[#006F26] text-2xl font-bold my-5 text-center'>{weatherData?.city}</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <h1 className='text-[#72AB87] p-2 bg- text-2xl text-center  my-2 md:text-left'>Region: {weatherData?.region}</h1>
                        <h1 className='text-[#72AB87] text-2xl text-center  my-2 md:text-right'>Country: {weatherData?.country}</h1>
                        <h1 className='text-[#72AB87] text-2xl text-center my-2 md:text-left'>timezone: {weatherData?.timezone}</h1>
                        <h1 className='text-[#72AB87] text-2xl text-center my-2 md:text-right'>localtime: {weatherData?.localtime}</h1>

                    </div>
                    <div className='flex md:flex-row flex-col justify-center items-center gap-10'>
                        <div className='flex items-center'>
                            <img src={weatherData?.condition_icon} />
                            <h1 className="text-lg font-bold">{weatherData?.temp}℃</h1>
                        </div>
                        <div className='flex items-center gap-1'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="fs-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M156.7 256H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h142.2c15.9 0 30.8 10.9 33.4 26.6 3.3 20-12.1 37.4-31.6 37.4-14.1 0-26.1-9.2-30.4-21.9-2.1-6.3-8.6-10.1-15.2-10.1H81.6c-9.8 0-17.7 8.8-15.9 18.4 8.6 44.1 47.6 77.6 94.2 77.6 57.1 0 102.7-50.1 95.2-108.6C249 291 205.4 256 156.7 256zM16 224h336c59.7 0 106.8-54.8 93.8-116.7-7.6-36.2-36.9-65.5-73.1-73.1-55.4-11.6-105.1 24.9-114.9 75.5-1.9 9.6 6.1 18.3 15.8 18.3h32.8c6.7 0 13.1-3.8 15.2-10.1C325.9 105.2 337.9 96 352 96c19.4 0 34.9 17.4 31.6 37.4-2.6 15.7-17.4 26.6-33.4 26.6H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zm384 32H243.7c19.3 16.6 33.2 38.8 39.8 64H400c26.5 0 48 21.5 48 48s-21.5 48-48 48c-17.9 0-33.3-9.9-41.6-24.4-2.9-5-8.7-7.6-14.5-7.6h-33.8c-10.9 0-19 10.8-15.3 21.1 17.8 50.6 70.5 84.8 129.4 72.3 41.2-8.7 75.1-41.6 84.7-82.7C526 321.5 470.5 256 400 256z"></path></svg>
                            <h1 className="text-lg font-bold">{weatherData?.wind}</h1>
                        </div>
                        <div className='flex items-center gap-1'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="fs-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"></path></svg>
                            <h1 className="text-lg font-bold">{weatherData?.humadity}</h1>
                        </div>
                        <div className='flex items-center gap-1'>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="fs-3" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M63.6 33c-17.23 0-31 13.77-31 31s13.77 31 31 31 31-13.77 31-31-13.77-31-31-31zm171.7 6.74l-122.7 25.6c-.4 14.13-6.9 26.86-16.83 35.56l42.83 114.5 11.5-20.8-41.2-110.1 115-24 9.4-17.15zm8.5 21.9L161.7 210.8l53.6 16.9 71.4-129.9zM48.6 110.6V479h30V110.6c-4.73 1.6-9.77 2.4-15 2.4s-10.27-.8-15-2.4zm288 29.3l-59.2 107.4 62.3 19.6 46.8-85zm99.9 84.1l-34.4 62.5 53.5 16.9 23.8-43.2z"></path></svg>                    <h1 className="text-lg font-bold">{weatherData?.humadity}</h1>
                            <h1 className="text-lg font-bold">{weatherData?.wind_dir}</h1>
                        </div>
                    </div>
                </div>
                : <h1 className="text-center text-3xl mt-10 font-bold text-[#85D6A0]">Loading....</h1>}
        </>

    )
}

export default City

