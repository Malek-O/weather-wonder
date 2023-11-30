import Hero from '../Hero'

export const Main = () => {
    return (
        <main className="md:text-left text-center md:mx-5 md:flex-row flex flex-col justify-evenly items-center mt-16">
            <section className='mx-5 md:mx-0 order-2 md:order-1'>
                <h1 className="font-bold text-5xl text-[#829589]">Welcome to <span className="text-[#85D6A0]">Weather Wonder</span> </h1>
                <p className="mt-2 text-2xl md:w-3/4 text-[#829589]">Search for your country to get immediate weather information</p>
            </section>
            <section className="md:w-96 md:h-96 w-72 h-72 order-1 md:order-2">
                <Hero />
            </section>
        </main>
    )
}
