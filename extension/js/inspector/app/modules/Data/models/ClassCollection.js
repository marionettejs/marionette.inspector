define([
    'backbone',
    'app/modules/Data/models/ClassModel'
], function(Backbone, ClassModel) {

    return Backbone.Collection.extend({
        model: ClassModel
    });

});