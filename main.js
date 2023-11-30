$(document).ready(() => {

    $('#sliderValueDisplay').hide();

    $(".me-2").on("click", function () {
        // Create a new row with text boxes
        /*  var newRow = $("<tr>")
              .append($("<td>").append($("<input>").attr("type", "text").addClass("form-control orderId")))
              .append($("<td>").append($("<input>").attr("type", "text").addClass("form-control orderValue")))
              .append($("<td>").append($("<input>").attr("type", "text").addClass("form-control orderQuantity")))
              .append($("<td>").append(
                  $("<button>").addClass("btn btn-sm btn-primary add-btn").text("Add")).append(
                      $("<td><button>").addClass("btn btn-sm btn-danger").text("Delete")
                  ));
                  */

        var newRow = '<tr><td><input type="text" class="form-control orderId"></input></td><td><input type="text" class="form-control orderValue"></input></td><td><input type="text" class="form-control orderQuantity"></input></td><td><button class="btn btn-sm btn-primary add-btn">Add</button><button class="btn btn-sm btn-danger">Delete</button></td></tr>'

        // Insert the new row at the top of the table
        $("table tbody").prepend(newRow);
    });

    // Attach a click event to the "Add" button inside the table
    $("table").on("click", ".add-btn", function () {
        // Get data from text boxes
        var orderId = $(this).closest("tr").find(".orderId").val();
        var orderValue = $(this).closest("tr").find(".orderValue").val();
        var orderQuantity = $(this).closest("tr").find(".orderQuantity").val();

        // Create a new row with labeled data
        var labeledDataRow = $("<tr>")
            .append($("<td>").text(orderId))
            .append($("<td>").text(orderValue))
            .append($("<td>").text(orderQuantity))
            .append($("<td>").append(
                $("<button>").addClass("btn btn-sm btn-primary edit-btn").text("Edit"),
                $("<button>").addClass("btn btn-sm btn-danger").text("Delete")
            ));

        // Replace the new row with labeled data
        $(this).closest("tr").replaceWith(labeledDataRow);
    });
    $("#orderValueSlider").on("input", function () {
        // Get the selected value from the slider
        var selectedValue = parseInt($(this).val());


        // Display the value on the screen using .html method
        $('#sliderValueDisplay').html(selectedValue);
        $('#sliderValueDisplay').show();
        // Iterate through each row in the table and filter based on the order value
        $("table tbody tr").each(function () {
            // Get the order value from the current row
            var orderValue = parseInt($(this).find("td:eq(1)").text().replace('$', ''));

            // Show or hide the row based on the filter condition
            if (orderValue > selectedValue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
    $('#orderValueSlider').on('mouseout', function () {
        $('#sliderValueDisplay').hide();
    });

    function saveToLocalStorage() {
        // Create an array to store order data
        var ordersData = [];

        // Iterate through each row in the table
        $("table tbody tr").each(function () {
            var orderId = $(this).find("td:eq(0)").text();
            var orderValue = $(this).find("td:eq(1)").text();
            var orderQuantity = $(this).find("td:eq(2)").text();

            // Create an object for each order and push it to the array
            var order = {
                orderId: orderId,
                orderValue: orderValue,
                orderQuantity: orderQuantity
            };

            ordersData.push(order);
        });

        // Convert the array to JSON string
        var jsonData = JSON.stringify(ordersData);

        // Save the JSON data to local storage
        localStorage.setItem("orders", jsonData);
    }

    // Attach a click event to the "Save" button
    $("#saveButton").on("click", function () {
        // Call the function to save data to local storage
        saveToLocalStorage();
        var storedorders = localStorage.getItem("orders");
        var parsedData = JSON.parse(storedorders);
        console.log("Parsed data from localStorage:", parsedData);
    });
    $(document).on("click", '.edit-btn', function editOrder() {
        alert("edit button was clicked")
        var row = $(this).closest('tr');

        // Get the current values from the row
        var orderId = row.find('td:eq(0)').text();
        var orderValue = row.find('td:eq(1)').text();
        var orderQuantity = row.find('td:eq(2)').text();

        // Replace the row data with input fields for editing
        row.html(`
            <td>${orderId}</td>
            <td><input type="text" class="form-control" value="${orderValue}"></td>
            <td><input type="text" class="form-control" value="${orderQuantity}"></td>
            <td><button class="btn btn-sm btn-success save-btn">Save</button></td>
        `);
    });

    $(document).on('click', '.save-btn', function () {
        var row = $(this).closest('tr');

        // Get the edited values from the input fields
        var orderId = row.find('td:eq(0)').text();
        var updatedOrderValue = row.find('td:eq(1) input').val();
        var updatedOrderQuantity = row.find('td:eq(2) input').val();

        // Update the row with the edited values
        row.html(`
            <td>${orderId}</td>
            <td>${updatedOrderValue}</td>
            <td>${updatedOrderQuantity}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn">Edit</button>
                <button class="btn btn-sm btn-danger">Delete</button>
            </td>
        `);
    });
    $(document).on('click', '.btn-danger', function () {
        // Remove the entire row when the delete button is clicked
        $(this).closest('tr').remove();
    });
    $(document).on('keyup', '.w-auto', function () {


        //value entered in the search orders 
        //need to be compared with all the  
        //values of table Orderid's 
        //and display only that matches with
        // search order value otherwise it should be empty
        var currentvalue = parseInt($(this).val());
        console.log(currentvalue);
        $("table tbody tr").each(function () {
            // Get the order value from the current row
            var orderID = $(this).find("td:eq(0)").text();
            console.log("orderID value is" + orderID);

            // Show or hide the row based on the filter condition
            if (orderID == currentvalue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

})