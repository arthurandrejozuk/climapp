
import './styles.css'

export const CardDay = ({otherDays}) => {

    const options = { weekday: "long" }
    const [day, month, year] = otherDays.full_date.split("/");

    const formatted = `${year}-${month}-${day}`;
    const date = new Date(formatted)
    const weekday = new Intl.DateTimeFormat("pt-BR", options).format(date);

    const firstLetter = weekday.charAt(0).toUpperCase();
    const weekDayFormatted = firstLetter + weekday.slice(1);

    
    return(
        <div className="card_day">
            <p className="card_day_day">{weekDayFormatted}</p>
            <p className="card_day_date">({otherDays.date})</p>
            <img className="card_day_img" src={`./icons-weather/${otherDays.condition}.svg`} alt={otherDays.description} />
            <p className="card_day_min_max">{otherDays.min}/{otherDays.max}°</p>
        </div>
    )
}