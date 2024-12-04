
const today = new Date();
document.getElementById("date").value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
										// Imposting the date input to today's date

function get_inputted_date(){
	if(document.getElementById("date").value){
		return new Date(document.getElementById("date").value)
	}
}

function get_specific_day_date(date){

	let days = ["Sera", "Mattina", "Pomeriggio", "Notte", "Casa"]
	let start_date = new Date(2024, 10, 26, 1)

	start_date.setHours(0, 0, 0, 0); // Hour reset to prevent DST issues

    date.setHours(0, 0, 0, 0); // Hour reset to prevend DST issues

	let start_date_is_greater = false;
	let cycles = 0;

	if(start_date > date){
		start_date_is_greater = true
		days.reverse()
		cycles -= 1
	}

	while(start_date.getTime() !== date.getTime()){
		start_date.setDate(start_date.getDate() + (start_date_is_greater ? -1 : 1))
		cycles += 1
	}

	return days[cycles % days.length]
}

function submit(){

	let days = ["Sera", "Mattina", "Pomeriggio", "Notte", "Casa"]

	const baseDay = get_specific_day_date(get_inputted_date());

    const offsets = [-2, -1, 0, 1, 2];
    offsets.forEach((offset, index) => {
        const newDate = new Date(get_inputted_date());
        newDate.setDate(newDate.getDate() + offset);

        const dayName = days[(days.indexOf(baseDay) + offset + days.length) % days.length];
        document.getElementById(`day${index + 1}`).innerHTML = `${newDate.toLocaleDateString('it-IT', { month: 'short', day: '2-digit' })}<br><br>${dayName}`;
    });
}

submit()