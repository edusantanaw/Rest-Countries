import styles from './Home.module.css'
import { BsSearch, BsUpcScan } from 'react-icons/bs'
import Arrow from '../assets/chevron-down-outline.svg'
import { useState, useEffect } from 'react'
import CountryCard from './CountryCard'


export default function Home() {

    const [countrys, setCountry] = useState([])
    const [filter, setFilter] = useState([])
    const [search, setSearch] = useState([])
    const [existsSearch, setExistsSearch] = useState(false)
    const [visible, setVisible] = useState(false)



    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((resp) => resp.json())
            .then((resp) => {
                setCountry(resp)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const filterCountrys = (target) => {
        setSearch(false)
        const res = countrys.filter((country) => country.region === target)
        setFilter(res)
    }

    const busca = (target) => {
        setFilter(false)
        target = target.toLowerCase()
        const filterCountry = countrys.filter((country) => country.name.common.toLowerCase().includes(target))
        setSearch(filterCountry)
        setExistsSearch(true)
        console.log(existsSearch)
    }

    const isVisible = () => {
        visible ? setVisible(false) : setVisible(true)
    }

    return (
        <section className={styles.home}>
            <div className={styles.search}>
                <div>
                    <BsSearch className={styles.icon}></BsSearch>
                    <input type="search" placeholder='Search for a country...' onChange={(e) => {
                        busca(e.target.value)
                    }} />
                </div>
                <div className={styles.regions}>
                    <button >Filter by Region <img src={Arrow} alt="arrow" onClick={isVisible} /></button>
                    {visible &&
                        <ul>
                            <li onClick={(e) => filterCountrys(e.target.innerText)}>Africa</li>
                            <li onClick={(e) => filterCountrys(e.target.innerText)}>Americas</li>
                            <li onClick={(e) => filterCountrys(e.target.innerText)}>Asia</li>
                            <li onClick={(e) => filterCountrys(e.target.innerText)}>Europe</li>
                            <li onClick={(e) => filterCountrys(e.target.innerText)}>Oceania</li>
                        </ul>}
                </div>
            </div>
            <div className={styles.content}>
                {countrys.length > 0 && filter.length === 0 && !existsSearch ? countrys.map((country) => (
                    <CountryCard key={country.tId}
                        name={country.name.common}
                        image={country.flags.png}
                        capital={country.capital}
                        population={country.population}
                        region={country.region} />

                )) : filter.length > 0 ? filter.map((country) => (

                    <CountryCard key={country.tId}
                        name={country.name.common}
                        image={country.flags.png}
                        capital={country.capital}
                        population={country.population}
                        region={country.region} />
                )) : existsSearch && search.length > 0 ?  search.map((country) => (

                    <CountryCard key={country.tId}
                        name={country.name.common}
                        image={country.flags.png}
                        capital={country.capital}
                        population={country.population}
                        region={country.region} />

                )) : (
                    <span>Nenhum pais encontrado!</span>
                      
                ) }
            </div>
        </section>
    )
}