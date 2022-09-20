import styles from './CountryCard.module.css'

export default function CountryCard({key, name, population, capital, image, region}){
    return(
        <div key = {key} className={styles.card}>
            <img src={image} alt="flag" />
            <div className={styles.info}>
                <h1>{name}</h1>
                <span>Population:<p>{population}</p></span>
                <span>Region: <p>{region}</p></span>
                <span>Capital: <p>{capital}</p></span>
            </div>
        </div>
    )
}