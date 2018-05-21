function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
            id: number,
            time: 0,
        }
      });

      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
};

Ranking.prototype.render = function() {
  const container = this.getDOMElement();

  this.clearList(container);
  this.numbers = this.numbers.sort((a, b) => b.time - a.time);

  this.numbers.forEach(function (number) {

      const listElement = document.createElement('li');
      const spanElement = document.createElement('span');

      listElement.classList.add('list-group-item');

      listElement.innerHTML = number.id;
      spanElement.innerHTML = " it has been drawn " + number.time + " times";

      container.appendChild(listElement);
      listElement.appendChild(spanElement);
  });
};

Ranking.prototype.numberUpdate = function numberUpdate(random) {
    this.numbers.forEach(number => {
        random.forEach(random => {
            if(number.id === random){
                number.time++;
            }
        })
    });
    this.render();
};