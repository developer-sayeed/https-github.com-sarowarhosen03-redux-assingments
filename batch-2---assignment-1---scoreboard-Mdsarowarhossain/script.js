let allMatchContainer = document.getElementById("all-matches");
let addMatch = document.getElementById("add-match");
let resetScoreBtn = document.getElementById("resetScoreBtn");
let currentId = 1;
//declearing static variables
const INCREAMENT = "INCREAMENT";
const DECREAMENT = "DECREAMNT";
const PUSHELEMENT = "pushElement";
const SCOREUPATE = "SCOREUPDATE";
const RESET = "RESET";
//initial state
let initialScore = {
  matchScoreboard: [
    {
      id: 1,
      score: 0,
    },
  ],
  scoreUpdated: false,
  updatededId: 0,
  scoreReset: false,
};
// return actions
function getAction(type, id, value) {
  return {
    type,
    payload: {
      id,
      value,
    },
  };
}

function getActionForPush(type, matchObject) {
  return {
    type,
    matchObject,
  };
}
//reducer for match scorees
function scoreUpdateReducer(state = initialScore, action) {
  // clone the state usin modern js strcture lone function
  let copyState = structuredClone(state);
  if (action.type === INCREAMENT) {
    //incremnet score
    let { id, value } = action.payload;
    let currentscore = state.matchScoreboard[id - 1].score;

    copyState.matchScoreboard[id - 1].score = currentscore + value;
    copyState.updatededId = id;
    copyState.scoreUpdated = true;

    return { ...copyState };
  } else if (action.type === DECREAMENT) {

    //decrement score
    
    let { id, value } = action.payload;
    let currentscore = state.matchScoreboard[id - 1].score;
    copyState.matchScoreboard[id - 1].score =
      currentscore > value && currentscore != 0 ? currentscore - value : 0;
    copyState.updatededId = id;
    copyState.scoreUpdated = true;

    return { ...copyState };
  } else if (action.type === PUSHELEMENT) {
   //add new match
    copyState.matchScoreboard.push(action.matchObject);
    copyState.scoreUpdated = false;
    return { ...copyState };
  } else if (action.type === RESET) {
    //reset all
    copyState.matchScoreboard.forEach((element) => {
      element.score = 0;
    });
    copyState.scoreReset = true;
    return { ...copyState };
  } else if (action.type === SCOREUPATE) {
    //make score updated  , reset reaset false
    copyState.scoreUpdated = false;
    copyState.scoreReset = false;
    return { ...copyState };
  } else {
    return { ...state };
  }
}
function render() {
  const currentState = matchScore.getState(); //getting the state
  if (currentState.scoreUpdated) {
    let id = currentState.updatededId;
    document.getElementById(`score${id}`).innerText = `${
      currentState.matchScoreboard[id - 1].score
    }`; //find and update
    matchScore.dispatch({ type: SCOREUPATE });
  } else if (currentState.scoreReset) {
  
    //select alll input field and score board
    let inputFields = document.querySelectorAll(".score-inputfield");
    inputFields.forEach((element) => {
      element.value = "";//reset
    });

    let scoreList = document.querySelectorAll(".lws-singleResult");
    scoreList.forEach((element) => {
      element.innerText = "0"; //reset
    });
  }

}
//creatubg stire

const matchScore = Redux.createStore(scoreUpdateReducer);
matchScore.subscribe(render);//subscrib store


//add new match on the DOM
function addElementToAllMatchContainers(containerElement, id) {
  const newElement = document.createElement("div");
  newElement.classList.add("match");
  newElement.innerHTML = `   

  <div class="wrapper">
    <button class="lws-delete">
      <img src="./image/delete.svg" alt="" />
    </button>
    <h3 class="lws-matchName">Match ${id}</h3>
  </div>
  <div class="inc-dec">
    <form class="incrementForm" onsubmit="return false;" >
      <h4>Increment</h4>
      <input type="number" name="increment" id="${id}" onkeypress="incrementaCall(this,event)" id="1" class="lws-increment score-inputfield" />
    </form>
    <form class="decrementForm" onsubmit="return false">
      <h4>Decrement</h4>
      <input type="number" onkeypress="decrementaCall(this,event)" name="decrement" id="${id},event" class="lws-decrement score-inputfield" />
    </form>
  </div>
  <div class="numbers">
    <h2 class="lws-singleResult" id="score${id}">0</h2>
  </div>

`;
  // Append the new element to the match container
  containerElement.appendChild(newElement);

  return {
    id: id,
    score: 0,
  };
}

//settig up habdelers

//add match
addMatch.addEventListener("click", () => {
  currentId++;
  let newMatcObject = addElementToAllMatchContainers(
    allMatchContainer,
    currentId
  );
  console.log(currentId);
  matchScore.dispatch(getActionForPush(PUSHELEMENT, newMatcObject));
});

//increment score habdeler

function incrementaCall(element, event) {
  if (event.key === "Enter") {
    matchScore.dispatch(
      getAction(INCREAMENT, parseInt(element.id), parseInt(element.value))
    );
  }
}
//decrement score habdeler

function decrementaCall(element, event) {
  if (event.key === "Enter") {
    matchScore.dispatch(
      getAction(DECREAMENT, parseInt(element.id), parseInt(element.value))
    );
  }
}
//reset all score handeler
resetScoreBtn.addEventListener("click", () => {
  matchScore.dispatch({ type: RESET });
});
