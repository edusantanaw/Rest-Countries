import styles from './Home.module.css'
import { BsSearch } from 'react-icons/bs'
import Arrow from '../assets/chevron-down-outline.svg'
import { useState, useEffect } from 'react'
import Country from './Country'

export default function Home() {

    const [countrys, setCountry] = useState([])
    const [filter, setFilter] = useState([])

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

    const filterCountrys = () => {
        const res = countrys.filter((country) => country.region === 'Europe')
        setFilter(res)
    }

    return (
        <section className={styles.home}>
            <div className={styles.search}>
                <div>
                    <BsSearch className={styles.icon}></BsSearch>
                    <input type="search" placeholder='Search for a country...' />
                </div>
                <button onClick={filterCountrys}>Filter by Region <img src={Arrow} alt="arrow" />  </button>
            </div>
            <div className={styles.content}>
                {countrys.length > 0  && filter.length === 0 ?  countrys.map((country) => (
                    <Country key={country.tId} name={country.name.common} image={country.flags.png} capital={country.capital} population={country.population} region={country.region} />
                )) :  filter.map((country) => (
                        <Country key={country.tId} name={country.name.common} image={country.flags.png} capital={country.capital} population={country.population} region={country.region} />
                    ))}
            </div>

        </section>
    )
}