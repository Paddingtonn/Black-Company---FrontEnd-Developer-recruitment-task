function Latest(selector) {
    Component.call(this, selector);
    this.random = [];
}
Latest.prototype = Object.create(Component.prototype);
Latest.constructor = Latest;

Component.prototype.clearList = function (container) {
    let listEl = container.querySelectorAll('li');
    Array.prototype.forEach.call(listEl, (el)=> { el.remove(); });
};

Latest.prototype.init = function init() {

    setInterval(()=>{
        this.randomNumb()
    }, 10000);
};

Latest.prototype.render = function render() {
    const container = this.getDOMElement();
    this.clearList(container);

    this.random.forEach(function(number) {

        const listElement = document.createElement('li');
        listElement.classList.add('list-random-item');
        listElement.innerHTML = number;
        container.appendChild(listElement);

    });
};

Latest.prototype.randomNumb = function randomNumb() {
    const self = this;

    axios.get('http://localhost:3000/random-numbers')
        .then(function (response) {
            self.random = response.data.data;
            self.render();
            ranking.numberUpdate(self.random);
        })
        .catch(function (error) {
            console.error(error);
        });
};