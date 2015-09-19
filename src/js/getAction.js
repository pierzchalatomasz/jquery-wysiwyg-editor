// Get action
module.exports = function() {

  Object.prototype.getAction = function() {
    if(typeof(this.action) != 'undefined')
      return this.action;
    if(typeof(this.title) != 'undefined')
      return this.title;
  };

};
