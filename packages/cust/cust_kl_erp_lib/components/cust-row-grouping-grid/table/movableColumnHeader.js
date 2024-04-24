import { Module } from "tabulator-tables";

class MovableHeaderModule extends Module {
  static moduleName = "MovableHeaderModule";

  constructor(table) {
    super(table);

    this.placeholderElement = this.createPlaceholderElement();
    this.hoverElement = false;
    this.checkTimeout = false;
    this.checkPeriod = 250;
    this.moving = false;
    this.toCol = false;
    this.toColAfter = false;
    this.startX = 0;
    this.autoScrollMargin = 40;
    this.autoScrollStep = 5;
    this.autoScrollTimeout = false;
    this.touchMove = false;

    this.moveHover = this.moveHover.bind(this);
    this.endMove = this.endMove.bind(this);
    this.registerTableOption("movableHeaderConnectedElements", null); 
  }

  createPlaceholderElement() {
    let el = document.createElement("div");

    el.classList.add("tabulator-col");
    el.classList.add("tabulator-col-placeholder");

    return el;
  }

  initialize() {
    this.connection = this.table.options.movableHeaderConnectedElements;

    this.subscribe("column-init", this.initializeColumn.bind(this));
  }
  elementDrop(e, element, column) {
    this.dispatchExternal(
      "movableHeaderElementDrop",
      e,
      element,
      column ? column.getComponent() : false
    );
  }
  initializeColumn(column) {
    let config = {};
    const colEl = column.getElement();

    config.mousemove = (e) => {
      if (column.parent === this.moving.parent) {
      }
    };

    colEl.addEventListener("mousedown", (e) => {
      this.touchMove = false;
      if (e.which === 1) {
        this.checkTimeout = setTimeout(() => {
          this.startMove(e, column);
        }, this.checkPeriod);
      }
    });

    colEl.addEventListener("mouseup", (e) => {
      console.log('mouseup', e.which)
      if(e.which === 1){
        if(this.checkTimeout){
          clearTimeout(this.checkTimeout);
        }
        this.endMove(e);
      }
    });

    column.modules.moveHeader = config;
  }

  setStartPosition(e, column) {
    var pageX = this.touchMove ? e.touches[0].pageX : e.pageX,
      pageY = this.touchMove ? e.touches[0].pageY : e.pageY,
      element,
      position;

    element = column.getElement();
    if (this.connection) {
      position = element.getBoundingClientRect();

      this.startX = position.left - pageX + window.pageXOffset;
      this.startY = position.top - pageY + window.pageYOffset;
    } else {
      this.startY = pageY - element.getBoundingClientRect().top;
    }
  }

  startMove(e, column) {
    let element = column.getElement();

    this.moving = column;

    this.setStartPosition(e, column);

    this.table.element.classList.add("tabulator-block-select");

    this.placeholderElement.style.width = column.getWidth() + "px";
    this.placeholderElement.style.height = column.getHeight() + "px";

    this.table.element.classList.add("tabulator-movingrow-sending");
    this.connectToElement(column);

    this.hoverElement = element.cloneNode(true);
    this.hoverElement.classList.add("tabulator-moving");
    document.body.appendChild(this.hoverElement);
    this.hoverElement.style.left = "0";
    this.hoverElement.style.top = "0";
    this.hoverElement.style.whiteSpace = "nowrap";
    this.hoverElement.style.overflow = "hidden";
    this.hoverElement.style.pointerEvents = "none";
    this.hoverElement.style.position = "absolute";
    document.body.addEventListener("mousemove", this.moveHover);
    document.body.addEventListener("mouseup", this.endMove);

    this.dispatchExternal("headerMoving", column.getComponent());

    this.moveHover(e);
  }

  connectToElement() {
    if (this.connection) {
      this.connectionElements = [];

      if (!Array.isArray(this.connection)) {
        this.connection = [this.connection];
      }

      this.connection.forEach((query) => {
        if (typeof query === "string") {
          this.connectionElements = this.connectionElements.concat(
            Array.prototype.slice.call(document.querySelectorAll(query))
          );
        } else {
          this.connectionElements.push(query);
        }
      });

      this.connectionElements.forEach((element) => {
        var dropEvent = (e) => {
          this.elementDrop(e, element, this.moving);
        };

        element.addEventListener("mouseup", dropEvent);
        element.tabulatorElementDropEvent = dropEvent;

        element.classList.add("tabulator-movingrow-receiving");
      });
    }
  }

  moveHover(e) {
    if (this.connection) {
      this.moveHoverConnections(e);
    }
  }
  moveHoverConnections(e) {
    this.hoverElement.style.left =
      this.startX + (this.touchMove ? e.touches[0].pageX : e.pageX) + "px";
    this.hoverElement.style.top =
      this.startY + (this.touchMove ? e.touches[0].pageY : e.pageY) + "px";
  }
  endMove(e) {
    if (e.which === 1 || this.touchMove) {
      this._unbindMouseMove();

      this.hoverElement.parentNode && this.hoverElement.parentNode.removeChild(this.hoverElement);

      this.table.element.classList.remove("tabulator-block-select");

      this.moving = false;
      this.toCol = false;
      this.toColAfter = false;

      document.body.removeEventListener("mousemove", this.moveHover);
      document.body.removeEventListener("mouseup", this.endMove);

      this.table.element.classList.remove("tabulator-movingrow-sending");
      this.disconnectFromElement();
    }
  }
  disconnectFromElement() {
    (this.connectionElements || []).forEach((element) => {
      element.classList.remove("tabulator-movingrow-receiving");
      element.removeEventListener("mouseup", element.tabulatorElementDropEvent);
      delete element.tabulatorElementDropEvent;
    });
  }
  _unbindMouseMove() {
    this.table.columnManager.columnsByIndex.forEach(function (column) {
      if (column.modules.moveHeader.mousemove) {
        column
          .getElement()
          .removeEventListener(
            "mousemove",
            column.modules.moveHeader.mousemove
          );
      }
    });
  }

  _bindMouseMove() {
    this.table.columnManager.columnsByIndex.forEach(function (column) {
      if (column.modules.moveHeader.mousemove) {
        column
          .getElement()
          .addEventListener("mousemove", column.modules.moveHeader.mousemove);
      }
    });
  }
}

export default MovableHeaderModule;
