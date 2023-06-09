
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
            displayPersonInfo(person);
            break;
        case "family":
            let personFamily = findPersonFamily(person, people);
   //         displayPeople('Family', personFamily);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person, people);
    
            //  displayPeople('Descendants', personDescendants);
            break;
        case "quit":
            return;
        default:
            alert('Invalid input. Please try again.');
    }

    return mainMenu(person, people);
}

function findPersonDescendants(poi,people){
    let foundchildren=[]
    const findchildren = people.filter(function(person){
        // if (poi.id === person.parents[0])
        if (poi.parents.includes(person.id)){
            foundchildren.push(person);
            return true;

        }
        return foundchildren;

    })

}





function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function displayPersonInfo(personToDisplay){
    const formatedPersonDisplayInfo = `Full Name: ${personToDisplay.firstName} ${personToDisplay.lastName} \nGender: ${personToDisplay.gender} \nDOB: ${personToDisplay.dob}\n
    Height: ${personToDisplay.height} \nWeight: ${personToDisplay.weight} \nEye Color: ${personToDisplay.eyeColor} \nOccupation: ${personToDisplay.occupation}`;
    alert(`${formatedPersonDisplayInfo}`);
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
    foundSpouse = people.filter(function(el){
    if (person.currentSpouse === el.id){
        alert(`${el.firstName} ${el.lastName} is the spouse of ${person.firstName} ${person.lastName}.`);
        return true;
    }
    else{
        return false;
    }})
}
function findSiblings(person,people){
    let foundSiblings = [];
    foundSiblings = people.filter(function(el){
        //If there are no parents or we are on the same person - skip
        if (person.parents.length === 0 || person.id === el.id || el.parents[0]==""){
            return false;
        }
        else if (person.parents[0] === el.parents[0] || person.parents[1]=== el.parents[1]){
            foundSiblings.push(el);
            return true;
        }
        })
        displayPeople("Siblings", foundSiblings)
        // alert(foundSiblings);
    return foundSiblings;

}

function findPersonFamily(person, people){
    const personFamily = findParents(person,people);
    const personSpouse = findSpouse(person,people);
    const personSiblings = findSiblings(person,people);
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