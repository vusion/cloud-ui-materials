let GC = {};

GC = (function() {
	return require('../spreadjs/gc.spread.common.14.2.5');
})();
GC = (function(GC) {
    return require('../spreadjs/gc.spread.calcengine.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.calcengine.basicfunctions.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.core.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.calcengine.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.bindings.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.conditionalformatting.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.filter.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.celltypes.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.contextmenu.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.statusbar.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.datavalidation.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.formulatextbox.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.cellstate.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.calcengine.advancedfunctions.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.floatingobjects.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.hyperlink.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.search.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.excelio.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.fill.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.tables.14.2.5')(GC);
})(GC);

GC = (function(GC) {
    return require('../spreadjs/gc.spread.sheets.resources.zh.14.2.5')(GC);
})(GC);

module.exports = GC;