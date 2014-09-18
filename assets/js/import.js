/**
 * Created by gaurav on 18/9/14.
 */

$(document).ready(function () {

    var data = [
        {id: 1, title: "test"},
        {id: 2, title: "foo bar"}
    ];

    var columns = [
        {name: "id", type: "string"},
        {name: "title", type: "string"}
    ];

    var grid = $(".mapGrid").grid(data, columns);

    grid.registerEditor(BasicEditor);

    grid.render();
});
