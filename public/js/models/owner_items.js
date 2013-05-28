window.OwnerItemCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.owner_id = options.owner_id;
    },
    url: function() {
        return '/owner/'+this.owner_id+'/items';
    },
    model: Item
});
