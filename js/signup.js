const formElem = document.getElementById("formElem");
const nameValidationModal = document.getElementById("name-validation");
const tagValidationModal = document.getElementById("tag-validation");


formElem.onsubmit = async (e) => {
    const formData = new FormData(formElem);

	e.preventDefault();

	var request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/993304045697630290/MuFTwItniXiglrh_M4eNcfzyz7gNLQDqVlyVKGOkbdtMBEnS6jkAO7pBZ6llWI0a7qzg");

	request.setRequestHeader('Content-type', 'application/json');

	const discordTag = formData.get("discordTag");
	const firstName = formData.get("firstName");
	const lastName = formData.get("lastName");
	const email = formData.get("email");
	
	// Validate discord tag.
	const regex = /.*#\d{4}\b/g;
	console.log(discordTag.match(regex))

	if (!discordTag.match(regex)) {
		tagValidationModal.setAttribute("active", true);
		return
	}


	// Validate first and last name.
	const nameValidation = [firstName, lastName]
	let nameValidated = true

	nameValidation.forEach((name) => {
		if (name === "" || name === null) {
			nameValidationModal.setAttribute("active", true);
			nameValidated = false
			return
		}
	});

	// Do not submit the form if there are no names.
	if (nameValidated === false) {
		return
	}

	// If a bot tries to submit the form, do nothing.
	if (!email === "" || !email === null) {
		return
	}

	var params = {
		username: "Lambda Invite Bot",
		avatar_url: "https://github.com/lambda-foundation/python_repo_template/raw/main/assets/logo.png",
		content: `Join request for \`${discordTag}\`:\nDiscord Tag: \`${discordTag}\`\nFirst Name: \`${firstName}\`\nLast Name: \`${lastName}\``
	}
	request.send(JSON.stringify(params));
};