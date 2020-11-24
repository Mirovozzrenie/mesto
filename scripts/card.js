class Card {
  constructor(data) {
    this.name = name;
    this.link = link;
  }
  _getTemplate(){
    const cardElement = document.querySelector(".card__template").content.cloneNode(true);
    return cardElement;
  }
  generateCard(){
    this._element = this._getTemplate();
    
    this._elemet.querySelector(".elements__name").innerHTML = this.name;
    this._element.querySelector(".elements__picture").setAttribute("src", this.link);
  }
}
