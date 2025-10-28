
async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
        }
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();
		const people = data.results;
		people.sort((a, b) => {
			return a.name.last.localeCompare(b.name.last);
		});
		
	
		const tbody = $('#peopleBody');
		
		
		people.forEach(person => {
			
			const row = $('<tr>').attr('title', `Phone: ${person.phone}`);
			
			
			row.append($('<td>').html(`<img class="profile-img" src="${person.picture.medium}">`));
			row.append($('<td>').text(person.name.first));
			row.append($('<td>').text(person.name.last));
			row.append($('<td>').text(person.email));
			row.append($('<td>').text(person.location.city));
			row.append($('<td>').text(person.location.state));
			row.append($('<td>').text(person.location.country));
			
			tbody.append(row);
		});
		
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();