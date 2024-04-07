const form = document.querySelector ("form");
const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
const progressBar = document.getElementById('progress-bar');
let pseudo, email, password, confirmPass;
// console.log(inputs);
// Dans chaque constante on va y appliquer la "value" afin de la récupérer 
const errorDisplay = (tag, message, valid)  => {
// Grâce à cette fonction on va changer le nom du champ uniquement (pseudo ou mail ou mot de passe) en restant dans une seule variable
//  Grâce au tag , pour faire appel à la fonction on va devoir faire appel au "tag"
  const container = document.querySelector("." + tag + "-container");
  // le ">" va permettre de récupérer l'élément rattaché, en l'occurrence le span dans ce cas là 
  const span = document.querySelector("." + tag + "-container > span");
// Si la fonction n'est PAS valide "!"
  if (!valid) {
    container.classList.add('error');
// Si ce n'est pas valide, on rajoute le message en question
    span.textContent = message; 
  } else {
// Si c'est valide, la requête continue et on peut rajouter un message 
    container.classList.remove('error');
    span.textContent = message;
  }
}
const pseudoChecker = (value) => {
  //  On passe tous en commentaire vu que la requête va être dupliquer juste au dessus
  // // On va récupérer ici les id des documents sélectionnés 
  // const pseudoContainer = document.querySelector('.pseudo-container');
  // // le ">" va permettre de récupérer l'élément rattaché, en l'occurrence le span dans ce cas là 
  // const errorDisplay = document.querySelector('.pseudo-container > span');
  // //  ici , la class mise en forme "error" va apparaitre 
  if (value.length > 0 && (value.length < 3 || value.length > 20)
  ) {
    errorDisplay("pseudo", "Le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;
    // pseudoContainer.classList.add("error");
    // errorDisplay.textContent = "Le pseudo doit faire entre 3 et 20 caractères"
    // // Et si la valeur est différente (!) des caractères signalés entre parenthèse 
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)){
    errorDisplay("pseudo", "Le pseudo ne doit pas contenir de caractères spéciaux");
    pseudo = null;
    // pseudoContainer.classList.add('error');
    // errorDisplay.textcontent = "Le pseudo ne doit pas contenir de caractères spéciaux";
  } else {
    errorDisplay("pseudo", "", true);
    pseudo = value;
    // Cette fonction permet d'enlever le message d'erreur si le champs respecte les bons symboles ou ne comporte pas de symbole spécifique 
    // pseudoContainer.classList.remove("error");
    // errorDisplay.textContent = "";
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
    errorDisplay ('email', "Le mail n'est pas valide ")
    email = null;
  } else {
    errorDisplay ('email',"", true);
    email = value;
  }
  console.log ("test");
};

const passwordChecker = (value) => {
  //  remet à zéro la classlist et les couleurs de chekbar
  progressBar.classList = "";
  if (!value.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/))
  {
    errorDisplay("password", "Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial")
    progressBar.classList.add('progressRed');
    password = null;
  } else if (value.length < 12) {
    progressBar.classList.add('progressBlue');
    errorDisplay("password", "", true)
    password = value;
  } else {
    progressBar.classList.add('progressGreen');
    errorDisplay("password", "", true)
    password = value;
  }
  if (confirmPass) confirmChecker (confirmPass);
};

const confirmChecker = (value) => {
  if(value != password){
    errorDisplay ('confirm', "Les mots de passe ne correspondent pas");
    confirmPass = false;
  }  else {
    errorDisplay('confirm',"", true);
    confirmPass = true;
  }


};

inputs.forEach((input) => {
  input.addEventListener("input", (e) =>{
    // console.log(e.target.value);
    // Le add event listener va récupérer l'id des champs de formulaire 
    // Le switch va permettre d'appliquer à chaque élément de la boucle la requête qui suit
    // Le case permet de rentrer les infos sur chaque cas et le "break" met fin à la requête pour chaque évènement 
    switch (e.target.id){
       case "pseudo":
        pseudoChecker(e.target.value)
        break;
        case "email" :
        emailChecker(e.target.value)
        break;
        case "password":
        passwordChecker(e.target.value)
        break
        case "confirm":
        confirmChecker(e.target.value);
        break;
        default:
        null;
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  if (pseudo && email && password && confirmPass == true){
    const data = {
      pseudo,
      email,
      password,
    };
    console.log (data);
  // Permet de vider les champs et les remettre à 0
    inputs.forEach ((input) => (input.value = ""));
    progressBar.classList = "";

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert (' Inscription validée! ')
  } else {
    alert ('veuillez remplir correctement les champs')
  }

});

