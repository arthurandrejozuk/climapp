    export function formatDay(days) {
        const options = { weekday: "long" }
        const [day, month, year] = days.full_date.split("/");

        const formatted = `${year}-${month}-${day}`;
        const date = new Date(formatted)
        const weekday = new Intl.DateTimeFormat("pt-BR", options).format(date);

        const firstLetter = weekday.charAt(0).toUpperCase();
        const weekDayFormatted = (firstLetter + weekday.slice(1)).split('-feira');
        return weekDayFormatted;
    }

    export function formatTime(tempo){
        if(tempo.includes("am")){
            return tempo.split("am")
        } else {
            const horas = tempo.split(':')
            const horarioBrasileiro = (parseInt(horas[0]) + 12 + `:${horas[1]}`).split('pm');
            return horarioBrasileiro
        }
  }