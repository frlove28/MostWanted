
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByTraits(people){
    const traitToSearchFor = validatedPrompt('Enter a trait:',['height','weight','eye color']);
    if (traitToSearchFor === 'height'){ 
        const traitToSearchForString = prompt('Please enter the height, in inches, of the person you are searching for.: ');
        const traitToSearchForInt = parseInt(traitToSearchForString);
        const traitFilterResults = people.filter(person => person.height === traitToSearchForInt);
        return traitFilterResults;
    }
    else if(traitToSearchFor === 'weight'){ 
        const traitToSearchForString = prompt('Please enter the weight, in pounds, of the person you are searching for.: ');
        const traitToSearchForInt = parseInt(traitToSearchForString);
        const traitFilterResults = people.filter(person => person.weight === traitToSearchForInt);
        return traitFilterResults;
    }
    else if(traitToSearchFor === 'eye color'){ 
        const traitToSearchForString = validatedPrompt('Please enter the eye color of the person you are searching for:', ['green','black','blue','hazel','brown']);
        const traitFilterResults = people.filter(person => person.eyeColor === traitToSearchForString);
        return traitFilterResults;
    }
}
function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );

    switch (mainMenuUserActionChoice) {
        case "info":
<<<<<<< HEAD
             displayPersonInfo(person);
=======
            displayPersonInfo(person);
>>>>>>> 0678b7a7de23bad53968c9b32f2b7681794ac4bf
            break;
        case "family":
            let personFamily = findPersonFamily(person, people);
            displayPeople('Family', personFamily);
            break;
        case "descendants":
            //! TODO
            // let personDescendants = findPersonDescendants(person, people);
            // displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

<<<<<<< HEAD
function displayPersonInfo (person) {
     const formatedPersonDisplayInfo = personToDisplay.map(person => `${person.firstName} ${person.lastName}`).join(`\n`)`
     gender:${person.gender}\n`

    

=======
function displayPersonInfo(personToDisplay){
    const formatedPersonDisplayInfo = `Full Name: ${personToDisplay.firstName} ${personToDisplay.lastName} \nGender: ${personToDisplay.gender} \nDOB: ${personToDisplay.dob}\n
    Height: ${personToDisplay.height} \nWeight: ${personToDisplay.weight} \nEye Color: ${personToDisplay.eyeColor} \nOccupation: ${personToDisplay.occupation}`;
    alert(`${formatedPersonDisplayInfo}`);
>>>>>>> 0678b7a7de23bad53968c9b32f2b7681794ac4bf
}
function findParents(person, people){
    parentArray = [];
    parentArray = people.filter(function(el){
    if (person.parents[0] === el.id || person.parents[1] === el.id){
        parentArray.push(el);
        return true;
    }
    else {
        return false;
    }})
    if(parentArray.length > 1){
        alert(`${parentArray[0].firstName} ${parentArray[0].lastName} and ${parentArray[1].firstName} ${parentArray[1].lastName} are the parents of ${person.firstName} ${person.lastName}.`);     
    }
    else if(parentArray.length == 1){
        alert(`${parentArray[0].firstName} ${parentArray[0].lastName} is the parent of ${person.firstName} ${person.lastName}.`);
    }
    else{
        alert(`${person.firstName} ${person.lastName} doesn't seem to have any parents`)}
    return parentArray;
}
function findSpouse(person,people){
    let currentSpouseArray = [];
    currentSpouseArray = people.filter(function(el){
    if (person.currentSpouse[0] == el.id){
        currentSpouseArray.push(el);
        return true;
    }
    else{
        return false;
    }})
    if(currentSpouseArray.length == 1){
        alert(`${currentSpouseArray.firstName} ${currentSpouseArray.lastName} is the spouse of ${person.firstName} ${person.lastName}.`);
    }
    else{
        alert(`${person.firstName} ${person.lastName} ain't got no spousey!!`)
    }
    return currentSpouseArray
}
function findPersonFamily(person, people){
        personFamily = findParents(person,people);
        personSpouse = findSpouse(person,people);
        return personFamily;
        // const ParentArray = [];
        
        // const personFamily = people.filter(function (person){

        // } => person.parents)
        // alert(`${personFamily}`)
        
        // return personFamily;
} 

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}


function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }
}