
import { formatDay } from '../../utils/function'
import './styles.css'

export const CardDay = ({ otherDays }) => {

    return (
        <div className="card_day">
            <p className="card_day_day">{formatDay(otherDays)}</p>
            <p className="card_day_date">({otherDays.date})</p>
            <img className="card_day_img" src={`./icons-weather/${otherDays.condition}.svg`} alt={otherDays.description} />
            <p className="card_day_min_max">{otherDays.min}/{otherDays.max}°</p>
        </div>
    )
}