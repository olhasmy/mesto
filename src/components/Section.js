// отвечает за отрисовку элементов на странице
export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItem(element, place = 'prepend') {
        if (place === 'append') {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }
}
